import { readFileSync } from 'node:fs';
import * as cheerio from 'cheerio';

/**
 * Generic extraction for the 12 series/hub pages: pulls the plain-text
 * "hero" content that appears before the first article link (label, title,
 * subtitle, description...) plus the ordered list of article links.
 */
export function extractCollectionPage(htmlPath) {
  const html = readFileSync(htmlPath, 'utf-8');
  const $ = cheerio.load(html);
  $('style, script').remove();

  const postLinkRe = /glitchmental\.com\/20\d\d\/\d\d\//;
  const links = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (postLinkRe.test(href)) {
      links.push({ href, text: $(el).text().trim().replace(/\s+/g, ' ').slice(0, 80) });
    }
  });

  // walk all elements in document order, recording text of leaf text
  // containers (no element children) until the first post-link anchor.
  const introLines = [];
  let stop = false;
  const seen = new Set();
  $('*').each((_, el) => {
    if (stop) return;
    const $el = $(el);
    if ($el.is('a') && postLinkRe.test($el.attr('href') || '')) {
      stop = true;
      return;
    }
    if ($el.children('*').length > 0) return; // not a leaf
    const txt = $el.text().trim().replace(/\s+/g, ' ');
    if (txt && !seen.has(txt)) {
      seen.add(txt);
      introLines.push(txt);
    }
  });

  return { introLines, links };
}
