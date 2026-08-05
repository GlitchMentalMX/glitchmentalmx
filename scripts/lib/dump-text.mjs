import { readFileSync } from 'node:fs';
import * as cheerio from 'cheerio';

const BLOCK_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,td,th,figcaption';

export function dumpPageText(htmlPath) {
  const html = readFileSync(htmlPath, 'utf-8');
  const $ = cheerio.load(html);
  $('style, script').remove();

  const lines = [];
  const seen = new Set();
  $(BLOCK_SELECTOR).each((_, el) => {
    const txt = $(el).text().trim().replace(/\s+/g, ' ');
    if (!txt || seen.has(txt)) return;
    seen.add(txt);
    lines.push(`[${el.tagName}] ${txt}`);
  });

  const links = [];
  const linkSeen = new Set();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const txt = $(el).text().trim().replace(/\s+/g, ' ');
    const key = `${href}|${txt}`;
    if (!href || linkSeen.has(key)) return;
    linkSeen.add(key);
    links.push(`[a] ${txt}  => ${href}`);
  });

  return { lines, links };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { lines, links } = dumpPageText(process.argv[2]);
  console.log('--- BLOCKS ---');
  console.log(lines.join('\n'));
  console.log('\n--- LINKS ---');
  console.log(links.join('\n'));
}
