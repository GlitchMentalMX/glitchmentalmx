// Comprueba que la Calculadora de Riesgo IA y el Índice de Exposición Laboral
// a la IA no se contradigan. Correr después de `npx astro build`:
//   node scripts/verificar-calculadora-indice.mjs
// Falla (exit 1) si una cifra de área mapeada no coincide con las fichas, si un
// slug del mapeo no existe, o si reaparece el vocabulario que se retiró.
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const raiz = new URL('../', import.meta.url);
const leer = (ruta) => readFileSync(new URL(ruta, raiz), 'utf-8');
const errores = [];

const mapeo = JSON.parse(leer('src/data/exposicion-laboral/calculadora-mapeo.json'));
const dirFichas = new URL('src/data/exposicion-laboral/ocupaciones/', raiz);
const fichas = Object.fromEntries(
  readdirSync(dirFichas).filter((f) => f.endsWith('.json')).map((f) => {
    const d = JSON.parse(readFileSync(new URL(f, dirFichas), 'utf-8'));
    return [d.slug, d];
  })
);

const rutaHtml = 'dist/calculadora-de-riesgo-de-reemplazo-por-ia/index.html';
if (!existsSync(new URL(rutaHtml, raiz))) {
  console.error(`Falta ${rutaHtml}. Corre antes: npx astro build`);
  process.exit(1);
}
const html = leer(rutaHtml);
const m = html.match(/<script type="application\/json" id="gmr-indice">([\s\S]*?)<\/script>/);
if (!m) errores.push('La calculadora no incluye el JSON del índice (#gmr-indice).');
const publicado = m ? JSON.parse(m[1]) : { areas: {} };

for (const [area, slugs] of Object.entries(mapeo.areas)) {
  const faltan = slugs.filter((s) => !fichas[s]);
  if (faltan.length) { errores.push(`${area}: no existe la ficha ${faltan.join(', ')}`); continue; }
  const esperado = Math.round(slugs.reduce((t, s) => t + fichas[s].puntuacion.valor, 0) / slugs.length);
  const actual = publicado.areas[area]?.risk;
  if (actual !== esperado) errores.push(`${area}: la calculadora dice ${actual} y el índice ${esperado}`);
  if (!html.includes(`<option value="${area}"`)) errores.push(`${area}: no es una opción de la calculadora`);
}
for (const area of Object.keys(publicado.areas)) {
  if (!mapeo.areas[area]) errores.push(`${area}: está en la calculadora pero no en el mapeo`);
}

// ("Horizonte Crítico" es una colección del menú del sitio, por eso no se busca la palabra suelta.)
// El script del cliente puede estar en un archivo aparte; se revisa todo el texto servido.
const bundles = [...html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g)].map((x) => leer(`dist${x[1]}`));
const texto = [html, ...bundles].join('\n');
for (const prohibido of ["'Crítico'", 'Exposición Crítica', 'alto o crítico', 'alto, crítico', 'reducción de plantillas', 'pilotos de sustitución', '#FF4B4B', '#FF8C00', '#FFD700']) {
  if (texto.includes(prohibido)) errores.push(`Reapareció "${prohibido}" en la calculadora`);
}

const mapeadas = Object.keys(mapeo.areas).length;
const selectAreas = html.match(/<select id="gmr-job"[\s\S]*?<\/select>/)?.[0] ?? '';
const heuristicas = [...selectAreas.matchAll(/<option value="([a-z_0-9]+)"/g)].map((x) => x[1]).filter((o) => !mapeo.areas[o]);

if (errores.length) {
  console.error('FALLA:\n- ' + errores.join('\n- '));
  process.exit(1);
}
console.log(`OK: ${mapeadas} áreas coinciden con el índice.`);
console.log(`Áreas con estimación heurística (sin ocupación en el índice): ${heuristicas.join(', ')}`);
