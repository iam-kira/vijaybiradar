'use client';

/**
 * The hall — one continuous Roman interior the camera flies down.
 *
 * Everything renders unlit. `npm run models` marks each model KHR_materials_unlit, so
 * three's GLTFLoader hands back MeshBasicMaterial and no lighting is ever calculated;
 * the flat surfaces are what make this read as painted rather than as a 3D render, and
 * they sidestep matching light between a scanned statue and a modelled column entirely.
 * Depth comes from fog and from things passing close, not from shading.
 *
 * Repetition carries the scene: one column is cloned down both sides, so twenty of them
 * cost one column's geometry and one column's texture.
 *
 * MODEL CREDITS — all three are Sketchfab downloads whose licences require attribution.
 * Fill in author and licence before this ships publicly:
 *   column.glb  from corinthian_column.glb  — author: TODO, licence: TODO
 *   statue.glb  from arete_statue.glb       — author: TODO, licence: TODO
 *   urn.glb     from vaso.glb               — author: TODO, licence: TODO
 */

import { useLayoutEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import Portal from './Portal';
import * as THREE from 'three';
import {
  FLOOR_Y,
  HALL_HALF_WIDTH,
  PALETTES,
  SPACING,
  TRAVEL,
  WALL_HEIGHT,
  archZ,
  sceneZ,
  scenes,
  type Theme,
} from '@/data/scenes';

const COLUMN_X = 8.4;
const COLUMN_STEP = 6.5;
const COLUMN_HEIGHT = 13;
/** The hall starts behind the camera and ends past the last arch. */
const HALL_START_Z = 16;
const HALL_END_Z = -(TRAVEL + 40);
const HALL_LENGTH = HALL_START_Z - HALL_END_Z;

/** Arch opening: wide and tall enough that the camera flies through it, not into it. */
const ARCH_RADIUS = 6;
const ARCH_SPRING = 7.5;
const ARCH_BAND = 1.7;
const ARCH_DEPTH = 2.6;

type Placement = { position: [number, number, number]; rotation?: number };

/**
 * Loads a model, re-seats it so its base sits at y=0 with its footprint centred, and
 * scales it to a given height. Measuring rather than hard-coding a scale means swapping
 * a model out is a one-line change instead of a hunt for the right magic number.
 */
function useModel(url: string, height: number, tint: string) {
  const { scene } = useGLTF(url);

  const template = useMemo(() => {
    const inner = scene.clone(true);
    const box = new THREE.Box3().setFromObject(inner);
    const centre = box.getCenter(new THREE.Vector3());

    inner.position.set(-centre.x, -box.min.y, -centre.z);

    const holder = new THREE.Group();
    holder.add(inner);
    holder.scale.setScalar(height / (box.max.y - box.min.y));
    return holder;
  }, [scene, height]);

  // clone() shares materials with the cached GLTF, so this tints every copy at once.
  useLayoutEffect(() => {
    template.traverse((o) => {
      const material = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (material?.isMaterial) material.color.set(tint);
    });
  }, [template, tint]);

  return template;
}

/** One model, repeated. Clones share geometry and textures; only the matrices differ. */
function Repeated({ template, at }: { template: THREE.Object3D; at: Placement[] }) {
  const copies = useMemo(
    () =>
      at.map(({ position, rotation = 0 }) => {
        const copy = template.clone(true);
        copy.position.set(...position);
        copy.rotation.y = rotation;
        // Nothing in the hall moves, so skip the per-frame matrix recompute.
        copy.updateMatrix();
        copy.matrixAutoUpdate = false;
        return copy;
      }),
    [template, at]
  );

  return (
    <>
      {copies.map((copy, i) => (
        <primitive key={i} object={copy} />
      ))}
    </>
  );
}

/**
 * A Roman arch as an extruded band: a semicircular head on two straight piers, with the
 * opening cut out as a hole. Cheaper than any arch model on disk, and the hole is the
 * whole point — it is what the camera passes through.
 */
export const archGeometry = (() => {
  const R = ARCH_RADIUS + ARCH_BAND;

  const outer = new THREE.Shape();
  outer.moveTo(-R, 0);
  outer.lineTo(-R, ARCH_SPRING);
  outer.absarc(0, ARCH_SPRING, R, Math.PI, 0, true);
  outer.lineTo(R, 0);
  outer.closePath();

  const opening = new THREE.Path();
  opening.moveTo(-ARCH_RADIUS, 0);
  opening.lineTo(-ARCH_RADIUS, ARCH_SPRING);
  opening.absarc(0, ARCH_SPRING, ARCH_RADIUS, Math.PI, 0, true);
  opening.lineTo(ARCH_RADIUS, 0);
  opening.closePath();
  outer.holes.push(opening);

  const geometry = new THREE.ExtrudeGeometry(outer, {
    depth: ARCH_DEPTH,
    bevelEnabled: false,
    curveSegments: 24,
  });
  geometry.translate(0, 0, -ARCH_DEPTH / 2);
  return geometry;
})();

export default function Corridor({ theme }: { theme: Theme }) {
  const palette = PALETTES[theme];

  const column = useModel('/models/column.glb', COLUMN_HEIGHT, palette.stone);
  const statue = useModel('/models/statue.glb', 5.4, palette.marble);
  const urn = useModel('/models/urn.glb', 1.5, palette.stone);

  const columnsAt = useMemo(() => {
    const at: Placement[] = [];
    for (let z = HALL_START_Z; z > HALL_END_Z; z -= COLUMN_STEP) {
      at.push({ position: [-COLUMN_X, FLOOR_Y, z] });
      at.push({ position: [COLUMN_X, FLOOR_Y, z] });
    }
    return at;
  }, []);

  // Statues mark chapter centres. They alternate sides so the hall never looks mirrored,
  // and stay off the middle so the camera and the captions both pass them cleanly.
  const statuesAt = useMemo<Placement[]>(
    () =>
      scenes.slice(1).map((_, i) => ({
        position: [i % 2 ? 5.6 : -5.6, FLOOR_Y + 1.6, sceneZ(i + 1)],
        rotation: i % 2 ? -Math.PI / 2.6 : Math.PI / 2.6,
      })),
    []
  );

  const urnsAt = useMemo(() => {
    const at: Placement[] = [];
    for (let z = HALL_START_Z - 6; z > HALL_END_Z; z -= COLUMN_STEP * 2) {
      at.push({ position: [-COLUMN_X + 1.4, FLOOR_Y, z] });
      at.push({ position: [COLUMN_X - 1.4, FLOOR_Y, z] });
    }
    return at;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, HALL_END_Z + HALL_LENGTH / 2]}>
        <planeGeometry args={[HALL_HALF_WIDTH * 2, HALL_LENGTH]} />
        <meshBasicMaterial color={palette.floor} />
      </mesh>

      {/* Side walls, and the wall that closes the far end. */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          rotation-y={(side * Math.PI) / 2}
          position={[
            side * HALL_HALF_WIDTH,
            FLOOR_Y + WALL_HEIGHT / 2,
            HALL_END_Z + HALL_LENGTH / 2,
          ]}
        >
          <planeGeometry args={[HALL_LENGTH, WALL_HEIGHT]} />
          <meshBasicMaterial color={palette.wall} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0, FLOOR_Y + WALL_HEIGHT / 2, HALL_END_Z]}>
        <planeGeometry args={[HALL_HALF_WIDTH * 2, WALL_HEIGHT]} />
        <meshBasicMaterial color={palette.wall} />
      </mesh>

      {/* Arches, one per chapter boundary. */}
      {scenes.map((scene, i) => (
        <mesh key={scene.id} geometry={archGeometry} position={[0, FLOOR_Y, archZ(i)]}>
          <meshBasicMaterial color={palette.stone} />
        </mesh>
      ))}

      <Repeated template={column} at={columnsAt} />
      <Repeated template={statue} at={statuesAt} />
      <Repeated template={urn} at={urnsAt} />

      {/* The two portals stand at their chapter centres facing back up the hall, each on
          the opposite side from that chapter's statue, so the camera passes between. */}
      <Portal id="journey" position={[5, FLOOR_Y + 4.2, sceneZ(1)]} palette={palette} />
      <Portal id="build" position={[-5, FLOOR_Y + 4.2, sceneZ(2)]} palette={palette} />

      {/* Shafts falling between the arches. Additive and very faint — they are
          atmosphere, not illumination; there is no light in the scene to justify them. */}
      {scenes.map((scene, i) => (
        <mesh
          key={`shaft-${scene.id}`}
          position={[0, FLOOR_Y + 9, archZ(i) + SPACING / 2]}
          rotation-z={0.22}
        >
          <cylinderGeometry args={[1.6, 5.5, 18, 12, 1, true]} />
          <meshBasicMaterial
            color={palette.glow}
            transparent
            opacity={theme === 'dark' ? 0.05 : 0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload('/models/column.glb');
useGLTF.preload('/models/statue.glb');
useGLTF.preload('/models/urn.glb');
