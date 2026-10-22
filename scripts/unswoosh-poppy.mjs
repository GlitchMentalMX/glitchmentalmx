// Borra el logo (swoosh) de los tenis de Poppy: pinta de turquesa lo oscuro dentro de cada caja.
// Ya aplicado a public/juego/modo-dios/{legs,pose}.webp; no hace falta repetirlo.
// Uso: node scripts/unswoosh-poppy.mjs <entrada.webp> <salida.webp> x0,y0,x1,y1 [...]
import sharp from 'sharp';
const [,, file, out, ...boxes] = process.argv;
const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, ch = 4;
const px = (x, y) => (y * W + x) * ch;
const isTeal = (r, g, b) => b > r + 50 && g > r + 40 && b > 120;
for (const bs of boxes) {
  const [x0, y0, x1, y1] = bs.split(',').map(Number);
  // color de relleno: mediana del turquesa dentro de la caja ampliada
  const rs = [], gs = [], bsx = [];
  for (let y = y0 - 8; y < y1 + 8; y++) for (let x = x0 - 8; x < x1 + 8; x++) {
    const i = px(x, y); if (data[i + 3] < 250) continue;
    if (isTeal(data[i], data[i + 1], data[i + 2])) { rs.push(data[i]); gs.push(data[i + 1]); bsx.push(data[i + 2]); }
  }
  const med = (a) => a.sort((p, q) => p - q)[a.length >> 1];
  const fill = [med(rs), med(gs), med(bsx)];
  let n = 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = px(x, y);
    if (data[i + 3] < 200) continue;
    const lum = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
    if (lum < 128) { data[i] = fill[0]; data[i + 1] = fill[1]; data[i + 2] = fill[2]; n++; }
  }
  console.log(bs, 'fill', fill.join(','), 'px', n);
}
await sharp(data, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(out);
