import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { resizeBloggerUrl, extFromUrl, downloadImage, createLimiter } from './lib/images.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PAGINAS = path.join(ROOT, '..', 'content-export', 'paginas');
const SLUG_MAP = JSON.parse(readFileSync(path.join(ROOT, 'src', 'data', 'slug-map.json'), 'utf-8'));
const limit = createLimiter(10);

function extractArray(html) {
  const start = html.indexOf('const misInsights = [');
  const arrayStart = html.indexOf('[', start);
  let depth = 0;
  let end = -1;
  for (let i = arrayStart; i < html.length; i++) {
    if (html[i] === '[') depth++;
    else if (html[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const literal = html.slice(arrayStart, end + 1);
  // eslint-disable-next-line no-new-func
  return new Function(`return ${literal}`)();
}

function resolveEnlace(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!/glitchmental\.com$/.test(u.hostname)) return url; // external link, keep as-is
    if (u.pathname.startsWith('/search/')) return null; // Blogger label search, no equivalent
    let basename = u.pathname.replace(/\/+$/, '').split('/').pop() || '';
    basename = basename.replace(/\.html$/, '');
    return SLUG_MAP[basename] || null;
  } catch {
    return null;
  }
}

async function migrate(slug, outFile, { withLinks }) {
  const html = readFileSync(path.join(PAGINAS, `${slug}.html`), 'utf-8');
  const items = extractArray(html);
  const imageDir = path.join(ROOT, 'public', 'images', slug);

  const out = await Promise.all(
    items.map((item, i) =>
      limit(async () => {
        const ext = extFromUrl(item.imagen);
        const filename = `${i}.${ext}`;
        const sizedUrl = resizeBloggerUrl(item.imagen, 900);
        const savedPath = await downloadImage(sizedUrl, path.join(imageDir, filename));
        const entry = {
          id: String(i + 1),
          titulo: item.titulo,
          resumen: item.resumen,
          imagen: savedPath ? `/images/${slug}/${path.basename(savedPath)}` : '',
        };
        if (withLinks) entry.enlace = resolveEnlace(item.enlace);
        return entry;
      })
    )
  );

  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  const unresolved = withLinks ? out.filter((o) => !o.enlace).length : 0;
  console.log(`${slug}: ${out.length} items${withLinks ? `, ${unresolved} unresolved links` : ''}`);
}

await migrate('insights-visuales', path.join(ROOT, 'src', 'content', 'data', 'insights-visuales.json'), { withLinks: true });
await migrate('dato-incomodo', path.join(ROOT, 'src', 'content', 'data', 'dato-incomodo.json'), { withLinks: false });
