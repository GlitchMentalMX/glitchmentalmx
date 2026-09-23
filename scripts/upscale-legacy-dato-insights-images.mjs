// Migración retroactiva, una sola corrida — SPEC: páginas individuales
// indexables para Dato Incómodo e Insights Visuales, punto 2 ("confirmar
// que cumple el mínimo de 1200px de ancho que pide Google para elegibilidad
// en Discover — revisar y corregir si no").
//
// Las piezas legacy (migradas antes de que el CMS subiera a public/images/uploads/)
// miden 900x506 — por debajo del mínimo. Las subidas ya vía CMS son 1600px+
// y no se tocan. Reescribe en el mismo archivo/ruta (decisión de Jorge:
// agrandar el original en vez de generar una variante aparte) — a
// diferencia de scripts/optimize-images.mjs (que nunca agranda), aquí SÍ
// se agranda a propósito, con withoutEnlargement:false, únicamente para las
// imágenes por debajo del umbral.

import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const MIN_WIDTH = 1200;
const QUALITY = 85;
const DRY_RUN = process.argv.includes('--dry-run');

const DIRS = [
  path.join(ROOT, 'public', 'images', 'dato-incomodo'),
  path.join(ROOT, 'public', 'images', 'insights-visuales'),
];

async function processDir(dir) {
  const files = readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  let upscaled = 0;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const before = statSync(filePath).size;
    const buffer = readFileSync(filePath);
    const meta = await sharp(buffer).metadata();
    if (!meta.width || meta.width >= MIN_WIDTH) continue;

    const ext = path.extname(file).toLowerCase();
    let pipeline = sharp(buffer).resize({ width: MIN_WIDTH, withoutEnlargement: false });
    pipeline =
      ext === '.png'
        ? pipeline.png({ quality: QUALITY, compressionLevel: 9 })
        : ext === '.webp'
          ? pipeline.webp({ quality: QUALITY })
          : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

    const out = await pipeline.toBuffer();
    const outMeta = await sharp(out).metadata();
    console.log(
      `  ${path.relative(ROOT, filePath)} — ${meta.width}x${meta.height} (${(before / 1024).toFixed(0)}KB) -> ${outMeta.width}x${outMeta.height} (${(out.length / 1024).toFixed(0)}KB)`
    );
    if (!DRY_RUN) writeFileSync(filePath, out);
    upscaled++;
  }
  console.log(`${path.relative(ROOT, dir)}: ${upscaled}/${files.length} imagen(es) agrandadas a ${MIN_WIDTH}px.`);
}

console.log(DRY_RUN ? 'DRY RUN — no se escribe nada.\n' : 'Escribiendo cambios.\n');
for (const dir of DIRS) {
  await processDir(dir);
}
