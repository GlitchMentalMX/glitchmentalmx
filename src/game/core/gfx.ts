import Phaser from 'phaser';
import { S, FONT, W, H } from './config';

export type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
export type Pt = [number, number];

/** Generador pseudoaleatorio con semilla: los garabatos salen iguales en cada carga. */
export function rng(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Crea una textura de canvas dibujada en unidades de diseño (nítida a escala S). */
export function makeTex(scene: Phaser.Scene, key: string, w: number, h: number, draw: Draw, pixel = false): void {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, Math.ceil(w * S), Math.ceil(h * S));
  if (!tex) return;
  const ctx = tex.getContext();
  ctx.scale(S, S);
  if (pixel) ctx.imageSmoothingEnabled = false;
  draw(ctx, w, h);
  tex.refresh();
  if (pixel) tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
}

/** Imagen a partir de una textura creada con makeTex, en unidades de diseño. */
export function img(scene: Phaser.Scene, x: number, y: number, key: string, ox = 0.5, oy = 0.5): Phaser.GameObjects.Image {
  return scene.add.image(x, y, key).setOrigin(ox, oy).setScale(1 / S);
}

export function txt(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  size: number,
  color = '#ffffff',
  extra: Phaser.Types.GameObjects.Text.TextStyle = {},
): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, { fontFamily: FONT, fontSize: `${size}px`, color, resolution: S, ...extra });
}

/** Cada escena muestra exactamente el escenario 540x960 sin importar el tamaño del canvas. */
export function fitCamera(scene: Phaser.Scene): void {
  scene.cameras.main.setZoom(S).centerOn(W / 2, H / 2);
}

// ---------- Utilidades de dibujo "a mano" ----------

export function ink(ctx: CanvasRenderingContext2D, color = '#111', width = 3): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

export function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** Elipse temblorosa (contorno irregular), como dibujada a pulso. */
export function blobPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rand: () => number,
  amt = 1.6,
  n = 20,
): void {
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const j = 1 + (rand() - 0.5) * (amt / Math.max(rx, ry)) * 2;
    const x = cx + Math.cos(a) * rx * j;
    const y = cy + Math.sin(a) * ry * j;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/** Polígono con vértices desplazados al azar: línea de mano imperfecta. */
export function roughPoly(ctx: CanvasRenderingContext2D, pts: Pt[], rand: () => number, amt = 1.5): void {
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    const px = x + (rand() - 0.5) * amt * 2;
    const py = y + (rand() - 0.5) * amt * 2;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
}

export function fillStroke(ctx: CanvasRenderingContext2D, fill: string, stroke = '#111', width = 3): void {
  ctx.fillStyle = fill;
  ctx.fill();
  ink(ctx, stroke, width);
  ctx.stroke();
}

/** Dibuja una matriz de caracteres como pixel art. `pal` mapea carácter -> color. */
export function pixelGrid(ctx: CanvasRenderingContext2D, rows: string[], pal: Record<string, string>, px: number): void {
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const c = pal[ch];
      if (!c) return;
      ctx.fillStyle = c;
      ctx.fillRect(x * px, y * px, px, px);
    });
  });
}

export function hexNum(css: string): number {
  return parseInt(css.replace('#', ''), 16);
}

export const STAGE = { W, H };
