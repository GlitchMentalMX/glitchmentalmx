import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// RSS 2.0 no tiene una etiqueta <author> de canal sin email (solo
// managingEditor/webMaster, que exigen formato email). dc:creator es la
// extensión estándar para autor por nombre, tanto a nivel canal como por
// ítem — se usa en ambos para que agregadores como Friendica (que necesita
// poder atribuir un autor a cada entrada para importarla) tengan de dónde
// tomarlo.
const SITE_AUTHOR = 'glitchMentalMX';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const siteURL = context.site!.toString();
  const logoURL = new URL('/og-default.png', context.site!).href;

  return rss({
    title: 'glitchMentalMX',
    description: 'Análisis crítico de inteligencia artificial, tecnología y cultura digital.',
    site: context.site!,
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/articulos/${post.id}/`,
      customData: `<dc:creator>${SITE_AUTHOR}</dc:creator>`,
    })),
    customData: `<language>es</language>
    <dc:creator>${SITE_AUTHOR}</dc:creator>
    <image>
      <url>${logoURL}</url>
      <title>glitchMentalMX</title>
      <link>${siteURL}</link>
    </image>
    <atom:link href="${siteURL}rss.xml" rel="self" type="application/rss+xml" />`,
  });
}
