// Resguardo automático — corre antes de cada build (ver "prebuild" en
// package.json) así que no requiere que nadie se acuerde de comprimir nada.
// Redimensiona y recomprime, EN EL MISMO ARCHIVO Y FORMATO, cualquier imagen
// de public/images/ que pase el umbral. Nunca cambia extensión ni nombre de
// archivo — así nunca puede romper una referencia en el contenido markdown,
// a costa de no lograr la compresión máxima que sí da convertir a WebP (para
// eso está scripts/compress-legacy-post-images.mjs, que es una limpieza
// puntual y sí actualiza referencias).
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const SIZE_THRESHOLD = 400 * 1024; // 400KB
const MAX_WIDTH = 2000; // ninguna imagen del sitio se muestra más ancha que esto
const QUALITY = 82;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function findCandidates(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findCandidates(full));
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      if (statSync(full).size > SIZE_THRESHOLD) out.push(full);
    }
  }
  return out;
}

async function optimize(file) {
  const before = statSync(file).size;
  const ext = path.extname(file).toLowerCase();
  let pipeline = sharp(readFileSync(file)).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  const buffer = await pipeline.toBuffer();
  // Si por lo que sea el resultado no es más chico (ya estaba bien
  // optimizada, o es un PNG con detalle que no se beneficia de paleta), no
  // la toques — nunca dejar un archivo peor de como estaba.
  if (buffer.length < before) {
    writeFileSync(file, buffer);
    return { file, before, after: buffer.length, changed: true };
  }
  return { file, before, after: before, changed: false };
}

const candidates = findCandidates(IMAGES_DIR);
if (candidates.length === 0) {
  console.log('optimize-images: nada que hacer, todas las imágenes ya están dentro del umbral.');
  process.exit(0);
}

console.log(`optimize-images: revisando ${candidates.length} imagen(es) por encima de ${SIZE_THRESHOLD / 1024}KB...`);
let totalBefore = 0;
let totalAfter = 0;
let changedCount = 0;

for (const file of candidates) {
  const result = await optimize(file);
  totalBefore += result.before;
  totalAfter += result.after;
  if (result.changed) {
    changedCount++;
    console.log(
      `  ${path.relative(ROOT, file)} — ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB`
    );
  }
}

if (changedCount > 0) {
  console.log(
    `optimize-images: ${changedCount} imagen(es) optimizada(s). ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
} else {
  console.log('optimize-images: nada que optimizar (las candidatas ya estaban en su mejor tamaño).');
}
