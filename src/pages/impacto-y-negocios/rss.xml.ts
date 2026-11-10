import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getImpactoPosts, impactoLineas, IMPACTO_MANIFIESTO } from '../../lib/impacto';

// Feed propio de "Impacto y Negocios": la entrega recurrente para quien sigue
// el radar sin newsletter. La descripción de cada ítem son las tres líneas
// Paga / Gana / Riesgo, no el extracto del artículo.
const SITE_AUTHOR = 'glitchMentalMX';

export async function GET(context: APIContext) {
  const posts = await getImpactoPosts();
  const siteURL = context.site!.toString();
  const logoURL = new URL('/og-default.png', context.site!).href;

  return rss({
    title: 'glitchMentalMX · Impacto y Negocios',
    description: IMPACTO_MANIFIESTO,
    site: context.site!,
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: impactoLineas(post)
        .map((l) => `${l.etiqueta}: ${l.texto}`)
        .join(' · '),
      link: `/articulos/${post.id}/`,
      customData: `<dc:creator>${SITE_AUTHOR}</dc:creator>`,
    })),
    customData: `<language>es</language>
    <dc:creator>${SITE_AUTHOR}</dc:creator>
    <image>
      <url>${logoURL}</url>
      <title>glitchMentalMX · Impacto y Negocios</title>
      <link>${siteURL}impacto-y-negocios/</link>
    </image>
    <atom:link href="${siteURL}impacto-y-negocios/rss.xml" rel="self" type="application/rss+xml" />`,
  });
}
