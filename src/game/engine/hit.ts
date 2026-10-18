import type { Rect } from './pathfinding';

/** Área tocable rectangular con un margen para dedos gruesos. */
export const rectHit = (r: Rect, pad = 10) => (x: number, y: number) =>
  x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad;
