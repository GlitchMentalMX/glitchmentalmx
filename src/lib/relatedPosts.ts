import { getCollection, type CollectionEntry } from 'astro:content';

// Mapea la `categoria` de Dato Incómodo/Insights Visuales (9 valores, ver
// content.config.ts) a la `category` real de `posts` (4 valores) para poder
// elegir artículos genuinamente relacionados en la página individual de
// cada pieza. 'Futuro del Trabajo' no tiene una categoría de posts
// equivalente limpia (en insightCategoryLinks apunta a una sección de una
// colección, no a un archivo de categoría) — se deja sin mapeo a propósito
// en vez de forzar un match débil.
const POST_CATEGORY_BY_PIECE_CATEGORIA: Partial<Record<string, string>> = {
  'Inteligencia Artificial': 'Inteligencia Artificial',
  'Narrativa de la IA': 'Inteligencia Artificial',
  'Sistemas Autónomos': 'Inteligencia Artificial',
  'IA Agéntica': 'Inteligencia Artificial',
  'Cultura Digital': 'Cultura Digital',
  'Psicología Digital': 'Cultura Digital',
  'Tecnología de Consumo': 'Tecnología de Consumo',
  'Tendencias Digitales': 'Tendencias Digitales',
};

interface RelatedPostsOptions {
  categoria?: string;
  date: Date;
  // Insights Visuales trae un `enlace` que a veces ya apunta a un artículo
  // real elegido a mano por Jorge — máxima confianza, se prioriza sobre el
  // match por categoría. Dato Incómodo no tiene este campo.
  enlace?: string | null;
  max?: number;
}

// Nunca fabrica un match: si no hay `categoria` mapeable ni `enlace` a un
// artículo real, regresa una lista vacía y la página simplemente no
// muestra la sección — mismo criterio que el resto del sitio (ver
// [[feedback-jorge-work-style]]: nunca forzar coincidencias).
export async function relatedPostsForPiece(opts: RelatedPostsOptions): Promise<CollectionEntry<'posts'>[]> {
  const max = opts.max ?? 3;
  const allPosts = await getCollection('posts', ({ data }) => !data.draft);

  const result: CollectionEntry<'posts'>[] = [];
  const usedIds = new Set<string>();

  if (opts.enlace && opts.enlace.startsWith('/articulos/')) {
    const slug = opts.enlace.replace(/^\/articulos\//, '').replace(/\/$/, '');
    const post = allPosts.find((p) => p.id === slug);
    if (post) {
      result.push(post);
      usedIds.add(post.id);
    }
  }

  const postCategory = opts.categoria ? POST_CATEGORY_BY_PIECE_CATEGORIA[opts.categoria] : undefined;
  if (postCategory && result.length < max) {
    // Mismo criterio de cercanía de fecha que "Sigue leyendo" en
    // src/pages/articulos/[slug].astro — sin el top-up cross-categoría que
    // esa página sí hace, para no diluir la relevancia con menos de 3.
    const pool = allPosts
      .filter((p) => p.data.category === postCategory && !usedIds.has(p.id))
      .sort((a, b) => {
        const da = Math.abs(a.data.pubDate.valueOf() - opts.date.valueOf());
        const db = Math.abs(b.data.pubDate.valueOf() - opts.date.valueOf());
        return da - db;
      });
    for (const post of pool) {
      if (result.length >= max) break;
      result.push(post);
      usedIds.add(post.id);
    }
  }

  return result;
}
