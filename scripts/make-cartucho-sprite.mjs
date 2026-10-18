// Corta a Cartucho (héroe retro) en piezas: cabeza, cabeza de reacción, torso,
// pierna izquierda, pierna derecha y pose de salto. Hoja de tres paneles
// verticales. Fondo verde liso ≈ #0fb75c.
// Uso: node scripts/make-cartucho-sprite.mjs <hoja.webp>
import { openSheet } from './lib/sprite-cut.mjs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta de la hoja de Cartucho.');
const { cut } = await openSheet(src, { bg: [15, 184, 93], tol: 26 });
const F = 'heroe';

await cut(F, 'head', 80, 262, 340, 270);
await cut(F, 'torso', 60, 515, 440, 210, (x, y) => (y < 665 || x < 150 || x > 345 ? 1 : 0));
const notHands = (x, y) => (y < 740 && (x < 145 || x > 350) ? 0 : 1);
await cut(F, 'leg-left', 60, 650, 190, 225, notHands);
await cut(F, 'leg-right', 250, 650, 180, 225, notHands);
await cut(F, 'head-react', 545, 305, 450, 360);
// La pose conserva la moneda flotante (mancha suelta pequeña).
await cut(F, 'pose', 1030, 85, 506, 835, () => 1, 0.01);
