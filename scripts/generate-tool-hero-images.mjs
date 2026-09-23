// Migración retroactiva, una sola corrida (+ utilizable para piezas nuevas
// que se publiquen sin heroImage) — genera una imagen hero de marca por
// cada ficha de las 5 colecciones "IA sin letra chiquita" / Precios
// Digitales (precios-ia, entrena-ia, prueba-gratis, codigos-descuento,
// precios-digitales), que hasta hoy no tenían ninguna: 433 fichas, 0 con
// heroImage. Sin imagen propia, su og:image caía al logo genérico
// compartido por todo el sitio (og-default.png) — Google Discover premia
// imágenes distintivas por página, así que un logo repetido en cientos de
// páginas no compite, aunque sí cumpla el mínimo técnico de 1200px.
//
// Mismo mecanismo que ya usa scripts/generate-og-image.mjs (SVG -> PNG con
// sharp), pero parametrizado por herramienta + colección. El texto grande
// de cada tarjeta es exactamente el mismo que ya usa esa página como
// <title>/og:title (build*TitleTag en src/lib/format.ts, duplicado aquí
// porque este script corre en Node plano, fuera del pipeline de Astro/TS
// — si esas funciones cambian allá, esta copia hay que actualizarla a
// mano también) — la tarjeta nunca promete algo distinto de lo que ya
// dice el resultado de búsqueda.
//
// Uso: node scripts/generate-tool-hero-images.mjs [--dry-run]

import sharp from 'sharp';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { setFrontmatterFields } from './lib/frontmatter.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function buildPrecioIATitleTag(herramienta) {
  return herramienta.length <= 12
    ? `¿Cuánto cuesta ${herramienta} hoy? Precio en México (MXN)`
    : `${herramienta}: precio en MXN hoy, no en USD`;
}
function buildEntrenaIATitleTag(herramienta) {
  return `¿${herramienta} entrena su IA con tus datos?`;
}
function buildPruebaGratisTitleTag(herramienta) {
  return `¿${herramienta}: prueba gratis sin tarjeta?`;
}
function buildCodigoDescuentoTitleTag(herramienta) {
  return `¿${herramienta}: código de descuento real?`;
}

// `label` es el texto en mayúsculas que se dibuja en la tarjeta (estilo
// eyebrow); `displayLabel` es la forma con mayúsculas/minúsculas correctas
// para heroImageAlt — mismo texto que ya usa el breadcrumb/tag de cada
// colección en src/pages/articulos/[slug].astro, para no inventar una
// etiqueta nueva. No se deriva una de la otra (un .toLowerCase() ingenuo
// sobre "PRECIOS DE IA" da "precios de ia", con la sigla mal escrita).
const COLLECTIONS = [
  { dir: 'precios-ia', label: 'PRECIOS DE IA', displayLabel: 'Precios de IA', accent: '#0066ff', tagline: buildPrecioIATitleTag },
  { dir: 'entrena-ia', label: 'PRIVACIDAD DE IA', displayLabel: 'Privacidad de IA', accent: '#ff5c5c', tagline: buildEntrenaIATitleTag },
  { dir: 'prueba-gratis', label: 'PRUEBA GRATIS', displayLabel: 'Prueba gratis sin tarjeta', accent: '#2ecc8f', tagline: buildPruebaGratisTitleTag },
  { dir: 'codigos-descuento', label: 'CÓDIGOS DE DESCUENTO', displayLabel: 'Códigos de descuento', accent: '#f5a623', tagline: buildCodigoDescuentoTitleTag },
  { dir: 'precios-digitales', label: 'PRECIOS DIGITALES', displayLabel: 'Precios Digitales', accent: '#a855f7', tagline: buildPrecioIATitleTag },
];

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Sin motor real de medición de texto en este contexto (SVG estático, sin
// DOM) — parte de un ancho de carácter aproximado para Arial en el tamaño
// dado. Suficiente para una tarjeta generada, no para tipografía de precisión.
function wrapText(text, fontSize, maxWidth, maxLines) {
  const avgCharWidth = fontSize * 0.54;
  const maxChars = Math.max(8, Math.floor(maxWidth / avgCharWidth));
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    const last = kept[maxLines - 1];
    kept[maxLines - 1] = last.length > 3 ? `${last.slice(0, -3).trimEnd()}…` : last;
    return kept;
  }
  return lines;
}

function herramientaFontSize(herramienta) {
  if (herramienta.length <= 10) return 96;
  if (herramienta.length <= 16) return 76;
  if (herramienta.length <= 22) return 60;
  return 50;
}

function buildSVG({ herramienta, tagline, label, accent }) {
  const nameFontSize = herramientaFontSize(herramienta);
  const taglineLines = wrapText(tagline, 32, 1000, 2);

  const taglineTspans = taglineLines
    .map((line, i) => `<tspan x="90" dy="${i === 0 ? 0 : 40}">${escapeXml(line)}</tspan>`)
    .join('');

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0b0f"/>
  <defs>
    <radialGradient id="glow" cx="82%" cy="12%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="90" y="110" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="${accent}">${escapeXml(label)}</text>
  <text x="90" y="280" font-family="Georgia, serif" font-size="${nameFontSize}" font-weight="700" fill="#ffffff">${escapeXml(herramienta)}</text>
  <text x="90" y="360" font-family="Arial, sans-serif" font-size="32" fill="#c3c8d4">${taglineTspans}</text>
  <rect x="90" y="440" width="56" height="4" fill="${accent}"/>
  <text x="90" y="580" font-family="Georgia, serif" font-size="28" font-weight="600" fill="#5b6270">glitch<tspan fill="${accent}">Mental</tspan>MX</text>
</svg>`;
}

async function processCollection({ dir, label, displayLabel, accent, tagline }) {
  const contentDir = path.join(ROOT, 'src', 'content', dir);
  const imagesDir = path.join(ROOT, 'public', 'images', dir);
  if (!DRY_RUN) mkdirSync(imagesDir, { recursive: true });

  const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const { data } = matter(readFileSync(filePath, 'utf-8'));
    if (data.heroImage) {
      skipped++;
      continue;
    }

    const herramienta = data.herramienta;
    const herramientaId = data.herramientaId;
    const taglineText = tagline(herramienta);
    const svg = buildSVG({ herramienta, tagline: taglineText, label, accent });

    const heroImage = `/images/${dir}/${herramientaId}.png`;
    const heroImageAlt = `${herramienta} — ${displayLabel}`;

    if (!DRY_RUN) {
      await sharp(Buffer.from(svg)).png().toFile(path.join(imagesDir, `${herramientaId}.png`));
      setFrontmatterFields(filePath, { heroImage, heroImageAlt });
    }
    generated++;
  }

  console.log(`${dir}: ${generated} imágenes generadas, ${skipped} ya tenían heroImage (de ${files.length}).`);
}

console.log(DRY_RUN ? 'DRY RUN — no se escribe nada.\n' : 'Escribiendo cambios.\n');
for (const collection of COLLECTIONS) {
  await processCollection(collection);
}
