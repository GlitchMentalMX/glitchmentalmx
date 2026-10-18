// Corta a Glitchman en piezas (cabeza, cabeza de reacción, torso, piernas) a
// partir de la hoja de poses de referencia (fondo azul marino liso) y las
// guarda con fondo transparente en public/juego/glitchman/. El juego las
// anima por separado (rebote, balanceo, reacciones) sin dibujo cuadro a cuadro.
// Uso: node scripts/make-glitchman-sprite.mjs <hoja-12-poses.webp>
// Está fuera de public/images/, así que optimize-images y
// watermark-new-uploads no tocan estas piezas.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta de la hoja de poses.');
const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const BG = [2, 16, 37];
const TOL = 16;
const isBg = (p) => Math.hypot(data[p * 3] - BG[0], data[p * 3 + 1] - BG[1], data[p * 3 + 2] - BG[2]) < TOL;

// Recorta una región; borra el fondo (también el que queda encerrado entre las
// piernas) y se queda solo con la mancha más grande para descartar restos de
// las figuras vecinas.
async function piece(name, x, y, cw, ch, keepLargest = true) {
  const out = Buffer.alloc(cw * ch * 4);
  const fg = new Uint8Array(cw * ch);
  for (let j = 0; j < ch; j++) {
    for (let i = 0; i < cw; i++) {
      const p = (y + j) * w + x + i;
      const o = j * cw + i;
      fg[o] = isBg(p) ? 0 : 1;
      out[o * 4] = data[p * 3]; out[o * 4 + 1] = data[p * 3 + 1]; out[o * 4 + 2] = data[p * 3 + 2];
    }
  }
  if (keepLargest) {
    const lab = new Int32Array(cw * ch).fill(-1);
    const sizes = [];
    for (let s = 0; s < cw * ch; s++) {
      if (!fg[s] || lab[s] >= 0) continue;
      const id = sizes.length;
      let n = 0;
      const st = [s];
      lab[s] = id;
      while (st.length) {
        const q = st.pop();
        n++;
        const qx = q % cw, qy = (q / cw) | 0;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = qx + dx, ny = qy + dy;
          if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
          const r = ny * cw + nx;
          if (fg[r] && lab[r] < 0) { lab[r] = id; st.push(r); }
        }
      }
      sizes.push(n);
    }
    const best = sizes.indexOf(Math.max(...sizes));
    for (let o = 0; o < cw * ch; o++) fg[o] = lab[o] === best ? 1 : 0;
  }
  for (let o = 0; o < cw * ch; o++) out[o * 4 + 3] = fg[o] ? 255 : 0;
  await sharp(out, { raw: { width: cw, height: ch, channels: 4 } }).webp({ quality: 92, alphaQuality: 95 }).toFile(`public/juego/glitchman/${name}.webp`);
  console.log(name, cw, ch);
}

mkdirSync('public/juego/glitchman', { recursive: true });
// Pose "indiferente" (encogido de hombros), fila inferior de la hoja: figura en x 1060-1296, y 459-1163.
const FX = 1056, FY = 455;
await piece('head', FX + 40, FY, 160, 152);
await piece('torso', FX, FY + 150, 244, 242);
await piece('legs', FX, FY + 360, 244, 352);
// Cabeza de reacción: busto "nervioso" de la fila superior.
await piece('head-react', 452, 72, 220, 250);
