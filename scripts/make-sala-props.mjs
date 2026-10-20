// Corta los objetos ilustrados de la sala (hechos con GPT sobre fondo liso) y los deja
// con transparencia en public/juego/sala/. El juego los usa en lugar del dibujo por
// código; si un archivo falta, vuelve al dibujo de respaldo.
// Uso: node scripts/make-sala-props.mjs <asistente.webp> <maquina.webp> <impresora.webp> <planta.webp> <puerta.webp>
// (asistente = hoja de 4 caras en 2x2; las demás, un objeto por imagen).
import { openSheet } from './lib/sprite-cut.mjs';

const [bot, vending, printer, plant, door] = process.argv.slice(2);
if (!door) throw new Error('Uso: node scripts/make-sala-props.mjs <asistente> <maquina> <impresora> <planta> <puerta>');
const F = 'sala';
const all = () => true;

// Asistente: 4 cuadrantes de 627 px; mismo recorte relativo en cada uno para que
// las cuatro caras tengan exactamente el mismo tamaño y posición.
{
  const { cut } = await openSheet(bot, { bg: [250, 3, 250], tol: 40 });
  const faces = [['bot-ok', 0, 0], ['bot-happy', 627, 0], ['bot-hmm', 0, 627], ['bot-frozen', 627, 627]];
  for (const [name, qx, qy] of faces) await cut(F, name, qx + 58, qy + 16, 505, 515, all, 1, 1, 250);
}
{
  const { cut } = await openSheet(vending, { bg: [14, 24, 34], tol: 22 });
  await cut(F, 'cookie-matic', 70, 95, 882, 1345, all, 1, 1, 340);
}
{
  const { cut } = await openSheet(printer, { bg: [21, 184, 92], tol: 28 });
  await cut(F, 'fax', 36, 56, 1182, 1160, all, 1, 1, 380);
}
{
  const { cut } = await openSheet(plant, { bg: [13, 23, 33], tol: 22 });
  await cut(F, 'planta', 68, 26, 1190, 1166, all, 1, 1, 380);
}
{
  const { cut } = await openSheet(door, { bg: [250, 3, 250], tol: 40 });
  await cut(F, 'puerta-cancelar', 140, 70, 738, 1392, all, 1, 1, 200);
}
