// Corta a CapiCaos (capibara) en piezas: cabeza, cabeza de reacción, cuerpo,
// patas traseras, patas delanteras y pose comiendo. Hoja: cuerpo (arriba
// izquierda), busto de reacción (arriba derecha), pose (abajo). Fondo ≈ #0e1820.
// Uso: node scripts/make-capibara-sprite.mjs <hoja.webp>
import { openSheet } from './lib/sprite-cut.mjs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta de la hoja del capibara.');
const { cut } = await openSheet(src, { bg: [14, 24, 34], tol: 14 });
const F = 'capibara';
// Línea de corte cuello-cabeza: de (500,20) a (560,300), inclinada como el cuello.
const xcut = (y) => 500 + (y - 20) * (60 / 280);
const ramp = (v, a, b) => Math.max(0, Math.min(1, (v - a) / (b - a)));

await cut(F, 'head', 495, 10, 325, 295, (x, y) => (y <= 305 ? ramp(x - xcut(y), 0, 18) * ramp(305 - y, 0, 22) : 0));
// El cuerpo se mete 22 px bajo la cabeza para que no haya hueco al moverse.
await cut(F, 'body', 150, 95, 610, 318, (x, y) => (y <= 300 && x > xcut(y) + 22 ? 0 : 1));
await cut(F, 'legs-back', 150, 392, 275, 102);
await cut(F, 'legs-front', 425, 392, 280, 102);
await cut(F, 'head-react', 1060, 20, 440, 450, (x, y) => ramp(x - 1060, 0, 26) * ramp(470 - y, 0, 26));
await cut(F, 'pose', 215, 522, 740, 470);
