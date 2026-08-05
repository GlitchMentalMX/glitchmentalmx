import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src', 'content', 'data', 'insights-visuales.json');
const OUT_DIR = path.join(ROOT, 'src', 'content', 'insights');

const items = JSON.parse(readFileSync(SRC, 'utf-8'));
mkdirSync(OUT_DIR, { recursive: true });

// Position 0 in the original array = most recent (matches how the homepage
// and gallery page already treated this list). Synthesize descending dates
// so a real content collection sort produces the same order, and so newly
// created CMS entries (dated "today") naturally sort to the top.
const today = new Date('2026-08-05T12:00:00Z');

items.forEach((item, i) => {
  const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
  const frontmatter = {
    titulo: item.titulo,
    resumen: item.resumen,
    imagen: item.imagen,
    enlace: item.enlace ?? null,
    date: date.toISOString(),
  };
  const out = matter.stringify('', frontmatter);
  writeFileSync(path.join(OUT_DIR, `${item.id}.md`), out);
});

console.log(`Migrated ${items.length} insights to ${OUT_DIR}`);
