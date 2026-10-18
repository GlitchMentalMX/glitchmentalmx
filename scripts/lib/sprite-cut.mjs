// Utilidad compartida por los scripts make-*-sprite.mjs: abre una hoja de
// referencia con fondo liso, borra el fondo y guarda recortes con
// transparencia en public/juego/<carpeta>/.
// El fondo se borra por inundación desde los bordes (y las bolsas de fondo
// grandes encerradas, p. ej. entre las piernas); así las líneas de tinta
// oscuras DENTRO del personaje nunca se confunden con el fondo.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

export async function openSheet(src, { bg, tol = 14, pocket = 600 }) {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const near = (p) => Math.hypot(data[p * 3] - bg[0], data[p * 3 + 1] - bg[1], data[p * 3 + 2] - bg[2]) < tol;
  const isBg = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (isBg[p] || !near(p)) return;
    isBg[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % w, y = (p / w) | 0;
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
  // Bolsas de fondo encerradas: se borran solo si son grandes.
  const seen = new Uint8Array(w * h);
  for (let s = 0; s < w * h; s++) {
    if (isBg[s] || seen[s] || !near(s)) continue;
    const comp = [s];
    seen[s] = 1;
    for (let i = 0; i < comp.length; i++) {
      const q = comp[i];
      const x = q % w, y = (q / w) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const r = ny * w + nx;
        if (!isBg[r] && !seen[r] && near(r)) { seen[r] = 1; comp.push(r); }
      }
    }
    if (comp.length > pocket) for (const q of comp) isBg[q] = 1;
  }

  // `include(x, y)` devuelve true/false o un número 0-1 (opacidad): sirve para
  // difuminar el borde de corte de una pieza y que no se note la costura.
  async function cut(folder, name, x, y, cw, ch, include = () => true, keepRatio = 1) {
    const out = Buffer.alloc(cw * ch * 4);
    const fg = new Uint8Array(cw * ch);
    const alpha = new Float32Array(cw * ch);
    for (let j = 0; j < ch; j++) {
      for (let i = 0; i < cw; i++) {
        const p = (y + j) * w + x + i;
        const o = j * cw + i;
        const v = include(x + i, y + j);
        alpha[o] = v === true ? 1 : v === false ? 0 : v;
        fg[o] = !isBg[p] && alpha[o] > 0 ? 1 : 0;
        out[o * 4] = data[p * 3]; out[o * 4 + 1] = data[p * 3 + 1]; out[o * 4 + 2] = data[p * 3 + 2];
      }
    }
    // Solo la mancha más grande: descarta restos de figuras vecinas.
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
    // keepRatio < 1 conserva también las manchas pequeñas sueltas (p. ej. la moneda flotante).
    const biggest = Math.max(...sizes);
    for (let o = 0; o < cw * ch; o++) out[o * 4 + 3] = lab[o] >= 0 && sizes[lab[o]] >= biggest * (keepRatio < 1 ? keepRatio : 1) ? Math.round(255 * Math.min(1, alpha[o])) : 0;
    mkdirSync(`public/juego/${folder}`, { recursive: true });
    await sharp(out, { raw: { width: cw, height: ch, channels: 4 } }).webp({ quality: 92, alphaQuality: 95 }).toFile(`public/juego/${folder}/${name}.webp`);
    console.log(`${folder}/${name}`, cw, ch);
  }
  return { cut, width: w, height: h };
}
