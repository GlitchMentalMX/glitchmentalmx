import sharp from 'sharp';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0b0f"/>
  <defs>
    <radialGradient id="glow" cx="80%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#0066ff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0066ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="90" y="330" font-family="Georgia, serif" font-size="92" font-weight="600" fill="#ffffff">glitch<tspan fill="#3380ff">Mental</tspan><tspan fill="#5b6270" font-size="46" dy="-38">MX</tspan></text>
  <text x="90" y="400" font-family="Arial, sans-serif" font-size="30" fill="#9aa1b1">Análisis crítico de IA, tecnología y cultura digital.</text>
  <rect x="90" y="440" width="56" height="4" fill="#0066ff"/>
</svg>
`;

const dest = path.join(ROOT, 'public', 'og-default.png');
await sharp(Buffer.from(svg)).png().toFile(dest);
console.log('wrote', dest);
