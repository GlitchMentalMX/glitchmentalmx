// Actualiza src/data/tipo-cambio.json con el tipo de cambio FIX oficial de
// Banxico (serie SF43718). Lo corre el GitHub Action
// .github/workflows/actualizar-tipo-cambio.yml una vez al día — nunca se
// ejecuta desde el navegador del usuario, así que el token nunca se expone
// al cliente. Ver GUIA-PRECIOS-IA-BANXICO.md para la explicación completa.
import { readFile, writeFile } from 'node:fs/promises';

const token = process.env.BANXICO_TOKEN;
if (!token) {
  console.error('Falta la variable de entorno BANXICO_TOKEN.');
  process.exit(1);
}

const SERIE = 'SF43718';
const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${SERIE}/datos/oportuno`;
const outputPath = new URL('../src/data/tipo-cambio.json', import.meta.url);

const res = await fetch(url, {
  headers: { 'Bmx-Token': token, Accept: 'application/json' },
});

if (!res.ok) {
  console.error(`Banxico respondió ${res.status} ${res.statusText}`);
  process.exit(1);
}

const body = await res.json();
const dato = body?.bmx?.series?.[0]?.datos?.[0];

if (!dato || !dato.fecha || !dato.dato) {
  console.error('Respuesta de Banxico sin el formato esperado:', JSON.stringify(body));
  process.exit(1);
}

// Banxico entrega la fecha como DD/MM/YYYY.
const [dia, mes, anio] = dato.fecha.split('/');
const fechaISO = `${anio}-${mes}-${dia}`;
const valor = Number.parseFloat(dato.dato.replace(/,/g, ''));

if (!Number.isFinite(valor)) {
  console.error(`Valor de tipo de cambio no numérico: "${dato.dato}"`);
  process.exit(1);
}

const actual = JSON.parse(await readFile(outputPath, 'utf-8'));

// El endpoint "oportuno" siempre regresa el último dato publicado, así que en
// fin de semana o día festivo (Banxico no publica) esto simplemente vuelve a
// traer el mismo valor y fecha del día hábil anterior — el archivo queda
// igual y el paso de git en el workflow no genera un commit vacío.
if (fechaISO === actual.fecha && valor === actual.valor) {
  console.log(`Sin cambios — sigue vigente el dato del ${fechaISO} ($${valor} MXN).`);
  process.exit(0);
}

const nuevo = {
  valor,
  fecha: fechaISO,
  fuente: 'Banxico SIE - Serie SF43718 (tipo de cambio FIX USD/MXN)',
};

await writeFile(outputPath, `${JSON.stringify(nuevo, null, 2)}\n`, 'utf-8');
console.log(`Actualizado: $${valor} MXN por USD, dato del ${fechaISO}.`);
