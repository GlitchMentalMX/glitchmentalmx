// Marca de agua "glitchMentalMX" quemada en las imágenes del Laboratorio
// (public/images/laboratorio/**/hero.webp y landing/og.jpg). Misma regla
// visual que watermark-new-uploads.mjs para Insights/Dato Incómodo (esquina
// inferior derecha, blanco con trazo oscuro, chica). Es idempotente: el
// registro de lo ya marcado vive en watermark-laboratorio-manifest.json y debe
// quedar en git, para no marcar dos veces la misma imagen.
//
// Uso manual: `node scripts/watermark-laboratorio.mjs` (nuevas imágenes del
// Laboratorio). No está en "prebuild" a propósito: así un build nunca reescribe
// estas imágenes por sorpresa.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = path.join(ROOT, 'public', 'images', 'laboratorio');
const MANIFEST_PATH = path.join(ROOT, 'scripts', 'watermark-laboratorio-manifest.json');
const WATERMARK_TEXT = 'glitchMentalMX';
const OBJETIVOS = new Set(['hero.webp', 'og.jpg']);

const manifest = new Set(existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) : []);

function svg(width, height) {
  const fontSize = Math.round(Math.max(18, width / 48)) - 3;
  const margin = Math.round(fontSize * 0.9);
  const strokeWidth = Math.max(1, Math.round(fontSize * 0.14));
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${width - margin}" y="${height - margin}" text-anchor="end"
        font-family="sans-serif" font-weight="600" font-size="${fontSize}"
        fill="#ffffff" fill-opacity="0.9" stroke="#000000" stroke-opacity="0.5"
        stroke-width="${strokeWidth}" paint-order="stroke">${WATERMARK_TEXT}</text>
    </svg>`);
}

const pendientes = [];
for (const dir of readdirSync(BASE, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const f of readdirSync(path.join(BASE, dir.name), { withFileTypes: true })) {
    const key = `${dir.name}/${f.name}`;
    if (f.isFile() && OBJETIVOS.has(f.name) && !manifest.has(key)) {
      pendientes.push({ key, file: path.join(BASE, dir.name, f.name) });
    }
  }
}

if (pendientes.length === 0) {
  console.log('watermark-laboratorio: nada nuevo que marcar.');
  process.exit(0);
}
for (const { key, file } of pendientes) {
  const img = sharp(readFileSync(file));
  const { width, height } = await img.metadata();
  const marcada = img.composite([{ input: svg(width, height), top: 0, left: 0 }]);
  const buf = file.endsWith('.jpg') ? await marcada.jpeg({ quality: 90, mozjpeg: true }).toBuffer() : await marcada.webp({ quality: 90 }).toBuffer();
  writeFileSync(file, buf);
  manifest.add(key);
  console.log('  ' + key);
}
writeFileSync(MANIFEST_PATH, JSON.stringify([...manifest].sort(), null, 2) + '\n');
console.log(`watermark-laboratorio: ${pendientes.length} imagen(es) marcada(s).`);
