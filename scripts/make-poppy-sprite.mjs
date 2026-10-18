// Corta a Poppy Power (Modo Dios) en piezas: cabeza, cabeza de reacción,
// torso con brazos, piernas y pose. Hoja de tres paneles verticales: cuerpo,
// busto de reacción y pose. Fondo verde liso ≈ #17ad5b.
// Uso: node scripts/make-poppy-sprite.mjs <hoja.webp>
import { openSheet } from './lib/sprite-cut.mjs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta de la hoja de Poppy.');
const { cut } = await openSheet(src, { bg: [23, 173, 91], tol: 24 });
const F = 'modo-dios';

await cut(F, 'head', 45, 25, 350, 265);
// Torso: incluye los brazos y las manos (x < 135 o x > 360 hasta y 650).
await cut(F, 'torso', 45, 250, 420, 400, (x, y) => (y < 450 || x < 135 || x > 360 ? 1 : 0));
await cut(F, 'legs', 45, 430, 425, 555, (x, y) => (y < 650 && (x < 126 || x > 360) ? 0 : 1));
await cut(F, 'head-react', 515, 140, 505, 480);
await cut(F, 'pose', 1030, 20, 506, 970);
