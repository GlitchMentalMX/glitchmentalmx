// Recorta la cabeza de Glitchman del close-up de referencia (fondo azul
// marino liso) y la guarda con fondo transparente en public/juego/. Se usa
// un relleno por inundación desde los bordes: solo se borra el fondo
// conectado con el exterior, nunca el pelo negro ni las líneas de tinta.
// Uso: node scripts/make-glitchman-head.mjs <close-up.png>
// public/juego/ queda fuera de public/images/, así que optimize-images y
// watermark-new-uploads no tocan el recorte.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta del close-up de referencia.');
const CROP = { left: 12, top: 58, width: 360, height: 376 };
const TOL = 11;

const { data, info } = await sharp(src).extract(CROP).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const bg = [0, 11, 28];
const near = (i) => Math.hypot(data[i] - bg[0], data[i + 1] - bg[1], data[i + 2] - bg[2]) < TOL;
const out = Buffer.alloc(w * h * 4);
const seen = new Uint8Array(w * h);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const p = y * w + x;
  if (seen[p] || !near(p * 3)) return;
  seen[p] = 1;
  stack.push(p);
};
for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % w, y = (p / w) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}
for (let p = 0; p < w * h; p++) {
  out[p * 4] = data[p * 3]; out[p * 4 + 1] = data[p * 3 + 1]; out[p * 4 + 2] = data[p * 3 + 2];
  out[p * 4 + 3] = seen[p] ? 0 : 255;
}
// Borde suave de 1 px para que no quede halo azul.
const img = sharp(out, { raw: { width: w, height: h, channels: 4 } });
mkdirSync('public/juego', { recursive: true });
await img.clone().webp({ quality: 92, alphaQuality: 95 }).toFile('public/juego/glitchman-head.webp');
if (process.argv[3]) await img.clone().flatten({ background: '#ff00ff' }).png().toFile(process.argv[3]);
console.log('listo', w, h);
