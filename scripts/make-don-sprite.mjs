// Corta a El Don en piezas animables (cabeza, cabeza de reacción, torso,
// piernas con el bastón y pose característica) a partir de la hoja de tres
// imágenes: cuerpo completo (arriba izquierda), busto de reacción (arriba
// derecha) y pose característica (abajo). Fondo liso ≈ #0e1520.
// Uso: node scripts/make-don-sprite.mjs <hoja.webp>
import { openSheet } from './lib/sprite-cut.mjs';

const src = process.argv[2];
if (!src) throw new Error('Falta la ruta de la hoja del Don.');
const { cut } = await openSheet(src, { bg: [15, 22, 31], tol: 14 });

// Coordenadas en la hoja de 1024x1536. Figura del panel 1: x 99-398, y 24-699.
await cut('don', 'head', 140, 18, 200, 145);
// Torso: incluye la mano que cuelga a la derecha (x > 318) y la mano que sostiene
// el bastón; el bastón por debajo de la mano pertenece a las piernas.
await cut('don', 'torso', 99, 150, 300, 330, (x, y) => !(x < 175 && y >= 396) && (y < 428 || x > 322));
await cut('don', 'legs', 99, 396, 300, 303, (x, y) => !(x > 322 && y <= 482));
await cut('don', 'head-react', 519, 138, 470, 422);
await cut('don', 'pose', 300, 740, 384, 743);
