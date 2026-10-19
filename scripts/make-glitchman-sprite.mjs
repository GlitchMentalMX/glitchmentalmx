// Corta a Glitchman en piezas (cabeza, cabeza de reacción, torso, piernas) a
// partir de la hoja de poses de referencia (fondo azul marino liso) y las
// guarda con fondo transparente en public/juego/glitchman/. El juego las
// anima por separado (rebote, balanceo, reacciones) sin dibujo cuadro a cuadro.
// Uso: node scripts/make-glitchman-sprite.mjs <hoja-12-poses.webp>
// Está fuera de public/images/, así que optimize-images y
// watermark-new-uploads no tocan estas piezas.
import { openSheet } from './lib/sprite-cut.mjs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta de la hoja de poses.');
const { cut } = await openSheet(src, { bg: [2, 16, 37], tol: 16 });
const F = 'glitchman';
// Pose "indiferente" (encogido de hombros), fila inferior de la hoja: figura en x 1060-1296, y 459-1163.
const FX = 1056, FY = 455;
await cut(F, 'head', FX + 40, FY, 160, 152);
await cut(F, 'torso', FX, FY + 150, 244, 242);
await cut(F, 'legs', FX, FY + 360, 244, 352);
// Cabeza de reacción: busto "nervioso" de la fila superior.
await cut(F, 'head-react', 452, 72, 220, 250);
