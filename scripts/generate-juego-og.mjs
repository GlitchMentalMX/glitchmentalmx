// Imagen para compartir /juego/ (1200x630). Uso: node scripts/generate-juego-og.mjs <captura-vertical-del-juego.jpg>
// La captura es del juego real; este script solo la compone junto al título.
import sharp from 'sharp';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const src = process.argv[2];
if (!src) throw new Error('Falta la captura vertical del juego.');

const W = 1200;
const H = 630;
const PH = 560; // alto de la captura dentro de la imagen
const meta = await sharp(src).metadata();
// Se descarta el borde inferior de la captura (la barra del navegador de la prueba).
const cropH = Math.round(meta.height * 0.975);
const phoneW = Math.round((PH * meta.width) / cropH);
const radius = 28;
const mask = Buffer.from(`<svg width="${phoneW}" height="${PH}"><rect width="${phoneW}" height="${PH}" rx="${radius}" ry="${radius}"/></svg>`);
const shot = await sharp(src)
  .extract({ left: 0, top: 0, width: meta.width, height: cropH })
  .resize({ width: phoneW, height: PH })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const px = W - phoneW - 70;
const py = (H - PH) / 2;
const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="12%" cy="10%" r="55%"><stop offset="0%" stop-color="#ff4081" stop-opacity="0.32"/><stop offset="100%" stop-color="#ff4081" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="88%" cy="90%" r="55%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.28"/><stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0b0b10"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <rect x="${px - 5}" y="${py - 5}" width="${phoneW + 10}" height="${PH + 10}" rx="${radius + 4}" fill="#f6f3ec"/>
  <text x="70" y="86" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#a9a5b8">JUEGO WEB GRATIS</text>
  <text x="66" y="204" font-family="Arial Black, Arial, sans-serif" font-size="96" font-weight="900" fill="#ff2e93" transform="translate(5 5)">PULSA PARA</text>
  <text x="66" y="204" font-family="Arial Black, Arial, sans-serif" font-size="96" font-weight="900" fill="#ffd23f">PULSA PARA</text>
  <text x="66" y="318" font-family="Arial Black, Arial, sans-serif" font-size="112" font-weight="900" fill="#ff2e93" transform="translate(5 5)">EMPEORAR</text>
  <text x="66" y="318" font-family="Arial Black, Arial, sans-serif" font-size="112" font-weight="900" fill="#ffffff">EMPEORAR</text>
  <text x="70" y="412" font-family="Helvetica Neue, Arial, sans-serif" font-size="38" font-weight="700" fill="#f6f3ec">Intenta cancelar tu suscripción.</text>
  <text x="70" y="462" font-family="Helvetica Neue, Arial, sans-serif" font-size="38" font-weight="700" fill="#ffd23f">Ganar es perder.</text>
  <text x="70" y="556" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="#c9c5d4">Sin descargas · Sin registro · glitchmental.com/juego</text>
  <text x="70" y="598" font-family="Georgia, serif" font-size="30" font-weight="600" fill="#ffffff">glitch<tspan fill="#3380ff">Mental</tspan><tspan fill="#8a90a0" font-size="18" dy="-10">MX</tspan></text>
</svg>`;

const dest = path.join(ROOT, 'public', 'juego', 'og.png');
await sharp(Buffer.from(svg))
  .composite([{ input: shot, left: px, top: Math.round(py) }])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(dest);
const out = await sharp(dest).metadata();
console.log('wrote', dest, out.width + 'x' + out.height);
