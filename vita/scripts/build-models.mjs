/**
 * Raw Sketchfab downloads are ~1 GB, almost all of it 2K PBR texture sets and
 * photogrammetry triangle counts. The site renders unlit, so base colour is the only
 * channel that ever reaches the screen — normal, metal/rough, AO and emissive are paid
 * for and never looked at.
 *
 * So: strip every material down to base colour, mark it KHR_materials_unlit (three's
 * GLTFLoader turns that into a MeshBasicMaterial on its own, which is the whole
 * painterly look), prune what that orphans, decimate the scans, and squeeze the rest.
 *
 * This uses the scripting API rather than the `gltf-transform` CLI because the CLI has
 * no way to clear a texture slot, and its bundled textureCompress fails on these files
 * ("colourspace: parameter space not set") where a direct sharp call does not.
 *
 * Run once after adding a model:  npm run models
 */
import { mkdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, KHRMaterialsUnlit } from '@gltf-transform/extensions';
import {
  dedup,
  meshopt,
  metalRough,
  prune,
  simplify,
  textureCompress,
  weld,
} from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, '../../assets/models');
const OUT = resolve(root, 'public/models');

/**
 * `tris` is the triangle budget. The two photogrammetry scans arrive at ~500k triangles
 * each; at the distance they are actually seen from, a fraction of that is
 * indistinguishable. The column is modelled rather than scanned, so it needs no
 * decimation — and its silhouette is the one thing worth spending vertices on.
 */
const MODELS = [
  { src: 'corinthian_column.glb', out: 'column.glb', texture: 1024 },
  { src: 'arete_statue.glb', out: 'statue.glb', texture: 1024, tris: 30_000 },
  { src: 'vaso.glb', out: 'urn.glb', texture: 512, tris: 6_000 },
];

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  // EXT_meshopt_compression encodes at write time, so the IO needs the codec too.
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const mb = (p) => (statSync(p).size / 1048576).toFixed(2);

const triangleCount = (doc) =>
  doc
    .getRoot()
    .listMeshes()
    .flatMap((mesh) => mesh.listPrimitives())
    .reduce((sum, prim) => sum + (prim.getIndices()?.getCount() ?? 0) / 3, 0);

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;
mkdirSync(OUT, { recursive: true });

for (const { src, out, texture, tris } of MODELS) {
  const from = resolve(SRC, src);
  const to = resolve(OUT, out);

  const doc = await io.read(from);

  // Some of these are old spec/gloss exports. three ignores that extension outright, so
  // fold it into metal/rough first — that is what moves the diffuse colour into
  // baseColor, where the unlit pass below can still find it.
  await doc.transform(metalRough());

  const unlit = doc.createExtension(KHRMaterialsUnlit).createUnlit();

  for (const material of doc.getRoot().listMaterials()) {
    material
      .setNormalTexture(null)
      .setMetallicRoughnessTexture(null)
      .setOcclusionTexture(null)
      .setEmissiveTexture(null)
      .setExtension('KHR_materials_unlit', unlit);
  }

  await doc.transform(
    // keepAttributes:false drops NORMAL and TANGENT too — unlit shading reads neither.
    prune({ keepAttributes: false, keepIndices: false, keepSolidTextures: false }),
    dedup(),
    ...(tris
      ? [
          weld(),
          simplify({
            simplifier: MeshoptSimplifier,
            ratio: tris / triangleCount(doc),
            error: 0.01,
          }),
        ]
      : []),
    textureCompress({
      encoder: sharp,
      targetFormat: 'webp',
      resize: [texture, texture],
      quality: 80,
    }),
    meshopt({ encoder: MeshoptEncoder })
  );

  await io.write(to, doc);
  console.log(
    `${src.padEnd(24)} ${mb(from).padStart(7)} MB  ->  ${out.padEnd(11)} ${mb(to).padStart(6)} MB  ` +
      `${Math.round(triangleCount(doc)).toLocaleString()} tris`
  );
}
