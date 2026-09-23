// Migración retroactiva, una sola corrida — SPEC: páginas individuales
// indexables para Dato Incómodo e Insights Visuales, punto 7.
//
// 1) Dato Incómodo: backfill de `imagenAlt` (copia el texto de `resumen`)
//    en las entradas que todavía no lo tienen — las creadas antes de que el
//    campo existiera en el CMS. Insights Visuales NO se toca (su alt ya
//    existe y funciona, ver SPEC punto 1).
// 2) Ambas colecciones: calcula y escribe el campo `slug` en cada entrada
//    que no tenga uno ya (override manual del autor). El cálculo usa
//    exactamente la misma función que astro.config.mjs (lastmod del
//    sitemap) y las páginas individuales en build time
//    (src/pages/dato-incomodo/[slug].astro, .../insights-visuales/[slug].astro)
//    — ver src/lib/pieceSlug.mjs. Escribir el valor aquí lo vuelve
//    permanente: si el texto de la pieza se edita después, la URL ya
//    publicada e indexada no cambia.
//
// Uso: node scripts/migrate-dato-insights-seo.mjs [--dry-run]

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { assignPieceSlugs } from '../src/lib/pieceSlug.mjs';
import { setFrontmatterFields } from './lib/frontmatter.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function loadEntries(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(dir, file);
      const id = file.replace(/\.md$/, '');
      const { data } = matter(readFileSync(filePath, 'utf-8'));
      return { id, filePath, data };
    });
}

// Los borradores (draft: true) nunca generan página (getStaticPaths filtra
// `!data.draft`, igual que el resto del sitio) — así que se excluyen del
// cálculo de colisiones de slug: si un borrador y una pieza publicada
// producen el mismo slug base, la publicada debe quedarse con la versión
// limpia, no ceder el sufijo -2 solo porque el borrador (invisible, sin URL
// propia) iba primero en orden alfabético de archivo. Los borradores se
// quedan sin `slug` propio hasta que se publiquen — en ese momento, si
// siguen sin uno, la página lo calcula solo (mismo mecanismo, ver
// src/pages/dato-incomodo/[slug].astro).
function migrateDatoIncomodo() {
  const dir = path.join(ROOT, 'src', 'content', 'dato-incomodo');
  const entries = loadEntries(dir);
  const published = entries.filter((e) => !e.data.draft);

  const slugs = assignPieceSlugs(
    published.map((e) => ({ id: e.id, override: e.data.slug, text: e.data.resumen }))
  );

  let altBackfilled = 0;
  let slugsWritten = 0;
  for (const entry of entries) {
    const fields = {};
    if (!entry.data.imagenAlt || !String(entry.data.imagenAlt).trim()) {
      fields.imagenAlt = entry.data.resumen;
      altBackfilled++;
    }
    if (!entry.data.draft && (!entry.data.slug || !String(entry.data.slug).trim())) {
      fields.slug = slugs.get(entry.id);
      slugsWritten++;
    }
    if (Object.keys(fields).length === 0) continue;
    console.log(`  dato-incomodo/${entry.id}.md ->`, fields);
    if (!DRY_RUN) setFrontmatterFields(entry.filePath, fields);
  }
  console.log(`Dato Incómodo: ${altBackfilled} imagenAlt backfilled, ${slugsWritten} slugs escritos (de ${entries.length} entradas, ${published.length} publicadas).`);
}

function migrateInsights() {
  const dir = path.join(ROOT, 'src', 'content', 'insights');
  const entries = loadEntries(dir);
  const published = entries.filter((e) => !e.data.draft);

  const slugs = assignPieceSlugs(
    published.map((e) => ({ id: e.id, override: e.data.slug, text: e.data.titulo }))
  );

  let slugsWritten = 0;
  for (const entry of published) {
    if (entry.data.slug && String(entry.data.slug).trim()) continue;
    const slug = slugs.get(entry.id);
    console.log(`  insights/${entry.id}.md -> slug: ${slug}`);
    if (!DRY_RUN) setFrontmatterFields(entry.filePath, { slug });
    slugsWritten++;
  }
  console.log(`Insights Visuales: ${slugsWritten} slugs escritos (de ${entries.length} entradas, ${published.length} publicadas).`);
}

console.log(DRY_RUN ? 'DRY RUN — no se escribe nada.\n' : 'Escribiendo cambios.\n');
migrateDatoIncomodo();
console.log();
migrateInsights();
