// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// lastmod real del sitemap — antes no se mandaba ninguno. Se calcula leyendo
// el frontmatter crudo (no astro:content, que no está disponible en este
// contexto) una sola vez al arrancar el build. Alcance a propósito acotado a
// páginas donde una fecha de modificación real y verificable existe y le
// sirve a Google — el resto del sitio se queda sin lastmod en vez de
// adivinar una fecha incorrecta.
function leerFechaFrontmatter(fileUrl) {
  const contenido = readFileSync(fileUrl, 'utf-8');
  const actualizado = contenido.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m);
  const publicado = contenido.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m);
  const fecha = actualizado?.[1] ?? publicado?.[1];
  return fecha ? new Date(`${fecha}T12:00:00Z`) : undefined;
}

// Igual que leerFechaFrontmatter, pero para las colecciones que usan `date:`
// en vez de pubDate/updatedDate (dato-incomodo, insights).
function leerFechaSimple(fileUrl) {
  const contenido = readFileSync(fileUrl, 'utf-8');
  const fecha = contenido.match(/^date:\s*'?(\d{4}-\d{2}-\d{2})/m);
  return fecha?.[1] ? new Date(`${fecha[1]}T12:00:00Z`) : undefined;
}

function leerCategoria(fileUrl) {
  const contenido = readFileSync(fileUrl, 'utf-8');
  return contenido.match(/^category:\s*(.+)$/m)?.[1]?.trim();
}

// postSlugs es una lista YAML (`- slug` por línea) bajo la llave `postSlugs:`
// — se lee como texto plano en vez de parsear YAML completo porque solo
// hace falta esa una lista, no el resto del frontmatter.
function leerPostSlugs(fileUrl) {
  const contenido = readFileSync(fileUrl, 'utf-8');
  const bloque = contenido.match(/^postSlugs:\n((?:\s*-\s*.+\n?)*)/m)?.[1] ?? '';
  return [...bloque.matchAll(/^\s*-\s*(.+)$/gm)].map((m) => m[1].trim());
}

const postsDir = new URL('./src/content/posts/', import.meta.url);
const fechaPorSlugPost = new Map();
const categoriaPorSlugPost = new Map();
let fechaMaxPosts;
for (const archivo of readdirSync(postsDir)) {
  if (!archivo.endsWith('.md')) continue;
  const slug = archivo.replace(/\.md$/, '');
  const url = new URL(archivo, postsDir);
  const fecha = leerFechaFrontmatter(url);
  if (fecha) {
    fechaPorSlugPost.set(slug, fecha);
    if (!fechaMaxPosts || fecha > fechaMaxPosts) fechaMaxPosts = fecha;
  }
  const categoria = leerCategoria(url);
  if (categoria) categoriaPorSlugPost.set(slug, categoria);
}

// Mismo mapeo nombre→slug que src/data/categories.ts, duplicado aquí por la
// misma razón que MESES_ES: este archivo corre en Node plano, sin el
// pipeline de Astro/TS que permite importar ese módulo directamente.
// ADVERTENCIA: si se agrega, quita o renombra una categoría en
// src/data/categories.ts, esta copia hay que actualizarla a mano también
// — si no, el sitemap sigue generando lastmod con datos viejos para esa
// categoría, sin lanzar ningún error.
const SLUG_POR_CATEGORIA = {
  'Inteligencia Artificial': 'inteligencia-artificial',
  'Cultura Digital': 'cultura-digital',
  'Tendencias Digitales': 'tendencias-digitales',
  'Tecnología de Consumo': 'tecnologia-de-consumo',
};

// Fecha más reciente por categoría — para el lastmod de /categoria/{slug}/
// (solo la página 1, la única URL que vale la pena declarar: las páginas de
// paginación /2/, /3/... muestran contenido cada vez más viejo, así que
// adivinar su lastmod sería tan incorrecto como no mandar ninguno).
const fechaMaxPorSlugCategoria = new Map();
for (const [slug, fecha] of fechaPorSlugPost) {
  const categoria = categoriaPorSlugPost.get(slug);
  const slugCategoria = categoria ? SLUG_POR_CATEGORIA[categoria] : undefined;
  if (!slugCategoria) continue;
  const actual = fechaMaxPorSlugCategoria.get(slugCategoria);
  if (!actual || fecha > actual) fechaMaxPorSlugCategoria.set(slugCategoria, fecha);
}

const preciosDir = new URL('./src/content/precios-ia/', import.meta.url);
const slugsPreciosIA = new Set(
  readdirSync(preciosDir)
    .filter((archivo) => archivo.endsWith('.md'))
    .map((archivo) => archivo.replace(/\.md$/, ''))
);

// Precios Digitales usa el mismo dato de Banxico como señal de "verificado
// al día" que Precios de IA — familia hermana, mismo criterio de lastmod.
const preciosDigitalesDir = new URL('./src/content/precios-digitales/', import.meta.url);
const slugsPreciosDigitales = new Set(
  readdirSync(preciosDigitalesDir)
    .filter((archivo) => archivo.endsWith('.md'))
    .map((archivo) => archivo.replace(/\.md$/, ''))
);

// Última revisión de contenido de la Calculadora de Riesgo IA — mismo JSON
// que lee la página en build-time, un solo lugar que actualizar a mano.
let fechaCalculadoraRiesgo;
try {
  const calculadora = JSON.parse(
    readFileSync(new URL('./src/data/calculadora-riesgo-ia.json', import.meta.url), 'utf-8')
  );
  fechaCalculadoraRiesgo = new Date(`${calculadora.lastReviewed}T12:00:00Z`);
} catch {
  // Igual que el resto: si falta el archivo, se omite el lastmod.
}

// Última revisión de contenido del test Detox de IA — mismo criterio que la
// Calculadora de Riesgo IA (JSON aparte, leído aquí y en la página en build).
let fechaDetoxDeIA;
try {
  const detoxDeIA = JSON.parse(
    readFileSync(new URL('./src/data/detox-de-ia.json', import.meta.url), 'utf-8')
  );
  fechaDetoxDeIA = new Date(`${detoxDeIA.lastReviewed}T12:00:00Z`);
} catch {
  // Igual que el resto: si falta el archivo, se omite el lastmod.
}

let fechaTipoCambio;
try {
  const tipoCambio = JSON.parse(
    readFileSync(new URL('./src/data/tipo-cambio.json', import.meta.url), 'utf-8')
  );
  fechaTipoCambio = new Date(`${tipoCambio.fecha}T12:00:00Z`);
} catch {
  // Si el archivo no existe o no se puede leer, simplemente no se manda
  // lastmod para esas páginas — mejor omitirlo que adivinar.
}

// Familia "IA sin letra chiquita" (Códigos de Descuento, Prueba Gratis,
// Quién Entrena con tus Datos) — cada índice usa la fecha más reciente entre
// sus propias fichas, mismo criterio que ya usa /articulos/. También arma un
// mapa slug→fecha por ficha individual: hasta ahora solo el índice de cada
// serie mandaba lastmod, las 296 fichas individuales de estas 3 colecciones
// no mandaban ninguno (a diferencia de precios-ia/precios-digitales, que sí
// lo tenían ficha por ficha) — bug real, se corrige aquí.
function fechaMaxDeColeccion(dirRelativo) {
  const dir = new URL(dirRelativo, import.meta.url);
  const porSlug = new Map();
  let max;
  for (const archivo of readdirSync(dir)) {
    if (!archivo.endsWith('.md')) continue;
    const fecha = leerFechaFrontmatter(new URL(archivo, dir));
    if (fecha) {
      porSlug.set(archivo.replace(/\.md$/, ''), fecha);
      if (!max || fecha > max) max = fecha;
    }
  }
  return { max, porSlug };
}
const codigosDescuentoInfo = fechaMaxDeColeccion('./src/content/codigos-descuento/');
const pruebaGratisInfo = fechaMaxDeColeccion('./src/content/prueba-gratis/');
const entrenaIAInfo = fechaMaxDeColeccion('./src/content/entrena-ia/');
const fechaCodigosDescuento = codigosDescuentoInfo.max;
const fechaPruebaGratis = pruebaGratisInfo.max;
const fechaEntrenaIA = entrenaIAInfo.max;

// Dato Incómodo e Insights Visuales — mismo criterio, pero con el campo
// `date` en vez de pubDate/updatedDate.
function fechaMaxSimple(dirRelativo) {
  const dir = new URL(dirRelativo, import.meta.url);
  let max;
  for (const archivo of readdirSync(dir)) {
    if (!archivo.endsWith('.md')) continue;
    const fecha = leerFechaSimple(new URL(archivo, dir));
    if (fecha && (!max || fecha > max)) max = fecha;
  }
  return max;
}
const fechaDatoIncomodo = fechaMaxSimple('./src/content/dato-incomodo/');
const fechaInsights = fechaMaxSimple('./src/content/insights/');

// Colecciones y series individuales — la fecha del artículo más reciente
// entre los que agrupa cada una, cruzando su `postSlugs` contra las fechas
// de /articulos/ que ya se calcularon arriba.
const collectionsDir = new URL('./src/content/collections/', import.meta.url);
const fechaPorHub = new Map();
for (const archivo of readdirSync(collectionsDir)) {
  if (!archivo.endsWith('.md')) continue;
  const id = archivo.replace(/\.md$/, '');
  const slugs = leerPostSlugs(new URL(archivo, collectionsDir));
  let max;
  for (const slug of slugs) {
    const fecha = fechaPorSlugPost.get(slug);
    if (fecha && (!max || fecha > max)) max = fecha;
  }
  if (max) fechaPorHub.set(id, max);
}

// Índice glitchMentalMX — su `mes` ("Septiembre 2026") es la señal de
// frescura real; mismo parseo que src/lib/format.ts (parseMesEs), duplicado
// aquí a propósito porque este archivo corre en Node plano, fuera del
// pipeline de Astro/TS.
// ADVERTENCIA: si cambia el array MONTHS_ES de src/lib/format.ts, esta
// copia hay que actualizarla a mano también — si no, el parseo de `mes`
// falla en silencio y el sitemap deja de generar lastmod para el Índice
// sin lanzar ningún error.
const MESES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
let fechaIndice;
try {
  const indice = JSON.parse(
    readFileSync(new URL('./src/content/indice/actual.json', import.meta.url), 'utf-8')
  );
  const [nombreMes, anio] = indice.mes.split(' ');
  const mesIndex = MESES_ES.indexOf(nombreMes.toLowerCase());
  if (mesIndex !== -1 && anio) fechaIndice = new Date(Date.UTC(Number(anio), mesIndex, 1, 12));
} catch {
  // Igual que arriba: si falta el archivo o el formato cambió, se omite
  // el lastmod en vez de adivinar.
}

// https://astro.build/config
export default defineConfig({
  site: 'https://glitchmental.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // /buscar/ es noIndex (páginas de resultados de búsqueda interna no
      // deberían indexarse) — se excluye también del sitemap por la misma
      // razón, no tiene caso mandarla a rastrear si le decimos que no indexe.
      filter: (page) => !page.includes('/stats/') && !page.includes('/buscar/'),
      serialize(item) {
        const { pathname } = new URL(item.url);
        const conFecha = (fecha) => (fecha ? { ...item, lastmod: fecha.toISOString() } : item);

        if ((pathname === '/precios-ia/' || pathname === '/precios-digitales/') && fechaTipoCambio) {
          return conFecha(fechaTipoCambio);
        }

        const matchArticulo = pathname.match(/^\/articulos\/([^/]+)\/$/);
        if (matchArticulo) {
          const slug = matchArticulo[1];
          if ((slugsPreciosIA.has(slug) || slugsPreciosDigitales.has(slug)) && fechaTipoCambio) {
            return conFecha(fechaTipoCambio);
          }
          return conFecha(
            fechaPorSlugPost.get(slug)
              ?? entrenaIAInfo.porSlug.get(slug)
              ?? pruebaGratisInfo.porSlug.get(slug)
              ?? codigosDescuentoInfo.porSlug.get(slug)
          );
        }

        if (pathname === '/indice-glitchmentalmx/') return conFecha(fechaIndice);
        if (pathname === '/codigos-descuento-ia/') return conFecha(fechaCodigosDescuento);
        if (pathname === '/prueba-gratis-sin-tarjeta/') return conFecha(fechaPruebaGratis);
        if (pathname === '/quien-entrena-con-tus-datos/') return conFecha(fechaEntrenaIA);
        // El hub en sí (/ia-sin-letra-chiquita/) nunca tuvo lastmod propio —
        // se le había puesto a sus 4 series hijas pero no al índice que las
        // enlaza. Usa la más reciente de las 4.
        if (pathname === '/ia-sin-letra-chiquita/') {
          const fechas = [fechaTipoCambio, fechaEntrenaIA, fechaPruebaGratis, fechaCodigosDescuento].filter(Boolean);
          return conFecha(fechas.length ? new Date(Math.max(...fechas.map((f) => f.getTime()))) : undefined);
        }
        if (pathname === '/archivo/') return conFecha(fechaMaxPosts);
        if (pathname === '/dato-incomodo/') return conFecha(fechaDatoIncomodo);
        if (pathname === '/insights-visuales/') return conFecha(fechaInsights);
        if (pathname === '/calculadora-de-riesgo-de-reemplazo-por-ia-2026/') return conFecha(fechaCalculadoraRiesgo);
        if (pathname === '/detox-de-ia/') return conFecha(fechaDetoxDeIA);

        const matchCategoria = pathname.match(/^\/categoria\/([^/]+)\/$/);
        if (matchCategoria) return conFecha(fechaMaxPorSlugCategoria.get(matchCategoria[1]));

        const matchColeccion = pathname.match(/^\/(?:colecciones|series)\/([^/]+)\/$/);
        if (matchColeccion) return conFecha(fechaPorHub.get(matchColeccion[1]));

        // Los índices /series/ y /colecciones/ (a diferencia de sus páginas
        // hijas, que ya tenían lastmod) nunca mandaban ninguno — mismo
        // patrón que el hub /ia-sin-letra-chiquita/ que se corrigió antes.
        // Usan la fecha más reciente entre todas sus hijas.
        if (pathname === '/series/' || pathname === '/colecciones/') {
          const fechas = [...fechaPorHub.values()];
          return conFecha(fechas.length ? new Date(Math.max(...fechas.map((f) => f.getTime()))) : undefined);
        }

        return item;
      },
    }),
  ],
});
