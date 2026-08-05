import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { loadFeedEntries } from './lib/feed-index.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const FEED_PATH = path.join(ROOT, '..', 'content-export', 'feed.atom');
const SLUG_MAP = JSON.parse(readFileSync(path.join(ROOT, 'src', 'data', 'slug-map.json'), 'utf-8'));
const SITE = 'https://glitchmental.com';

const entries = loadFeedEntries(FEED_PATH);
let written = 0;

for (const entry of entries) {
  if (!entry.filename || !entry.filename.endsWith('.html')) continue;
  const newRoute = SLUG_MAP[entry.basename];
  if (!newRoute) continue;

  const oldPath = entry.filename.replace(/^\/+/, ''); // e.g. 2026/04/foo.html
  const dest = path.join(ROOT, 'public', oldPath);
  const target = `${SITE}${newRoute}`;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Redirigiendo…</title>
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex">
</head>
<body>
<p>Este contenido se movió. Si no eres redirigido automáticamente, <a href="${target}">haz clic aquí</a>.</p>
</body>
</html>
`;

  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  written++;
}

console.log(`Wrote ${written} redirect stubs for old Blogger URLs.`);
