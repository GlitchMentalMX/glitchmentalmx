import { blobPath, fillStroke, ink, pixelGrid, rng, roughPoly, roundRectPath, type Draw } from '../core/gfx';
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
// 4. GLITCHMAN — garabato mal dibujado con contornos inestables
// =====================================================================
const ghosted = (ctx: CanvasRenderingContext2D, drawShape: () => void, fill: string): void => {
  for (const [dx, dy, c] of [[-3, 1, '#00e5ff'], [3, -1, '#ff2fd0']] as const) {
    ctx.save(); ctx.translate(dx, dy); drawShape(); ink(ctx, c, 3); ctx.stroke(); ctx.restore();
  }
  drawShape(); ctx.fillStyle = fill; ctx.fill(); ink(ctx, '#111', 3.4); ctx.stroke();
};
const glHead = (react: boolean): Draw => (ctx) => {
  const r = rng(react ? 82 : 81);
  const shape = () => roughPoly(ctx, [[8, 8], [56, 5], [58, 50], [30, 53], [7, 50]], rng(5), 2.4);
  ghosted(ctx, shape, '#f4f4f0');
  // fragmento "perdido": rectángulo de color que no pertenece a la cara
  ctx.fillStyle = '#00e5ff'; ctx.fillRect(40, 8, 14, 7);
  ctx.fillStyle = '#ff2fd0'; ctx.fillRect(10, 44, 9, 5);
  ink(ctx, '#111', 3.4);
  ctx.beginPath(); ctx.moveTo(15, 18); ctx.lineTo(27, 30); ctx.moveTo(27, 18); ctx.lineTo(15, 30); ctx.stroke();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.arc(43, 25, react ? 6 : 3.4, 0, Math.PI * 2); ctx.fill();
  ink(ctx, '#111', 3);
  ctx.beginPath();
  if (react) { ctx.moveTo(14, 40); for (let i = 0; i < 8; i++) ctx.lineTo(14 + i * 5.5, 40 + (i % 2 ? 7 : -3)); }
  else { ctx.moveTo(16, 41); ctx.lineTo(24, 36); ctx.lineTo(31, 43); ctx.lineTo(40, 36); ctx.lineTo(47, 41); }
  ctx.stroke();
  void r;
};
const glBody: Draw = (ctx) => {
  const shape = () => roughPoly(ctx, [[10, 4], [42, 4], [48, 44], [4, 44]], rng(9), 2);
  ghosted(ctx, shape, '#f4f4f0');
  ink(ctx, '#111', 2);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) { ctx.moveTo(14 + i * 5, 12); ctx.lineTo(10 + i * 5, 36); }
  ctx.stroke();
  ctx.fillStyle = '#ff2fd0'; ctx.fillRect(22, 22, 12, 4);
};
const glLeg: Draw = (ctx) => {
  ink(ctx, '#00e5ff', 5); ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(5, 22); ctx.stroke();
  ink(ctx, '#ff2fd0', 5); ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(10, 22); ctx.stroke();
  ink(ctx, '#111', 5); ctx.beginPath(); ctx.moveTo(7.5, 0); ctx.lineTo(7.5, 22); ctx.lineTo(13, 27); ctx.stroke();
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

export const PARTS = {
  don: [
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
  glitchman: [
    part('legL', 'gl_leg', 16, 28, -10, -26, 0.5, 0, glLeg),
    part('legR', 'gl_leg', 16, 28, 10, -26, 0.5, 0, glLeg),
    part('body', 'gl_body', 54, 48, 0, -24, 0.5, 1, glBody),
    part('head', 'gl_head', 66, 58, 0, -64, 0.5, 1, glHead(false)),
    part('headReact', 'gl_head_r', 66, 58, 0, -64, 0.5, 1, glHead(true)),
  ],
  heroe: [
    part('legL', 'hero_leg', 4 * PX, 4 * PX, -11, -20, 0.5, 0, heroLeg, true),
    part('legR', 'hero_leg', 4 * PX, 4 * PX, 11, -20, 0.5, 0, heroLeg, true),
    part('body', 'hero_body', 10 * PX, 7 * PX, 0, -18, 0.5, 1, heroBody, true),
    part('extra', 'hero_scarf', 8 * PX, 3 * PX, -20, -46, 0, 0.5, heroScarf, true),
    part('head', 'hero_head', 12 * PX, 12 * PX, 0, -50, 0.5, 1, heroHead(false), true),
    part('headReact', 'hero_head_r', 12 * PX, 12 * PX, 0, -50, 0.5, 1, heroHead(true), true),
  ],
} satisfies Record<string, PartSpec[]>;
