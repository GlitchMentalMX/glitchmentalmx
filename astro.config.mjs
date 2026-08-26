// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// lastmod real del sitemap — antes no se mandaba ninguno. Se calcula leyendo
// el frontmatter crudo (no astro:content, que no está disponible en este
// contexto) una sola vez al arrancar el build. Alcance a propósito acotado a
// /articulos/ (posts + precios-ia): son las páginas donde una fecha de
// modificación real y verificable existe y le sirve a Google — el resto del
// sitio se queda sin lastmod en vez de adivinar una fecha incorrecta.
function leerFechaFrontmatter(fileUrl) {
  const contenido = readFileSync(fileUrl, 'utf-8');
  const actualizado = contenido.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m);
  const publicado = contenido.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m);
  const fecha = actualizado?.[1] ?? publicado?.[1];
  return fecha ? new Date(`${fecha}T12:00:00Z`) : undefined;
}

const postsDir = new URL('./src/content/posts/', import.meta.url);
const fechaPorSlugPost = new Map();
for (const archivo of readdirSync(postsDir)) {
  if (!archivo.endsWith('.md')) continue;
  const fecha = leerFechaFrontmatter(new URL(archivo, postsDir));
  if (fecha) fechaPorSlugPost.set(archivo.replace(/\.md$/, ''), fecha);
}

const preciosDir = new URL('./src/content/precios-ia/', import.meta.url);
const slugsPreciosIA = new Set(
  readdirSync(preciosDir)
    .filter((archivo) => archivo.endsWith('.md'))
    .map((archivo) => archivo.replace(/\.md$/, ''))
);

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

// https://astro.build/config
export default defineConfig({
  site: 'https://glitchmental.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/stats/'),
      serialize(item) {
        const { pathname } = new URL(item.url);

        if (pathname === '/precios-ia/' && fechaTipoCambio) {
          return { ...item, lastmod: fechaTipoCambio.toISOString() };
        }

        const match = pathname.match(/^\/articulos\/([^/]+)\/$/);
        if (match) {
          const slug = match[1];
          if (slugsPreciosIA.has(slug) && fechaTipoCambio) {
            return { ...item, lastmod: fechaTipoCambio.toISOString() };
          }
          const fecha = fechaPorSlugPost.get(slug);
          if (fecha) {
            return { ...item, lastmod: fecha.toISOString() };
          }
        }

        return item;
      },
    }),
  ],
});
