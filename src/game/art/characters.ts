import { blobPath, fillStroke, ink, pixelGrid, rng, roughPoly, roundRectPath, type Draw } from '../core/gfx';
import { IMAGE_SETS, loadedImages } from '../core/images';
import type { PartSpec } from '../engine/types';

// Arte PROVISIONAL de los cinco personajes, dibujado por código. Cada uno usa
// un lenguaje visual distinto a propósito (la heterogeneidad es parte de la
// marca): trazo imperfecto, sombreado casi 3D, color plano gráfico, garabato
// con fallos y pixel art. Cuando existan los diseños definitivos basta con
// reemplazar la función `draw` de cada pieza por una imagen: el resto del
// sistema (Actor, movimiento, reacciones) no cambia.

const part = (role: PartSpec['role'], key: string, w: number, h: number, x: number, y: number, px: number, py: number, draw: Draw, pixel = false): PartSpec => ({
  role, key, w, h, x, y, px, py, draw, pixel,
});

// =====================================================================
// 1. EL DON — caricatura de trazo imperfecto
// =====================================================================
const donHead = (react: boolean): Draw => (ctx) => {
  const r = rng(react ? 12 : 11);
  for (const cx of [10, 62]) {
    blobPath(ctx, cx, 30, 8, 13, r, 1.2);
    fillStroke(ctx, '#f6f3ec', '#111', 2.5);
  }
  blobPath(ctx, 36, 34, 25, 25, r, 1.6);
  fillStroke(ctx, '#f2c6a0', '#111', 3);
  ink(ctx, '#111', 1.8);
  ctx.beginPath();
  ctx.moveTo(30, 11); ctx.quadraticCurveTo(33, 4, 36, 10);
  ctx.moveTo(38, 10); ctx.quadraticCurveTo(42, 3, 44, 11);
  ctx.stroke();
  // cejas pobladas
  ctx.fillStyle = '#f6f3ec';
  const by = react ? 17 : 21;
  for (const ex of [26, 46]) {
    roughPoly(ctx, [[ex - 10, by + 3], [ex - 4, by - 2], [ex + 7, by], [ex + 10, by + 4], [ex, by + 1]], r, 0.8);
    fillStroke(ctx, '#f6f3ec', '#111', 2);
  }
  // lentes gruesos
  for (const ex of [26, 46]) {
    blobPath(ctx, ex, 34, 11, 11, r, 0.8);
    fillStroke(ctx, '#ffffff', '#111', 3.6);
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(ex + (react ? 0 : 2), 35, react ? 1.6 : 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ink(ctx, '#111', 3);
  ctx.beginPath(); ctx.moveTo(37, 33); ctx.lineTo(35, 33); ctx.stroke();
  // nariz y bigote
  blobPath(ctx, 36, 45, 5.5, 5, r, 0.8);
  fillStroke(ctx, '#e8a98a', '#111', 2);
  ctx.beginPath();
  ctx.moveTo(24, 52); ctx.quadraticCurveTo(36, 46, 48, 52); ctx.quadraticCurveTo(36, 58, 24, 52);
  fillStroke(ctx, '#f6f3ec', '#111', 2);
  ink(ctx, '#111', 2.2);
  ctx.beginPath();
  if (react) { ctx.arc(36, 58, 3, 0, Math.PI * 2); }
  else { ctx.moveTo(31, 57); ctx.quadraticCurveTo(36, 60, 41, 57); }
  ctx.stroke();
};
const donBody: Draw = (ctx) => {
  const r = rng(21);
  roughPoly(ctx, [[8, 40], [4, 18], [14, 4], [50, 4], [60, 18], [58, 40]], r, 1.6);
  fillStroke(ctx, '#8a5a3b', '#111', 3);
  roughPoly(ctx, [[24, 5], [40, 5], [37, 38], [27, 38]], r, 1);
  fillStroke(ctx, '#e9e2cf', '#111', 2.4);
  ctx.fillStyle = '#111';
  for (const y of [14, 24, 33]) { ctx.beginPath(); ctx.arc(46, y, 2, 0, Math.PI * 2); ctx.fill(); }
  blobPath(ctx, 8, 30, 5, 5, r, 0.6); fillStroke(ctx, '#f2c6a0', '#111', 2);
  blobPath(ctx, 58, 30, 5, 5, r, 0.6); fillStroke(ctx, '#f2c6a0', '#111', 2);
};
const donLeg: Draw = (ctx) => {
  const r = rng(31);
  roughPoly(ctx, [[3, 1], [17, 1], [16, 14], [4, 14]], r, 0.8);
  fillStroke(ctx, '#6d7380', '#111', 2.6);
  roughPoly(ctx, [[1, 14], [18, 14], [20, 21], [0, 21]], r, 0.8);
  fillStroke(ctx, '#4a2e1c', '#111', 2.6);
};
const donCane: Draw = (ctx) => {
  ink(ctx, '#111', 6.5);
  ctx.beginPath(); ctx.moveTo(9, 46); ctx.lineTo(9, 8); ctx.arc(14, 8, 5, Math.PI, 0); ctx.stroke();
  ink(ctx, '#a8703f', 3.6);
  ctx.beginPath(); ctx.moveTo(9, 46); ctx.lineTo(9, 8); ctx.arc(14, 8, 5, Math.PI, 0); ctx.stroke();
};

// =====================================================================
// 2. EL CAPIBARA — criatura casi 3D, sombreado suave
// =====================================================================
const capiHead = (react: boolean): Draw => (ctx, w, h) => {
  const g = ctx.createRadialGradient(24, 14, 4, 30, 26, 38);
  g.addColorStop(0, '#d9a574'); g.addColorStop(0.6, '#a8744a'); g.addColorStop(1, '#6e4528');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(6, 30); ctx.quadraticCurveTo(4, 8, 28, 5); ctx.quadraticCurveTo(54, 4, 59, 24); ctx.quadraticCurveTo(62, 44, 46, 47); ctx.quadraticCurveTo(14, 50, 6, 30);
  ctx.fill();
  // orejita
  ctx.fillStyle = '#6e4528';
  ctx.beginPath(); ctx.ellipse(13, 9, 5, react ? 8 : 5, -0.4, 0, Math.PI * 2); ctx.fill();
  // hocico
  const gs = ctx.createRadialGradient(52, 22, 2, 52, 24, 14);
  gs.addColorStop(0, '#5a3a24'); gs.addColorStop(1, '#3b2415');
  ctx.fillStyle = gs;
  ctx.beginPath(); ctx.ellipse(54, 24, 7, 11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1a0f08';
  ctx.beginPath(); ctx.arc(55, 19, 1.6, 0, Math.PI * 2); ctx.arc(55, 27, 1.6, 0, Math.PI * 2); ctx.fill();
  // ojo
  ctx.fillStyle = '#1a0f08';
  if (react) {
    ink(ctx, '#1a0f08', 2.4);
    ctx.beginPath(); ctx.arc(30, 22, 4, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.ellipse(30, 22, 3.4, 3.6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a8744a';
    ctx.beginPath(); ctx.ellipse(30, 19.6, 4.4, 2.6, 0, 0, Math.PI * 2); ctx.fill();
  }
  // brillo
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath(); ctx.ellipse(22, 12, 9, 4, -0.3, 0, Math.PI * 2); ctx.fill();
  void w; void h;
};
const capiBody: Draw = (ctx) => {
  const g = ctx.createRadialGradient(40, 16, 6, 54, 30, 62);
  g.addColorStop(0, '#d2a06e'); g.addColorStop(0.55, '#a8744a'); g.addColorStop(1, '#5d3a21');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(54, 30, 52, 27, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,230,190,0.22)';
  ctx.beginPath(); ctx.ellipse(46, 40, 30, 11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath(); ctx.ellipse(40, 12, 22, 5, -0.15, 0, Math.PI * 2); ctx.fill();
};
const capiLeg: Draw = (ctx) => {
  const g = ctx.createLinearGradient(0, 0, 0, 16);
  g.addColorStop(0, '#8f5f3b'); g.addColorStop(1, '#4a2e1b');
  ctx.fillStyle = g;
  roundRectPath(ctx, 2, 0, 16, 16, 6); ctx.fill();
};
const yuzu: Draw = (ctx) => {
  const g = ctx.createRadialGradient(8, 6, 1, 10, 10, 10);
  g.addColorStop(0, '#ffe27a'); g.addColorStop(1, '#f0a315');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(10, 10, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#4b8a2d'; ctx.beginPath(); ctx.ellipse(11, 2, 4, 2, -0.5, 0, Math.PI * 2); ctx.fill();
};

// =====================================================================
// 3. LA CHICA DEL MODO DIOS — color plano, formas angulares
// =====================================================================
const chicaHead = (react: boolean): Draw => (ctx) => {
  const r = rng(41);
  roughPoly(ctx, [[8, 30], [6, 10], [20, 0], [42, 0], [56, 10], [56, 30], [48, 50], [16, 50]], r, 0.4);
  fillStroke(ctx, '#e9a57e', '#111', 3.4);
  roughPoly(ctx, [[2, 24], [6, 6], [14, -2], [22, 6], [30, -4], [38, 6], [46, -2], [56, 6], [62, 24], [52, 14], [40, 18], [28, 12], [14, 18]], r, 0.3);
  fillStroke(ctx, '#7a2cf0', '#111', 3.4);
  for (const ex of [20, 42]) {
    roughPoly(ctx, [[ex - 9, 27], [ex, 22], [ex + 9, 27], [ex, 33]], r, 0.3);
    fillStroke(ctx, '#ffffff', '#111', 2.6);
    ctx.fillStyle = '#00e0ff';
    ctx.beginPath(); ctx.arc(ex + 1, 27, react ? 3.8 : 2.6, 0, Math.PI * 2); ctx.fill();
  }
  ink(ctx, '#111', 3.4);
  ctx.beginPath(); ctx.moveTo(10, react ? 14 : 19); ctx.lineTo(28, react ? 20 : 22); ctx.moveTo(34, 22); ctx.lineTo(52, react ? 14 : 18); ctx.stroke();
  ink(ctx, '#111', 3);
  ctx.beginPath();
  if (react) { ctx.moveTo(24, 40); ctx.lineTo(38, 40); ctx.lineTo(31, 46); ctx.closePath(); ctx.fillStyle = '#c0224a'; ctx.fill(); }
  else { ctx.moveTo(22, 41); ctx.quadraticCurveTo(34, 47, 44, 38); }
  ctx.stroke();
  ctx.fillStyle = '#ffd400';
  roughPoly(ctx, [[48, 40], [52, 44], [56, 40], [52, 36]], r, 0.2); ctx.fill();
};
const chicaBody: Draw = (ctx) => {
  const r = rng(51);
  roughPoly(ctx, [[6, 42], [2, 14], [14, 2], [44, 2], [56, 14], [52, 42]], r, 0.4);
  fillStroke(ctx, '#ff2e93', '#111', 3.4);
  roughPoly(ctx, [[29, 2], [44, 2], [56, 14], [52, 42], [29, 42]], r, 0.2);
  fillStroke(ctx, '#00e0ff', '#111', 3.4);
  ctx.fillStyle = '#ffd400';
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? 4 : 9;
    const x = 29 + Math.cos(a) * rr; const y = 22 + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath(); fillStroke(ctx, '#ffd400', '#111', 2);
};
const chicaLeg: Draw = (ctx) => {
  const r = rng(61);
  roughPoly(ctx, [[3, 0], [15, 0], [14, 17], [4, 17]], r, 0.3);
  fillStroke(ctx, '#17141f', '#111', 2.6);
  roughPoly(ctx, [[0, 17], [18, 17], [20, 26], [0, 26]], r, 0.3);
  fillStroke(ctx, '#00e0ff', '#111', 2.6);
  ctx.fillStyle = '#ffd400'; ctx.fillRect(0, 23.5, 20, 2.5);
};
const chicaTail: Draw = (ctx) => {
  const r = rng(71);
  roughPoly(ctx, [[33, 2], [18, 12], [4, 30], [2, 54], [12, 40], [14, 28], [28, 20], [36, 8]], r, 0.4);
  fillStroke(ctx, '#7a2cf0', '#111', 3);
};

// =====================================================================
// 4. GLITCHMAN — caricatura de tinta (basada en el close-up de referencia de
//    Jorge) con fallos visuales: desfase cromático y fragmentos fuera de lugar.
//    Piel gris, pelo negro revuelto, párpados caídos con ojeras, nariz larga,
//    camisa azul eléctrico con bolsillo. Cuerpo y piernas son PROVISIONALES
//    (la referencia solo muestra de los hombros hacia arriba).
// =====================================================================
const GREY = '#a3a8ab';
const GREY_D = '#7e8386';
const BLUE = '#1f4fff';
const BLUE_D = '#0e2fc4';
const glGhost = (ctx: CanvasRenderingContext2D, path: () => void): void => {
  for (const [dx, dy, c] of [[-2.5, 1, '#00e5ff'], [2.5, -1, '#ff2fd0']] as const) {
    ctx.save(); ctx.translate(dx, dy); path(); ink(ctx, c, 2.6); ctx.stroke(); ctx.restore();
  }
};
const glHead = (react: boolean): Draw => (ctx) => {
  const r = rng(react ? 82 : 81);
  // orejas
  for (const cx of [11, 69]) {
    blobPath(ctx, cx, 50, 7, 10, r, 1);
    fillStroke(ctx, GREY, '#0d0f12', 3);
    ink(ctx, '#0d0f12', 1.6); ctx.beginPath(); ctx.arc(cx + (cx < 40 ? 1 : -1), 50, 3.4, 0, Math.PI * 2); ctx.stroke();
  }
  // cara (con fantasmas cromáticos detrás)
  const face = () => blobPath(ctx, 40, 50, 24, 26, rng(7), 1.8, 24);
  glGhost(ctx, face);
  face();
  const g = ctx.createLinearGradient(20, 26, 60, 76);
  g.addColorStop(0, '#c2c6c8'); g.addColorStop(1, '#9a9fa2');
  fillStroke(ctx, g as unknown as string, '#0d0f12', 3.4);
  // pelo revuelto
  roughPoly(ctx, [[10, 46], [2, 30], [12, 28], [3, 12], [19, 17], [15, 3], [30, 13], [37, 0], [46, 12], [58, 3], [59, 15], [75, 9], [68, 23], [78, 32], [69, 40], [71, 50], [62, 38], [52, 30], [38, 33], [24, 31], [14, 42]], r, 1.2);
  fillStroke(ctx, '#0d0f12', '#0d0f12', 2);
  ink(ctx, '#7c8187', 1.4);
  ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(28, 12); ctx.moveTo(46, 14); ctx.lineTo(52, 6); ctx.moveTo(62, 22); ctx.lineTo(70, 17); ctx.stroke();
  // cejas
  ink(ctx, '#0d0f12', 3.4);
  ctx.beginPath();
  if (react) { ctx.moveTo(21, 33); ctx.quadraticCurveTo(29, 27, 36, 32); ctx.moveTo(44, 32); ctx.quadraticCurveTo(52, 27, 60, 33); }
  else { ctx.moveTo(21, 41); ctx.quadraticCurveTo(28, 34, 37, 38); ctx.moveTo(44, 38); ctx.quadraticCurveTo(52, 34, 60, 41); }
  ctx.stroke();
  // ojos: párpados caídos y ojeras (o bien abiertos de sorpresa)
  for (const ex of [29, 52]) {
    blobPath(ctx, ex, 48, react ? 7.5 : 8.5, react ? 7.5 : 5.2, r, 0.5);
    fillStroke(ctx, '#e6e8e9', '#0d0f12', 2.6);
    ctx.fillStyle = '#0d0f12';
    ctx.beginPath(); ctx.arc(ex + (react ? 0 : 2), react ? 48 : 50, react ? 2 : 3, 0, Math.PI * 2); ctx.fill();
    if (!react) { ink(ctx, '#0d0f12', 3.4); ctx.beginPath(); ctx.moveTo(ex - 9, 45.5); ctx.lineTo(ex + 9, 46.5); ctx.stroke(); }
    ink(ctx, '#0d0f12', 1.6); ctx.beginPath(); ctx.arc(ex, 53.5, 8.5, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
  }
  // nariz larga y caída
  ctx.beginPath();
  ctx.moveTo(40, 42); ctx.quadraticCurveTo(43, 58, 51, 61); ctx.quadraticCurveTo(63, 62, 59, 70); ctx.quadraticCurveTo(50, 75, 40, 69); ctx.quadraticCurveTo(35, 60, 36, 47);
  fillStroke(ctx, '#cfd3d5', '#0d0f12', 3.4);
  // boca y arrugas
  ink(ctx, '#0d0f12', 2.6);
  ctx.beginPath();
  if (react) { ctx.arc(32, 69, 3, 0, Math.PI * 2); }
  else { ctx.moveTo(26, 69); ctx.quadraticCurveTo(34, 64, 44, 69); ctx.lineTo(46, 72); }
  ctx.stroke();
  ink(ctx, '#0d0f12', 1.4);
  ctx.beginPath(); ctx.moveTo(26, 58); ctx.lineTo(23, 63); ctx.moveTo(58, 58); ctx.lineTo(61, 63); ctx.stroke();
  // fallos: franjas fuera de lugar
  ctx.fillStyle = '#00e5ff'; ctx.fillRect(46, 20, 15, 4);
  ctx.fillStyle = '#ff2fd0'; ctx.fillRect(14, 62, 10, 3);
};
const glBody: Draw = (ctx) => {
  const r = rng(91);
  // manos
  for (const cx of [6, 50]) { blobPath(ctx, cx, 40, 4.5, 5, r, 0.6); fillStroke(ctx, GREY, '#0d0f12', 2.4); }
  const shirt = () => roughPoly(ctx, [[14, 6], [42, 6], [53, 14], [55, 38], [48, 40], [46, 22], [44, 44], [12, 44], [10, 22], [8, 40], [1, 38], [3, 14]], rng(5), 0.8);
  glGhost(ctx, shirt);
  shirt();
  fillStroke(ctx, BLUE, '#0d0f12', 3.2);
  ink(ctx, BLUE_D, 2.4);
  ctx.beginPath(); ctx.moveTo(20, 14); ctx.lineTo(18, 42); ctx.moveTo(36, 14); ctx.lineTo(38, 42); ctx.moveTo(8, 18); ctx.lineTo(6, 36); ctx.moveTo(48, 18); ctx.lineTo(50, 36); ctx.stroke();
  // cuello y solapas
  roughPoly(ctx, [[22, 3], [34, 3], [28, 17]], r, 0.5);
  fillStroke(ctx, GREY, '#0d0f12', 2.4);
  roughPoly(ctx, [[14, 6], [24, 3], [28, 17], [20, 22]], r, 0.5);
  fillStroke(ctx, BLUE, '#0d0f12', 2.4);
  roughPoly(ctx, [[42, 6], [32, 3], [28, 17], [36, 22]], r, 0.5);
  fillStroke(ctx, BLUE, '#0d0f12', 2.4);
  // bolsillo y botones
  ctx.strokeStyle = '#0d0f12'; ctx.lineWidth = 2; ctx.strokeRect(33, 24, 10, 10);
  ctx.fillStyle = '#0d0f12';
  for (const y of [26, 34]) { ctx.beginPath(); ctx.arc(28, y, 1.4, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#ff2fd0'; ctx.fillRect(10, 30, 8, 3);
};
const glLeg: Draw = (ctx) => {
  const r = rng(95);
  roughPoly(ctx, [[3, 1], [14, 1], [13, 20], [4, 20]], r, 0.6);
  fillStroke(ctx, '#1a2038', '#0d0f12', 2.8);
  roughPoly(ctx, [[1, 20], [16, 20], [18, 27], [0, 27]], r, 0.6);
  fillStroke(ctx, '#0d0f12', '#0d0f12', 2);
  ctx.fillStyle = '#00e5ff'; ctx.fillRect(3, 24, 5, 1.6);
};

// =====================================================================
// 5. EL HÉROE DEL CARTUCHO PERDIDO — pixel art de 8 bits
// =====================================================================
const PX = 5;
const heroPal = {
  k: '#14110f', g: '#aeb6c1', G: '#6e7886', y: '#ffd23f', e: '#1b1b1b', r: '#e0342b',
  p: '#7b3fe4', P: '#4a2494', o: '#ff8a1f', s: '#f2b880', S: '#f2b880', B: '#2b59c3', O: '#ff8a1f', c: '#00e5ff',
};
const heroHead = (react: boolean): Draw => (ctx) => {
  pixelGrid(ctx, [
    '.kkkkkkkkkk.',
    'kggggggggggk',
    'kgkkkkkkkkgk',
    'kgkyyyyyykgk',
    react ? 'kgkyeyyeykgk' : 'kgkyyyyyykgk',
    'kgkyeyyeykgk',
    react ? 'kgkyeyyeykgk' : 'kgkyyyyyykgk',
    react ? 'kgkyyrryykgk' : 'kgkyrrrrykgk',
    react ? 'kgkyyrryykgk' : 'kgkyyyyyykgk',
    'kgkkkkkkkkgk',
    'kGGGGGGGGGGk',
    '.kkkkkkkkkk.',
  ], heroPal, PX);
};
const heroBody: Draw = (ctx) => pixelGrid(ctx, [
  '.kkkkkkkk.',
  'kppppppppk',
  'sppppppppS',
  'spppoopppS',
  'kppppppppk',
  'kPPPPPPPPk',
  '.kkkkkkkk.',
], heroPal, PX);
const heroLeg: Draw = (ctx) => pixelGrid(ctx, ['kBBk', 'kBBk', 'kOOk', 'kkkk'], heroPal, PX);
const heroScarf: Draw = (ctx) => pixelGrid(ctx, ['kkkkkkk.', 'kcccccck', '.kkkkkk.'], heroPal, PX);

// ---------------------------------------------------------------------

// Glitchman con la ilustración de referencia de Jorge, cortada en piezas que el
// Actor anima por separado. Escala: 0.18 unidades por píxel de la hoja original.
const GS = 0.18;
const sliceDraw = (url: string): Draw => (ctx, w, h) => {
  const im = loadedImages.get(url);
  if (im) ctx.drawImage(im, 0, 0, w, h);
};
const glitchmanSprite: PartSpec[] = [
  part('legL', 'glx_legs', 244 * GS, 352 * GS, 0, -(712 - 360) * GS, 0.5, 0, sliceDraw(IMAGE_SETS.glitchman.legs)),
  part('body', 'glx_torso', 244 * GS, 242 * GS, 0, -(712 - 392) * GS, 0.5, 1, sliceDraw(IMAGE_SETS.glitchman.torso)),
  part('head', 'glx_head', 160 * GS, 152 * GS, 0, -(712 - 152) * GS, 0.5, 1, sliceDraw(IMAGE_SETS.glitchman.head)),
  part('headReact', 'glx_head_r', 220 * 0.73 * GS, 250 * 0.73 * GS, 0, -(712 - 152) * GS + 4, 0.5, 1, sliceDraw(IMAGE_SETS.glitchman.headReact)),
];

// El Don con la ilustración de la hoja de referencia, cortada en piezas.
// Escala: 0.17 unidades por píxel de la hoja. Figura: x 99-398, y 24-699
// (pies en y=699, centro en x=250). Las piernas incluyen el bastón.
const DS = 0.17;
const donSprite: PartSpec[] = [
  part('legL', 'dnx_legs', 300 * DS, 303 * DS, ((99 + 150) - 250) * DS, -(699 - 396) * DS, 0.5, 0, sliceDraw(IMAGE_SETS.don.legs)),
  part('body', 'dnx_torso', 300 * DS, 330 * DS, ((99 + 150) - 250) * DS, -(699 - 480) * DS, 0.5, 1, sliceDraw(IMAGE_SETS.don.torso)),
  part('head', 'dnx_head', 200 * DS, 145 * DS, ((140 + 100) - 250) * DS, -(699 - 163) * DS, 0.5, 1, sliceDraw(IMAGE_SETS.don.head)),
  part('headReact', 'dnx_head_r', 470 * 0.4 * DS, 422 * 0.4 * DS, ((140 + 100) - 250) * DS, -(699 - 163) * DS, 0.5, 1, sliceDraw(IMAGE_SETS.don.headReact)),
];
// Pose característica (bastón en alto): 5% más grande en la hoja; ancla en el centro de los pies (531, 1479).
const donPose: PartSpec = part('extra', 'dnx_pose', 384 * DS * 0.952, 743 * DS * 0.952, 0, 0, (531 - 300) / 384, (1479 - 740) / 743, sliceDraw(IMAGE_SETS.don.pose));

export const PARTS = {
  donDrawn: [
    part('legL', 'don_leg', 20, 22, -11, -20, 0.5, 0, donLeg),
    part('legR', 'don_leg', 20, 22, 11, -20, 0.5, 0, donLeg),
    part('body', 'don_body', 66, 44, 0, -18, 0.5, 1, donBody),
    part('extra', 'don_cane', 18, 48, 36, -44, 0.5, 0.1, donCane),
    part('head', 'don_head', 72, 64, 0, -54, 0.5, 1, donHead(false)),
    part('headReact', 'don_head_r', 72, 64, 0, -54, 0.5, 1, donHead(true)),
  ],
  capibara: [
    part('legL', 'capi_leg', 20, 16, -26, -14, 0.5, 0, capiLeg),
    part('legR', 'capi_leg', 20, 16, 14, -14, 0.5, 0, capiLeg),
    part('body', 'capi_body', 108, 58, -8, -12, 0.5, 1, capiBody),
    part('head', 'capi_head', 64, 52, 38, -40, 0.5, 1, capiHead(false)),
    part('headReact', 'capi_head_r', 64, 52, 38, -40, 0.5, 1, capiHead(true)),
    part('hat', 'capi_yuzu', 20, 20, 32, -88, 0.5, 1, yuzu),
  ],
  'modo-dios': [
    part('legL', 'chica_leg', 20, 26, -10, -26, 0.5, 0, chicaLeg),
    part('legR', 'chica_leg', 20, 26, 10, -26, 0.5, 0, chicaLeg),
    part('body', 'chica_body', 58, 44, 0, -22, 0.5, 1, chicaBody),
    part('extra', 'chica_tail', 38, 58, -22, -92, 0.85, 0.08, chicaTail),
    part('head', 'chica_head', 64, 54, 0, -60, 0.5, 1, chicaHead(false)),
    part('headReact', 'chica_head_r', 64, 54, 0, -60, 0.5, 1, chicaHead(true)),
  ],
  glitchmanDrawn: [
    part('legL', 'gl_leg', 18, 28, -10, -26, 0.5, 0, glLeg),
    part('legR', 'gl_leg', 18, 28, 10, -26, 0.5, 0, glLeg),
    part('body', 'gl_body', 56, 46, 0, -22, 0.5, 1, glBody),
    part('head', 'gl_head', 72, 75, 0, -55, 0.5, 1, glHead(false)),
    part('headReact', 'gl_head_r', 72, 75, 0, -55, 0.5, 1, glHead(true)),
  ],
  glitchman: glitchmanSprite,
  don: donSprite,
  heroe: [
    part('legL', 'hero_leg', 4 * PX, 4 * PX, -11, -20, 0.5, 0, heroLeg, true),
    part('legR', 'hero_leg', 4 * PX, 4 * PX, 11, -20, 0.5, 0, heroLeg, true),
    part('body', 'hero_body', 10 * PX, 7 * PX, 0, -18, 0.5, 1, heroBody, true),
    part('extra', 'hero_scarf', 8 * PX, 3 * PX, -20, -46, 0, 0.5, heroScarf, true),
    part('head', 'hero_head', 12 * PX, 12 * PX, 0, -50, 0.5, 1, heroHead(false), true),
    part('headReact', 'hero_head_r', 12 * PX, 12 * PX, 0, -50, 0.5, 1, heroHead(true), true),
  ],
} satisfies Record<string, PartSpec[]>;

export const POSES = { don: donPose } as const;
