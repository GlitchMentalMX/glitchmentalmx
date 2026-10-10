// Tarjetas og:image (1200x630, SVG -> PNG con sharp) para el orientador
// "¿Y ahora qué hago con la IA?", su página de alerta y la calculadora de
// riesgo de reemplazo por IA. Mismo estilo que
// scripts/generate-tool-hero-images.mjs: sin imagen propia caerían al logo
// genérico (og-default.png), que no compite en Google Discover. A propósito
// sin teléfonos en la imagen: si un número cambia, la tarjeta no queda
// desactualizada.
//
// Uso: node scripts/generate-herramientas-hero-images.mjs

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'public', 'images', 'herramientas');
mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cards = [
  {
    file: 'que-hacer-si-te-preocupa-la-ia.png',
    label: 'ORIENTADOR · GRATIS · 3-4 MINUTOS',
    title: ['¿Te preocupa la', 'inteligencia artificial?'],
    tagline: 'Esto es lo que puedes hacer. Seis preguntas, sin diagnóstico.',
    accent: '#0066ff',
  },
  {
    file: 'necesitas-ayuda-ahora.png',
    label: 'AYUDA AHORA',
    title: ['Habla con alguien', 'ahora'],
    tagline: 'Líneas de ayuda emocional gratuitas, de atención las 24 horas.',
    accent: '#2ecc8f',
  },
  {
    file: 'calculadora-riesgo-reemplazo-ia.png',
    label: 'CALCULADORA · GRATIS · SIN REGISTRO',
    title: ['¿La IA puede quitarte', 'tu trabajo?'],
    tagline: 'Tu profesión, 16 regiones del mundo, resultado en segundos.',
    accent: '#0066ff',
  },
];

for (const c of cards) {
  const titleSvg = c.title
    .map((l, i) => `<tspan x="90" dy="${i === 0 ? 0 : 92}">${esc(l)}</tspan>`)
    .join('');
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0b0f"/>
  <defs>
    <radialGradient id="glow" cx="82%" cy="12%" r="60%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="90" y="110" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="${c.accent}">${esc(c.label)}</text>
  <text x="90" y="260" font-family="Georgia, serif" font-size="82" font-weight="700" fill="#ffffff">${titleSvg}</text>
  <text x="90" y="460" font-family="Arial, sans-serif" font-size="32" fill="#c3c8d4">${esc(c.tagline)}</text>
  <rect x="90" y="500" width="56" height="4" fill="${c.accent}"/>
  <text x="90" y="585" font-family="Georgia, serif" font-size="28" font-weight="600" fill="#5b6270">glitch<tspan fill="${c.accent}">Mental</tspan>MX</text>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, c.file));
  console.log('ok', c.file);
}
