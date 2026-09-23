import { getCollection } from 'astro:content';
import { assignPieceSlugs } from './pieceSlug.mjs';

export interface RelatedInsightVisual {
  titulo: string;
  href: string;
}

// Enlace inverso: para cada `posts` que ya es el destino de un `enlace`
// curado a mano en Insights Visuales (ver src/pages/insights-visuales/[slug].astro),
// arma el link de vuelta hacia esa pieza. Antes de esto el enlace corría
// solo en un sentido (IV -> post) — el artículo nunca recibía nada a
// cambio, así que sus páginas individuales de IV no tenían ningún link
// entrante real del catálogo, solo el sitemap. Usa exactamente el mismo
// cálculo de slug que la página individual de esa pieza (assignPieceSlugs),
// así que nunca puede apuntar a una URL que no exista.
export async function relatedInsightVisualByPostId(): Promise<Map<string, RelatedInsightVisual>> {
  const insights = await getCollection('visualInsights', ({ data }) => !data.draft);
  const slugs = assignPieceSlugs(insights.map((i) => ({ id: i.id, override: i.data.slug, text: i.data.titulo })));

  const map = new Map<string, RelatedInsightVisual>();
  for (const insight of insights) {
    const enlace = insight.data.enlace?.trim();
    if (!enlace || !enlace.startsWith('/articulos/')) continue;
    const postId = enlace.replace(/^\/articulos\//, '').replace(/\/$/, '');
    // Si dos Insights Visuales distintos enlazan al mismo artículo, se
    // queda el primero en orden estable (ver assignPieceSlugs) — un solo
    // link recíproco por artículo, no varios.
    if (map.has(postId)) continue;
    map.set(postId, { titulo: insight.data.titulo, href: `/insights-visuales/${slugs.get(insight.id)}/` });
  }
  return map;
}
