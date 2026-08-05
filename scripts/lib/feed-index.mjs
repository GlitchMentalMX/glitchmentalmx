import { readFileSync } from 'node:fs';

function decodeXml(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * Parses the exported Blogger Atom feed into a flat list of entries.
 * Only extracts the handful of fields the migration scripts need:
 * title, the original /YYYY/MM/slug.html filename, type (POST|PAGE) and published date.
 */
export function loadFeedEntries(feedPath) {
  const xml = readFileSync(feedPath, 'utf-8');
  const entries = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(xml))) {
    const block = m[1];
    const title = block.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    const filename = block.match(/<blogger:filename>([\s\S]*?)<\/blogger:filename>/);
    const type = block.match(/<blogger:type>([\s\S]*?)<\/blogger:type>/);
    const published = block.match(/<published>([\s\S]*?)<\/published>/);
    if (!title || !filename) continue;
    const rawFilename = decodeXml(filename[1].trim());
    const basename = rawFilename
      .replace(/^\/+/, '')
      .replace(/\.html$/, '')
      .split('/')
      .pop();
    entries.push({
      title: decodeXml(title[1].trim()),
      filename: rawFilename,
      basename,
      type: type ? type[1].trim() : 'POST',
      published: published ? published[1].trim() : null,
    });
  }
  return entries;
}
