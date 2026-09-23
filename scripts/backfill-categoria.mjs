// Migración retroactiva, una sola corrida — respaldo de la sección
// "Artículos relacionados" en las páginas individuales de Dato Incómodo e
// Insights Visuales (src/pages/{dato-incomodo,insights-visuales}/[slug].astro).
//
// Esa sección elige artículos reales del catálogo por `categoria` (o, en
// Insights Visuales, por `enlace` cuando ya apunta a un /articulos/ real —
// prioridad más alta porque es una relación curada a mano, no inferida).
// Dato Incómodo nunca tuvo `categoria` (campo nuevo, cero entradas con
// valor) y 6 piezas de Insights Visuales no tienen `enlace` interno ni
// `categoria` — sin esto, esas páginas no tendrían ninguna señal para
// elegir relacionados. La clasificación (scripts/data/dato-incomodo-categorias-backfill.json
// para Dato Incómodo, y el mapa inline de abajo para las 6 de Insights
// Visuales) la hizo Claude leyendo cada resumen/titulo — no es un dato que
// exista en ninguna fuente, así que no hay forma de derivarla en código;
// documentado aquí como snapshot editorial, revisable/corregible a mano
// después vía el campo `categoria` del CMS.
//
// Uso: node scripts/backfill-categoria.mjs [--dry-run]

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { setFrontmatterFields } from './lib/frontmatter.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const datoIncomodoCategorias = JSON.parse(
  readFileSync(path.join(ROOT, 'scripts', 'data', 'dato-incomodo-categorias-backfill.json'), 'utf-8')
);

const insightsCategorias = {
  '15': 'Narrativa de la IA',
  '36': 'Narrativa de la IA',
  '70': 'Futuro del Trabajo',
  '88': 'Inteligencia Artificial',
  '90': 'Inteligencia Artificial',
  'las-pantallas-no-desaparecieron-dejaron-de-pertenecerte': 'Psicología Digital',
};

function apply(dir, categorias) {
  let written = 0;
  let skipped = 0;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const id = file.replace(/\.md$/, '');
    const filePath = path.join(dir, file);
    const { data } = matter(readFileSync(filePath, 'utf-8'));
    if (data.categoria) {
      skipped++;
      continue;
    }
    const categoria = categorias[id];
    if (!categoria) continue;
    console.log(`  ${path.basename(dir)}/${id}.md -> categoria: ${categoria}`);
    if (!DRY_RUN) setFrontmatterFields(filePath, { categoria });
    written++;
  }
  console.log(`${path.basename(dir)}: ${written} categoria escritas, ${skipped} ya tenían una.`);
}

console.log(DRY_RUN ? 'DRY RUN — no se escribe nada.\n' : 'Escribiendo cambios.\n');
apply(path.join(ROOT, 'src', 'content', 'dato-incomodo'), datoIncomodoCategorias);
console.log();
apply(path.join(ROOT, 'src', 'content', 'insights'), insightsCategorias);
