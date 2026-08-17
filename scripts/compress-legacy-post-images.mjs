// Conversión única de las imágenes PNG pesadas heredadas de la migración de
// Blogger (nunca se comprimieron al bajarlas) a WebP. Convierte cada archivo,
// borra el PNG original, y actualiza las referencias en el markdown del
// artículo correspondiente (heroImage y las imágenes inline).
import { readdirSync, statSync, unlinkSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_IMAGES = path.join(ROOT, 'public', 'images', 'posts');
const POSTS_CONTENT = path.join(ROOT, 'src', 'content', 'posts');
const SIZE_THRESHOLD = 1024 * 1024; // 1MB
const WEBP_QUALITY = 82;

function findOversizedPngs(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findOversizedPngs(full));
    } else if (entry.isFile() && entry.name.endsWith('.png') && statSync(full).size > SIZE_THRESHOLD) {
      out.push(full);
    }
  }
  return out;
}

const targets = findOversizedPngs(POSTS_IMAGES);
console.log(`Encontrados ${targets.length} PNG > 1MB en public/images/posts`);

const renameMap = new Map(); // ruta pública vieja -> ruta pública nueva
let totalBefore = 0;
let totalAfter = 0;

for (const pngPath of targets) {
  const before = statSync(pngPath).size;
  const webpPath = pngPath.replace(/\.png$/, '.webp');
  await sharp(pngPath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
  const after = statSync(webpPath).size;
  unlinkSync(pngPath);

  const publicOld = '/' + path.relative(path.join(ROOT, 'public'), pngPath);
  const publicNew = '/' + path.relative(path.join(ROOT, 'public'), webpPath);
  renameMap.set(publicOld, publicNew);

  totalBefore += before;
  totalAfter += after;
  console.log(
    `  ${path.relative(ROOT, pngPath)} — ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

// Actualizar referencias en el contenido markdown de los artículos.
let filesUpdated = 0;
for (const file of readdirSync(POSTS_CONTENT)) {
  if (!file.endsWith('.md')) continue;
  const full = path.join(POSTS_CONTENT, file);
  let text = readFileSync(full, 'utf-8');
  let changed = false;
  for (const [oldPath, newPath] of renameMap) {
    if (text.includes(oldPath)) {
      text = text.split(oldPath).join(newPath);
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(full, text);
    filesUpdated++;
  }
}

console.log(`\n${targets.length} imágenes convertidas, ${filesUpdated} archivos de contenido actualizados.`);
console.log(
  `Peso total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB` +
    ` (-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`
);
