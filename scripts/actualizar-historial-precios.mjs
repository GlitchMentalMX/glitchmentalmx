// Mantiene src/data/precios-ia-historial.json al día. Lo corre el GitHub Action
// .github/workflows/actualizar-tipo-cambio.yml justo después de
// scripts/actualizar-tipo-cambio.mjs; también se puede correr a mano:
//   node scripts/actualizar-historial-precios.mjs
//
// Hace dos cosas, y es idempotente (si no hay nada nuevo, no escribe nada):
//   1. Agrega a `tipoCambio` el dato vigente de src/data/tipo-cambio.json si
//      esa fecha todavía no está.
//   2. Agrega a `precios[id]` una entrada nueva cuando el precio en USD (o su
//      periodo) de src/data/precios-ia-usd.json cambió respecto de la última
//      entrada registrada, o cuando la herramienta es nueva. `desde` es la
//      fecha en que se REGISTRA el cambio (hoy, hora de Ciudad de México), no
//      necesariamente el día exacto en que el proveedor lo cambió.
// Nunca borra historia: una herramienta que sale del catálogo conserva sus
// entradas, solo deja de mostrarse.
import { readFile, writeFile } from 'node:fs/promises';

const rutaHistorial = new URL('../src/data/precios-ia-historial.json', import.meta.url);
const rutaTipoCambio = new URL('../src/data/tipo-cambio.json', import.meta.url);
const rutaPrecios = new URL('../src/data/precios-ia-usd.json', import.meta.url);

const historial = JSON.parse(await readFile(rutaHistorial, 'utf-8'));
const tipoCambio = JSON.parse(await readFile(rutaTipoCambio, 'utf-8'));
const precios = JSON.parse(await readFile(rutaPrecios, 'utf-8'));

let cambios = 0;

// 1. Tipo de cambio.
const puntoFx = historial.tipoCambio.find((p) => p.fecha === tipoCambio.fecha);
if (!puntoFx) {
  historial.tipoCambio.push({ fecha: tipoCambio.fecha, valor: tipoCambio.valor });
  historial.tipoCambio.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  cambios++;
} else if (puntoFx.valor !== tipoCambio.valor) {
  puntoFx.valor = tipoCambio.valor;
  cambios++;
}

// 2. Precios en USD. Fecha de hoy en Ciudad de México (UTC-6, sin horario de verano).
const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(new Date());
for (const [id, p] of Object.entries(precios)) {
  if (p.precioUSD === undefined) continue; // precio directo en pesos: fuera de este historial
  const entradas = (historial.precios[id] ??= []);
  const ultima = entradas[entradas.length - 1];
  if (!ultima || ultima.precioUSD !== p.precioUSD || ultima.periodo !== p.periodo) {
    entradas.push({ desde: hoy, precioUSD: p.precioUSD, periodo: p.periodo });
    cambios++;
  }
}

if (cambios === 0) {
  console.log('Historial sin cambios.');
  process.exit(0);
}

historial.precios = Object.fromEntries(
  Object.entries(historial.precios).sort(([a], [b]) => (a < b ? -1 : 1)),
);
await writeFile(rutaHistorial, `${JSON.stringify(historial, null, 1)}\n`, 'utf-8');
console.log(`Historial actualizado (${cambios} cambio${cambios === 1 ? '' : 's'}).`);
