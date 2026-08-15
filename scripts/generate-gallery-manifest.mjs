import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const galleryRoot = path.resolve(__dirname, '..', 'public', 'images', 'gallery');
const manifestPath = path.resolve(__dirname, '..', 'public', 'images', 'gallery-manifest.json');

const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && allowedExt.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function inferCategory(relativePath) {
  const segments = relativePath.split(/[/\\]/).filter(Boolean);
  if (segments.length <= 1) return 'personal';
  return segments[segments.length - 2] || 'personal';
}

function inferYear(filename) {
  const match = filename.match(/(20\d{2})/);
  if (match) return Number(match[1]);
  return new Date().getFullYear();
}

const files = walk(galleryRoot)
  .map((fullPath) => {
    const relativePath = path.relative(galleryRoot, fullPath).split(path.sep).join('/');
    const category = inferCategory(relativePath);
    const filename = path.basename(relativePath);

    return {
      id: relativePath.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]+/g, '-').toLowerCase(),
      src: `/images/gallery/${relativePath}`,
      caption: filename.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, ''),
      category,
      year: inferYear(filename),
    };
  })
  .sort((a, b) => a.caption.localeCompare(b.caption));

const manifest = {
  generatedAt: new Date().toISOString(),
  files,
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Generated ${files.length} gallery entries at ${manifestPath}`);
