import { getCollection, type CollectionEntry } from 'astro:content';

// Textos fijos de la sección: una sola fuente para landing, banda del home,
// RSS y metadatos. Alcance deliberadamente global (México, LATAM, España y el
// resto del mundo): el ángulo regional suma, pero no es requisito de entrada.
export const IMPACTO_MANIFIESTO =
  'Quién paga, quién se beneficia y dónde está el riesgo sistémico de la tecnología que está cambiando la infraestructura y los mercados. Escrito desde México, con alcance global. Análisis, no comunicados.';

export type ImpactoPost = CollectionEntry<'posts'>;

// Artículos que forman parte de "Impacto y Negocios", más recientes primero.
// El esquema (content.config.ts) ya garantiza que todos tengan los tres
// textos; el filtro de abajo es solo para que TypeScript lo sepa también.
export async function getImpactoPosts(): Promise<ImpactoPost[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft && data.is_impacto);
  return posts
    .filter((p) => p.data.impacto_quien_paga && p.data.impacto_quien_gana && p.data.impacto_riesgo)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const esLatam = (post: ImpactoPost) => post.data.impacto_ambito === 'latam';

export type ImpactoLinea = { etiqueta: string; texto: string };

// Las tres líneas del resumen, siempre en el mismo orden.
export function impactoLineas(post: ImpactoPost): ImpactoLinea[] {
  return [
    { etiqueta: 'Paga', texto: post.data.impacto_quien_paga! },
    { etiqueta: 'Gana', texto: post.data.impacto_quien_gana! },
    { etiqueta: 'Riesgo', texto: post.data.impacto_riesgo! },
  ];
}

// Texto plano que se copia al portapapeles (Slack, Teams, correo): título,
// las tres líneas con guion y el enlace del artículo.
export function impactoTextoCopia(post: ImpactoPost, siteURL: string | URL): string {
  const url = new URL(`/articulos/${post.id}/`, siteURL).toString();
  const lineas = impactoLineas(post).map((l) => `- ${l.etiqueta}: ${l.texto}`);
  return [post.data.title, ...lineas, url].join('\n');
}
