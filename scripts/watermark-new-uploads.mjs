// Corre antes de cada build (ver "prebuild" en package.json), antes de
// optimize-images.mjs. Le agrega el texto "glitchmental.com" — chico,
// discreto, esquina superior derecha — a cualquier imagen NUEVA subida vía
// Sveltia CMS a public/images/uploads/, que es la única carpeta a la que
// suben imágenes todas las colecciones (posts, insights, dato incómodo...).
//
// También cubre las carpetas donde Sveltia guarda la imagen de Insights
// Visuales y Dato Incómodo (dato-incomodo/, insights-visuales/); ahí la marca
// va abajo a la derecha, como en las imágenes viejas hechas a mano. Sus
// entradas del manifest llevan prefijo de carpeta ("dato-incomodo/x.webp").
//
// No toca nada fuera de esas carpetas ni nada que ya esté en el manifest: así las
// imágenes viejas (que ya traen su marca puesta a mano) nunca se tocan dos
// veces. watermark-manifest.json lleva el registro de qué ya se procesó (o
// se marcó como "ya existía antes de activar esto") y debe quedar en git.
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const SOURCES = [
  { dir: 'uploads', prefix: '', corner: 'top' },
  { dir: 'dato-incomodo', prefix: 'dato-incomodo/', corner: 'bottom' },
  { dir: 'insights-visuales', prefix: 'insights-visuales/', corner: 'bottom' },
];
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'watermark-manifest.json');
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const WATERMARK_TEXT = 'glitchmental.com';

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return new Set();
  return new Set(JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')));
}

function saveManifest(set) {
  const sorted = [...set].sort();
  writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n');
}

function buildWatermarkSvg(width, height, corner) {
  const fontSize =
    corner === 'bottom'
      ? Math.round(Math.max(18, width / 48))
      : Math.round(Math.min(26, Math.max(14, width / 42)));
  const margin = Math.round(fontSize * 0.9);
  const strokeWidth = Math.max(1, Math.round(fontSize * (corner === 'bottom' ? 0.14 : 0.06)));
  const y = corner === 'bottom' ? height - margin : margin + fontSize * 0.8;
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${width - margin}"
        y="${y}"
        text-anchor="end"
        font-family="sans-serif"
        font-weight="600"
        font-size="${fontSize}"
        fill="#ffffff"
        fill-opacity="${corner === 'bottom' ? 0.9 : 0.55}"
        stroke="#000000"
        stroke-opacity="${corner === 'bottom' ? 0.6 : 0.25}"
        stroke-width="${strokeWidth}"
        paint-order="stroke"
      >${WATERMARK_TEXT}</text>
    </svg>
  `);
}

async function watermark(file, corner) {
  const ext = path.extname(file).toLowerCase();
  const image = sharp(readFileSync(file));
  const { width, height } = await image.metadata();
  const svg = buildWatermarkSvg(width, height, corner);
  let pipeline = image.composite([{ input: svg, top: 0, left: 0 }]);

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: 90 });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 90 });
  } else {
    pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
  }

  writeFileSync(file, await pipeline.toBuffer());
}

const manifest = loadManifest();
const pending = [];
for (const { dir, prefix, corner } of SOURCES) {
  const full = path.join(IMAGES_DIR, dir);
  if (!existsSync(full)) continue;
  for (const e of readdirSync(full, { withFileTypes: true })) {
    if (!e.isFile() || !EXTENSIONS.has(path.extname(e.name).toLowerCase())) continue;
    const key = prefix + e.name;
    if (!manifest.has(key)) pending.push({ key, file: path.join(full, e.name), corner });
  }
}

if (pending.length === 0) {
  console.log('watermark-new-uploads: nada nuevo que marcar.');
  process.exit(0);
}

console.log(`watermark-new-uploads: marcando ${pending.length} imagen(es) nueva(s)...`);
for (const { key, file, corner } of pending) {
  await watermark(file, corner);
  manifest.add(key);
  console.log(`  ${key}`);
}
saveManifest(manifest);
console.log(`watermark-new-uploads: listo, ${pending.length} imagen(es) marcada(s).`);
