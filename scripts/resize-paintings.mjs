// One-time resize pass for the source painting downloads — the Wikimedia
// Commons originals are museum-scan resolution (5-10MB, 6000-7000px), far
// larger than any viewport needs. Run manually after adding a new painting;
// not part of the build pipeline.
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "images", "paintings");
const MAX_WIDTH = 2400;

const files = (await readdir(DIR)).filter((f) => /\.(jpg|jpeg|png)$/i.test(f) && !f.endsWith(".resized.jpg"));

for (const file of files) {
  const src = path.join(DIR, file);
  const out = path.join(DIR, file.replace(/\.(jpg|jpeg|png)$/i, ".jpg"));
  const img = sharp(src);
  const meta = await img.metadata();
  if (!meta.width || meta.width <= MAX_WIDTH) {
    console.log(`skip (already small): ${file}`);
    continue;
  }
  await img.resize({ width: MAX_WIDTH }).jpeg({ quality: 82, mozjpeg: true }).toFile(out + ".tmp");
  const { renameSync } = await import("node:fs");
  renameSync(out + ".tmp", out);
  console.log(`resized: ${file} -> ${MAX_WIDTH}px wide`);
}
