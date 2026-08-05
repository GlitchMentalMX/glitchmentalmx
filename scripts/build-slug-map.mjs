import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadFeedEntries } from './lib/feed-index.mjs';
import { PAGES_MAP } from './lib/pages-map.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE_POSTS = path.join(ROOT, '..', 'content-export', 'posts');
const FEED_PATH = path.join(ROOT, '..', 'content-export', 'feed.atom');
const OUT_PATH = path.join(ROOT, 'src', 'data', 'slug-map.json');

const feedEntries = loadFeedEntries(FEED_PATH);
const feedByTitle = new Map();
const feedPagesByTitle = new Map();
for (const e of feedEntries) {
  if (e.type === 'POST') {
    feedByTitle.set(e.title.trim(), e);
  } else if (e.type === 'PAGE' && e.filename) {
    // keep the entry with a real filename; later ones win (most recent revision)
    feedPagesByTitle.set(e.title.trim(), e);
  }
}

const postFiles = readdirSync(SOURCE_POSTS).filter((f) => f.endsWith('.md'));

const map = {};
let matched = 0;
const unmatchedPosts = [];

for (const file of postFiles) {
  const raw = readFileSync(path.join(SOURCE_POSTS, file), 'utf-8');
  const { data } = matter(raw);
  const title = String(data.title || '').trim();
  const slug = String(data.slug || '').trim();
  const feedEntry = feedByTitle.get(title);
  if (feedEntry) {
    map[feedEntry.basename] = `/articulos/${slug}/`;
    matched++;
  } else {
    unmatchedPosts.push(title);
  }
}

const manifestPath = path.join(ROOT, '..', 'content-export', 'paginas', '_manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

for (const [oldSlug, route] of Object.entries(PAGES_MAP)) {
  map[oldSlug] = route;
}

// Older/alternate Blogger URLs for the same 28 pages (e.g. /p/acerca-de-glitchmentalmx.html
// vs the manifest's current slug "acerca-de") — resolved the same way as posts: by exact
// title match against feed.atom's PAGE entries.
let pageAliases = 0;
for (const entry of manifest) {
  const feedPage = feedPagesByTitle.get(entry.title.trim());
  const route = PAGES_MAP[entry.slug];
  if (!feedPage || !route) continue;
  if (!(feedPage.basename in map)) {
    map[feedPage.basename] = route;
    pageAliases++;
  }
}

// Common Blogger link variants worth normalizing away.
map[''] = '/';

// A couple of internal links on the old site point to a slightly different
// (later-renamed) basename than the one that ended up in feed.atom/posts.
// Found while resolving the "Detrás del Prompt" hub page.
const MANUAL_ALIASES = {
  'guadalajara-hub-digital-cfe-electricidad-2026': 'guadalajara-hub-digital-cfe-electricidad',
  'sonora-energia-ia-acuiferos-2026': 'sonora-energia-ia-acuiferos',
};
for (const [alias, canonical] of Object.entries(MANUAL_ALIASES)) {
  if (map[canonical]) map[alias] = map[canonical];
}

mkdirSync(path.dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(map, null, 2) + '\n');

console.log(`slug-map.json written: ${Object.keys(map).length} entries (${matched}/${postFiles.length} posts matched, ${pageAliases} page aliases resolved via feed.atom title)`);
if (unmatchedPosts.length) {
  console.log(`\nPosts without a feed.atom title match (${unmatchedPosts.length}) — internal links to these won't resolve via old-slug lookup, harmless unless something links to them by old Blogger URL:`);
  for (const t of unmatchedPosts) console.log('  -', t);
}
