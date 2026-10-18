import { blobPath, ink, rng, roundRectPath, type Draw } from '../core/gfx';

export interface ItemDef {
  id: string;
  name: string;
  desc: string;
  icon: Draw;
}

const galleta: Draw = (ctx) => {
  const r = rng(3);
  blobPath(ctx, 20, 20, 15, 15, r, 1.2);
  ctx.fillStyle = '#d9a35c'; ctx.fill(); ink(ctx, '#111', 2.4); ctx.stroke();
  ctx.fillStyle = '#4a2a14';
  for (const [x, y] of [[14, 14], [25, 16], [18, 26], [27, 27], [11, 23]]) { ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#e02a2a'; ctx.beginPath(); ctx.arc(31, 9, 3, 0, Math.PI * 2); ctx.fill();
};

const hoja: Draw = (ctx) => {
  roundRectPath(ctx, 8, 3, 24, 34, 3);
  ctx.fillStyle = '#fbfbf6'; ctx.fill(); ink(ctx, '#111', 2.4); ctx.stroke();
  ink(ctx, '#777', 1.6);
  ctx.beginPath();
  for (let y = 11; y < 33; y += 4.5) { ctx.moveTo(12, y); ctx.lineTo(28, y); }
  ctx.stroke();
  ctx.fillStyle = '#111'; ctx.font = 'bold 6px sans-serif'; ctx.fillText('4,812', 13, 9);
};

const postit: Draw = (ctx) => {
  ctx.save();
  ctx.translate(20, 20); ctx.rotate(-0.1); ctx.translate(-20, -20);
  ctx.fillStyle = '#ffe94d'; ctx.fillRect(7, 6, 27, 27); ink(ctx, '#111', 2.2); ctx.strokeRect(7, 6, 27, 27);
  ink(ctx, '#7a6b00', 1.6);
  ctx.beginPath(); ctx.moveTo(11, 14); ctx.lineTo(30, 14); ctx.moveTo(11, 20); ctx.lineTo(27, 20); ctx.moveTo(11, 26); ctx.lineTo(22, 26); ctx.stroke();
  ctx.restore();
};

export const ITEMS: Record<string, ItemDef> = {
  galleta: { id: 'galleta', name: 'Galleta', desc: 'Una galleta. Trae un localizador GPS integrado, de cortesía.', icon: galleta },
  hoja: { id: 'hoja', name: 'Hoja 1 de 4,812', desc: 'La primera hoja de los Términos y Condiciones. Es infinitamente aburrida.', icon: hoja },
  postit: { id: 'postit', name: 'Post-it', desc: "Dice: 'Contraseña de administrador: contraseña123'. Nadie debía verlo.", icon: postit },
};
