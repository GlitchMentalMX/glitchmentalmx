// Segunda tanda de objetos ilustrados de la sala: mostrador, íconos de inventario,
// pantalla de turnos, sillas, marco de la puerta "Suscríbete" y hoja de cristal.
// Salida en public/juego/sala/, ya reducida al tamaño en pantalla.
// Uso: node scripts/make-sala-props-2.mjs <mostrador> <items-2x2> <pantalla> <sillas> <marco> <cristal>
import { openSheet } from './lib/sprite-cut.mjs';

const [desk, items, display, chairs, frame, glass] = process.argv.slice(2);
if (!glass) throw new Error('Uso: node scripts/make-sala-props-2.mjs <mostrador> <items> <pantalla> <sillas> <marco> <cristal>');
const F = 'sala';
const all = () => true;

{
  const { cut } = await openSheet(desk, { bg: [9, 185, 96], tol: 28 });
  await cut(F, 'mostrador', 10, 70, 1515, 912, all, 1, 1, 640);
}
{
  // Hoja 2x2: galleta con GPS, hoja 1/4812, post-it con contraseña, post-it en blanco.
  const { cut } = await openSheet(items, { bg: [12, 22, 30], tol: 20 });
  await cut(F, 'item-galleta', 58, 36, 503, 563, all, 1, 0, 160);
  await cut(F, 'item-hoja', 691, 45, 534, 556, all, 1, 0, 160);
  await cut(F, 'item-postit', 68, 663, 508, 530, all, 1, 0, 160);
  await cut(F, 'item-postit-vacio', 709, 663, 508, 527, all, 1, 0, 160);
}
{
  const { cut } = await openSheet(display, { bg: [245, 5, 252], tol: 40 });
  await cut(F, 'pantalla-turnos', 46, 0, 1445, 882, all, 1, 1, 360);
}
{
  const { cut } = await openSheet(chairs, { bg: [12, 191, 97], tol: 28 });
  await cut(F, 'sillas', 30, 92, 1475, 838, all, 1, 1, 520);
}
{
  const { cut } = await openSheet(frame, { bg: [13, 21, 32], tol: 14 });
  await cut(F, 'marco-suscribete', 178, 14, 1223, 983, all, 1, 1, 560);
}
{
  const { cut } = await openSheet(glass, { bg: [250, 5, 251], tol: 40 });
  await cut(F, 'cristal', 172, 38, 681, 1455, all, 1, 1, 150);
}
