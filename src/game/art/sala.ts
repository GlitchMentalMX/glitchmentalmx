import Phaser from 'phaser';
import { FONT, H, MONO, W } from '../core/config';
import { blobPath, fillStroke, ink, makeTex, rng, roughPoly, roundRectPath, type Draw } from '../core/gfx';
import { IMAGE_SETS, loadedImages } from '../core/images';
import { itemIconDraw } from '../data/items';

// Arte PROVISIONAL de la Sala de Espera, dibujado por código. Cada elemento
// usa un estilo distinto a propósito: fondo plano de caricatura, máquina casi
// 3D con degradados, impresora "mal dibujada" con trazo de marcador, sillas
// de color gráfico. Los definitivos reemplazan la función `draw` de cada
// textura (o cargan una imagen con el mismo `key`) sin tocar la lógica.

const text = (ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, weight = 'bold', font = FONT, align: CanvasTextAlign = 'center') => {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.textAlign = align;
  ctx.fillText(s, x, y);
};

const bg: Draw = (ctx) => {
  const r = rng(7);
  // pared
  const wall = ctx.createLinearGradient(0, 0, 0, 205);
  wall.addColorStop(0, '#cfd8e2'); wall.addColorStop(1, '#b3bfcc');
  ctx.fillStyle = wall; ctx.fillRect(0, 0, W, 205);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  for (let x = 0; x < W; x += 90) ctx.fillRect(x, 0, 3, 205);
  ctx.fillStyle = '#5b6678'; ctx.fillRect(0, 196, W, 12);
  ctx.fillStyle = '#3d4655'; ctx.fillRect(0, 205, W, 3);
  text(ctx, 'ATENCIÓN AL CLIENTE  ·  (ANTES: ATENCIÓN)', W / 2, 24, 13, 'rgba(40,50,70,0.65)', 'bold', MONO);
  // piso
  for (let y = 208, j = 0; y < H; y += 60, j++) {
    for (let x = 0, i = 0; x < W; x += 60, i++) {
      ctx.fillStyle = (i + j) % 2 ? '#e7e0d0' : '#dcd4c0';
      ctx.fillRect(x, y, 60, 60);
    }
  }
  ink(ctx, 'rgba(120,110,90,0.25)', 1.2);
  ctx.beginPath();
  for (let y = 208; y < H; y += 60) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  for (let x = 0; x < W; x += 60) { ctx.moveTo(x, 208); ctx.lineTo(x, H); }
  ctx.stroke();
  // alfombra
  blobPath(ctx, 270, 610, 205, 125, r, 3, 40);
  fillStroke(ctx, '#7a4ea8', '#2c1a45', 4);
  blobPath(ctx, 270, 610, 178, 100, r, 2, 40);
  fillStroke(ctx, '#e8c14d', '#2c1a45', 3);
  blobPath(ctx, 270, 610, 140, 74, r, 2, 40);
  fillStroke(ctx, '#2eb6a5', '#2c1a45', 3);
  ctx.fillStyle = '#7a4ea8';
  for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; ctx.beginPath(); ctx.arc(270 + Math.cos(a) * 100, 610 + Math.sin(a) * 52, 7, 0, Math.PI * 2); ctx.fill(); }
  text(ctx, 'SU OPINIÓN', 270, 606, 17, '#2c1a45');
  text(ctx, 'NOS IMPORTA*', 270, 626, 17, '#2c1a45');
  // póster "foto de stock" (granulado fotográfico, pegado sobre la caricatura)
  roundRectPath(ctx, 336, 42, 78, 106, 4); ctx.fillStyle = '#fff'; ctx.fill(); ink(ctx, '#333', 2); ctx.stroke();
  const ph = ctx.createLinearGradient(342, 48, 408, 120);
  ph.addColorStop(0, '#9fb7c9'); ph.addColorStop(0.5, '#e6d6c3'); ph.addColorStop(1, '#8e9f7a');
  ctx.fillStyle = ph; ctx.fillRect(342, 48, 66, 70);
  for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},0.07)`; ctx.fillRect(342 + r() * 66, 48 + r() * 70, 2, 2); }
  ctx.fillStyle = 'rgba(60,50,45,0.55)';
  ctx.beginPath(); ctx.arc(367, 76, 11, 0, Math.PI * 2); ctx.arc(386, 80, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(354, 88, 26, 30); ctx.fillRect(375, 90, 24, 28);
  text(ctx, 'ATENCIÓN', 375, 130, 9, '#222'); text(ctx, 'PERSONALIZADA*', 375, 141, 8, '#222');
  // viñeta
  const vg = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 640);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(10,8,20,0.1)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
};

const subFrame: Draw = (ctx) => {
  ctx.fillStyle = '#222a3b'; ctx.fillRect(2, 22, 166, 128);
  ctx.fillStyle = '#10151f'; ctx.fillRect(10, 32, 150, 118);
  const glow = ctx.createLinearGradient(0, 30, 0, 150);
  glow.addColorStop(0, '#ffe9a8'); glow.addColorStop(1, '#fff7dc');
  ctx.fillStyle = glow; ctx.fillRect(14, 36, 142, 114);
  roundRectPath(ctx, 14, 0, 142, 26, 8); ctx.fillStyle = '#ff2e93'; ctx.fill(); ink(ctx, '#fff', 3); ctx.stroke();
  text(ctx, 'SUSCRÍBETE', 85, 20, 17, '#fff');
  ctx.fillStyle = '#ffd400'; roundRectPath(ctx, 120, 44, 42, 22, 11); ctx.fill();
  ink(ctx, '#111', 2); ctx.stroke();
  text(ctx, 'GRATIS*', 141, 59, 10, '#111');
};
const subPanel: Draw = (ctx) => {
  const g = ctx.createLinearGradient(0, 0, 70, 0);
  g.addColorStop(0, 'rgba(160,215,255,0.88)'); g.addColorStop(1, 'rgba(210,240,255,0.7)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 70, 114);
  ink(ctx, '#2a3552', 4); ctx.strokeRect(2, 2, 66, 110);
  ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(10, 10, 6, 94);
};
const cancelDoor: Draw = (ctx) => {
  const r = rng(99);
  ctx.fillStyle = '#7e8590'; ctx.fillRect(4, 18, 44, 66);
  ink(ctx, '#2b2f38', 3); ctx.strokeRect(4, 18, 44, 66);
  ctx.fillStyle = '#6a717c'; ctx.fillRect(9, 24, 34, 58);
  ctx.fillStyle = '#d9d2a8'; ctx.beginPath(); ctx.arc(40, 56, 2.6, 0, Math.PI * 2); ctx.fill();
  roughPoly(ctx, [[2, 4], [50, 2], [51, 17], [3, 18]], r, 1);
  fillStroke(ctx, '#fffbe0', '#111', 2);
  text(ctx, 'CANCELAR', 26, 14.5, 9.5, '#c4172b');
  ink(ctx, 'rgba(255,255,255,0.55)', 1);
  ctx.beginPath(); ctx.moveTo(6, 20); ctx.lineTo(22, 34); ctx.moveTo(6, 20); ctx.lineTo(28, 24); ctx.moveTo(6, 20); ctx.lineTo(12, 40); ctx.stroke();
};
const plant: Draw = (ctx) => {
  const r = rng(5);
  ink(ctx, '#222', 2.4);
  ctx.beginPath(); ctx.moveTo(78, 112); ctx.bezierCurveTo(92, 112, 96, 100, 90, 92); ctx.stroke();
  const leaf = (x: number, y: number, ang: number, len: number, c: string) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.5, -22, len, 0); ctx.quadraticCurveTo(len * 0.5, 12, 0, 0);
    const g = ctx.createLinearGradient(0, -20, 0, 12); g.addColorStop(0, '#6bd36b'); g.addColorStop(1, c);
    ctx.fillStyle = g; ctx.fill(); ink(ctx, '#123b17', 2); ctx.stroke();
    ctx.restore();
  };
  for (const [a, l, c] of [[-2.5, 56, '#2f9a3f'], [-2.0, 62, '#3aa84a'], [-1.57, 66, '#2f9a3f'], [-1.1, 62, '#3aa84a'], [-0.65, 56, '#2f9a3f'], [-2.9, 44, '#1f7a31'], [-0.25, 44, '#1f7a31']] as const)
    leaf(48, 62, a, l + r() * 4, c);
  roughPoly(ctx, [[22, 70], [74, 70], [66, 110], [30, 110]], r, 1);
  fillStroke(ctx, '#c4673a', '#4a2412', 3);
  ctx.fillStyle = '#8f4423'; ctx.fillRect(21, 68, 54, 7);
  ctx.fillStyle = '#fffbe0'; ctx.fillRect(34, 86, 28, 14);
  text(ctx, '100% real*', 48, 96, 7, '#222', 'bold');
};
const desk: Draw = (ctx) => {
  const r = rng(13);
  roughPoly(ctx, [[6, 40], [174, 40], [178, 118], [2, 118]], r, 0.8);
  fillStroke(ctx, '#a4733f', '#3b2411', 3);
  ctx.fillStyle = '#c8935a'; ctx.fillRect(8, 42, 164, 12);
  // monitor "viejo"
  roughPoly(ctx, [[58, 6], [122, 6], [124, 44], [56, 44]], r, 0.8);
  fillStroke(ctx, '#d6d2c4', '#3b3a33', 3);
  ctx.fillStyle = '#0d2a1d'; ctx.fillRect(64, 12, 52, 26);
  text(ctx, 'TURNO', 90, 24, 9, '#7dffb2', 'bold', MONO); text(ctx, '#99999', 90, 34, 9, '#7dffb2', 'bold', MONO);
  ctx.fillStyle = '#d6d2c4'; ctx.fillRect(80, 44, 20, 6);
  // taza y campanita
  ctx.fillStyle = '#fff'; ctx.fillRect(140, 52, 16, 14); ink(ctx, '#222', 2); ctx.strokeRect(140, 52, 16, 14);
  ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.arc(26, 60, 8, Math.PI, 0); ctx.fill(); ink(ctx, '#222', 2); ctx.stroke();
  ctx.fillStyle = '#e9e3d0'; ctx.fillRect(68, 62, 40, 24); ink(ctx, '#555', 1.4); ctx.strokeRect(68, 62, 40, 24);
  ctx.beginPath(); ctx.moveTo(72, 70); ctx.lineTo(104, 70); ctx.moveTo(72, 76); ctx.lineTo(98, 76); ctx.stroke();
};
const postit: Draw = (ctx) => {
  ctx.save(); ctx.translate(11, 11); ctx.rotate(0.12); ctx.translate(-11, -11);
  ctx.fillStyle = '#ffe94d'; ctx.fillRect(2, 2, 18, 18); ink(ctx, '#7a6b00', 1.4); ctx.strokeRect(2, 2, 18, 18);
  ctx.beginPath(); ctx.moveTo(5, 8); ctx.lineTo(17, 8); ctx.moveTo(5, 12); ctx.lineTo(15, 12); ctx.moveTo(5, 16); ctx.lineTo(11, 16); ctx.stroke();
  ctx.restore();
};
const vending: Draw = (ctx) => {
  const body = ctx.createLinearGradient(0, 0, 96, 0);
  body.addColorStop(0, '#e8453c'); body.addColorStop(0.45, '#c42a24'); body.addColorStop(1, '#7c1511');
  roundRectPath(ctx, 4, 4, 88, 142, 10); ctx.fillStyle = body; ctx.fill(); ink(ctx, '#2b0907', 3); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; roundRectPath(ctx, 8, 8, 14, 134, 6); ctx.fill();
  roundRectPath(ctx, 14, 14, 68, 22, 5); ctx.fillStyle = '#fff'; ctx.fill();
  text(ctx, 'COOKIE-MATIC', 48, 30, 11, '#c42a24');
  const glass = ctx.createLinearGradient(0, 42, 0, 100);
  glass.addColorStop(0, '#9fd8ff'); glass.addColorStop(1, '#3d6a99');
  ctx.fillStyle = glass; ctx.fillRect(14, 42, 68, 56); ink(ctx, '#111', 2.4); ctx.strokeRect(14, 42, 68, 56);
  for (let i = 0; i < 12; i++) {
    const x = 22 + (i % 4) * 15; const y = 50 + Math.floor(i / 4) * 16;
    ctx.fillStyle = '#d9a35c'; ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4a2a14'; ctx.fillRect(x - 2, y - 2, 2, 2); ctx.fillRect(x + 1, y + 1, 2, 2);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.moveTo(16, 44); ctx.lineTo(44, 44); ctx.lineTo(16, 80); ctx.fill();
  roundRectPath(ctx, 14, 104, 68, 14, 4); ctx.fillStyle = '#ffd23f'; ctx.fill(); ink(ctx, '#111', 2); ctx.stroke();
  text(ctx, 'ACEPTAR TODAS', 48, 115, 9, '#111');
  ctx.fillStyle = '#111'; ctx.fillRect(16, 124, 64, 16);
  ctx.fillStyle = '#2b2b2b'; ctx.fillRect(18, 126, 60, 12);
};
const printer: Draw = (ctx) => {
  const r = rng(77);
  roughPoly(ctx, [[8, 34], [104, 30], [108, 98], [4, 100]], r, 2.2);
  fillStroke(ctx, '#e9e3cf', '#111', 3.4);
  roughPoly(ctx, [[18, 6], [92, 4], [98, 30], [14, 34]], r, 2);
  fillStroke(ctx, '#f6f3e6', '#111', 3);
  ctx.fillStyle = '#111'; ctx.fillRect(22, 46, 56, 18);
  text(ctx, 'IMPRIMIENDO', 50, 56, 7.5, '#7dffb2', 'bold', MONO); text(ctx, '1 / 4812', 50, 63, 7.5, '#7dffb2', 'bold', MONO);
  ctx.fillStyle = '#e0342b'; ctx.beginPath(); ctx.arc(90, 52, 4, 0, Math.PI * 2); ctx.fill(); ink(ctx, '#111', 2); ctx.stroke();
  ink(ctx, '#111', 3); ctx.beginPath(); ctx.moveTo(24, 80); ctx.lineTo(84, 82); ctx.stroke();
  text(ctx, 'FAX 9000', 56, 94, 9, '#444');
};
const chairs: Draw = (ctx) => {
  const colors = ['#ff5a36', '#2e86ff', '#ffd23f'];
  colors.forEach((c, i) => {
    const x = 6 + i * 50;
    roughPoly(ctx, [[x, 8], [x + 42, 8], [x + 44, 30], [x - 2, 30]], rng(i + 3), 0.4);
    fillStroke(ctx, c, '#111', 3);
    roughPoly(ctx, [[x - 2, 30], [x + 44, 30], [x + 42, 46], [x, 46]], rng(i + 9), 0.4);
    fillStroke(ctx, c, '#111', 3);
    ink(ctx, '#111', 3); ctx.beginPath(); ctx.moveTo(x + 6, 46); ctx.lineTo(x + 6, 54); ctx.moveTo(x + 36, 46); ctx.lineTo(x + 36, 54); ctx.stroke();
  });
};
const display: Draw = (ctx) => {
  roundRectPath(ctx, 2, 2, 96, 60, 5); ctx.fillStyle = '#0a0a0a'; ctx.fill(); ink(ctx, '#555', 3); ctx.stroke();
  text(ctx, 'ATENDIENDO: 0003', 50, 20, 9.5, '#ff4d3a', 'bold', MONO);
  text(ctx, 'SU TURNO: 99,999', 50, 36, 9.5, '#ff4d3a', 'bold', MONO);
  text(ctx, 'ESPERA: 3-5 AÑOS', 50, 52, 9.5, '#ffb03a', 'bold', MONO);
};
const mat: Draw = (ctx) => {
  roundRectPath(ctx, 4, 6, 142, 42, 8); ctx.fillStyle = '#3b4d7a'; ctx.fill(); ink(ctx, '#1b2440', 3); ctx.stroke();
  text(ctx, 'BIENVENIDO/A', 75, 26, 14, '#f6f3ec');
  text(ctx, '(no hay salida)', 75, 41, 9, 'rgba(246,243,236,0.7)');
};
const paper: Draw = (ctx) => {
  const r = rng(31);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(214, 2);
  ctx.bezierCurveTo(214, 70, 120, 40, 120, 120);
  ctx.bezierCurveTo(120, 190, 60, 170, 40, 252);
  ctx.lineWidth = 40; ctx.strokeStyle = '#111'; ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; ctx.stroke();
  ctx.lineWidth = 34; ctx.strokeStyle = '#fbfbf4'; ctx.stroke();
  ctx.restore();
  ctx.fillStyle = 'rgba(40,40,40,0.55)';
  for (let i = 0; i < 70; i++) {
    const t = i / 70; const x = 214 - t * 174 + (r() - 0.5) * 10; const y = 2 + t * 250;
    ctx.fillRect(x - 12 + r() * 4, y, 6 + r() * 14, 1.6);
  }
};
const miniCookie: Draw = (ctx) => {
  ctx.fillStyle = '#d9a35c'; ctx.beginPath(); ctx.arc(8, 8, 7, 0, Math.PI * 2); ctx.fill(); ink(ctx, '#111', 1.6); ctx.stroke();
  ctx.fillStyle = '#4a2a14'; ctx.fillRect(5, 5, 2, 2); ctx.fillRect(9, 8, 2, 2); ctx.fillRect(6, 10, 2, 2);
  ctx.fillStyle = '#e02a2a'; ctx.beginPath(); ctx.arc(13, 3, 2, 0, Math.PI * 2); ctx.fill();
};
// Decorado que continúa la sala fuera del escenario 540x960 cuando la pantalla
// es más ancha o más alta: baldosas del piso (alineadas con las del fondo) y
// la franja de pared con su zoclo.
const floorTile: Draw = (ctx) => {
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = (i + j) % 2 ? '#e7e0d0' : '#dcd4c0';
      ctx.fillRect(i * 60, j * 60, 60, 60);
    }
  }
  ink(ctx, 'rgba(120,110,90,0.25)', 1.2);
  ctx.beginPath();
  for (const p of [0, 60]) { ctx.moveTo(0, p); ctx.lineTo(120, p); ctx.moveTo(p, 0); ctx.lineTo(p, 120); }
  ctx.stroke();
};
const wallExt: Draw = (ctx) => {
  const wall = ctx.createLinearGradient(0, 0, 0, 205);
  wall.addColorStop(0, '#cfd8e2'); wall.addColorStop(1, '#b3bfcc');
  ctx.fillStyle = wall; ctx.fillRect(0, 0, 8, 205);
  ctx.fillStyle = '#5b6678'; ctx.fillRect(0, 196, 8, 12);
  ctx.fillStyle = '#3d4655'; ctx.fillRect(0, 205, 8, 3);
};
const confetti: Draw = (ctx) => { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 8, 8); };

// Objetos ilustrados: si la imagen cargó se usa (tamaño en unidades = recorte * escala);
// si no, vuelve el dibujo por código de arriba.
const SI = IMAGE_SETS.sala;
const imageTex = (scene: Phaser.Scene, key: string, url: string, w: number, h: number, fb: [number, number, Draw]): void => {
  const im = loadedImages.get(url);
  if (im) makeTex(scene, key, w, h, (ctx, tw, th) => ctx.drawImage(im, 0, 0, tw, th));
  else makeTex(scene, key, fb[0], fb[1], fb[2]);
};
/** Origen horizontal de la planta: el centro de la maceta (la ilustración trae un cable a un lado). */
export const plantOriginX = (): number => (loadedImages.has(SI.plant) ? 0.474 : 0.5);
/** ¿Cargó esta ilustración? (el guion de la sala ajusta posiciones según sea imagen o dibujo). */
export const hasProp = (url: string): boolean => loadedImages.has(url);

export function buildSalaTextures(scene: Phaser.Scene): void {
  makeTex(scene, 'sala_bg', W, H, bg);
  imageTex(scene, 'sub_frame', SI.frame, 1223 * 0.145, 983 * 0.145, [170, 150, subFrame]);
  imageTex(scene, 'sub_panel', SI.glass, 40.3, 80.8, [70, 114, subPanel]);
  imageTex(scene, 'sala_cancel', SI.door, 738 * 0.0783, 1392 * 0.0783, [52, 86, cancelDoor]);
  imageTex(scene, 'sala_plant', SI.plant, 1190 * 0.095, 1166 * 0.095, [96, 118, plant]);
  imageTex(scene, 'sala_desk', SI.desk, 1515 * 0.12, 912 * 0.12, [180, 120, desk]);
  makeTex(scene, 'sala_postit', 22, 22, postit);
  imageTex(scene, 'sala_vending', SI.vending, 882 * 0.113, 1345 * 0.113, [96, 150, vending]);
  imageTex(scene, 'sala_printer', SI.printer, 1182 * 0.096, 1160 * 0.096, [112, 104, printer]);
  imageTex(scene, 'sala_chairs', SI.chairs, 1475 * 0.107, 838 * 0.107, [156, 58, chairs]);
  imageTex(scene, 'sala_display', SI.display, 1445 * 0.073, 882 * 0.073, [100, 64, display]);
  makeTex(scene, 'sala_mat', 150, 54, mat);
  makeTex(scene, 'sala_paper', 230, 258, paper);
  makeTex(scene, 'mini_cookie', 16, 16, miniCookie);
  makeTex(scene, 'confetti', 8, 8, confetti);
  makeTex(scene, 'sala_floor_tile', 120, 120, floorTile);
  makeTex(scene, 'sala_wall_ext', 8, 208, wallExt);
  makeTex(scene, 'cookie_world', 40, 40, itemIconDraw('galleta'));
}
