import { readFileSync, writeFileSync, renameSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

function detectRealExt(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') return 'webp';
  if (buf.slice(0, 4).toString('ascii') === 'GIF8') return 'gif';
  return null;
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const allFiles = walk(IMAGES_DIR);
const renames = new Map(); // web path old -> web path new

for (const file of allFiles) {
  const buf = readFileSync(file);
  const realExt = detectRealExt(buf.slice(0, 16));
  if (!realExt) {
    console.warn(`! unknown format: ${file}`);
    continue;
  }
  const currentExt = path.extname(file).slice(1).toLowerCase();
  if (currentExt === realExt || (currentExt === 'jpeg' && realExt === 'jpg')) continue;

  const newFile = file.slice(0, -currentExt.length) + realExt;
  renameSync(file, newFile);

  const oldWeb = '/' + path.relative(path.join(ROOT, 'public'), file);
  const newWeb = '/' + path.relative(path.join(ROOT, 'public'), newFile);
  renames.set(oldWeb, newWeb);
}

console.log(`Renamed ${renames.size} files to match their real format.`);

// Now patch every reference across content files.
const targets = [
  ...walk(path.join(ROOT, 'src', 'content', 'posts')).filter((f) => f.endsWith('.md')),
  path.join(ROOT, 'src', 'content', 'data', 'insights-visuales.json'),
  path.join(ROOT, 'src', 'content', 'data', 'dato-incomodo.json'),
];

let filesPatched = 0;
for (const file of targets) {
  let text = readFileSync(file, 'utf-8');
  let changed = false;
  for (const [oldWeb, newWeb] of renames) {
    if (text.includes(oldWeb)) {
      text = text.split(oldWeb).join(newWeb);
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(file, text);
    filesPatched++;
  }
}

console.log(`Patched references in ${filesPatched} content files.`);
