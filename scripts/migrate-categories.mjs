import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadFeedEntries } from './lib/feed-index.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const FEED_PATH = path.join(ROOT, '..', 'content-export', 'feed.atom');

// Canonical display names for the 4 reader-facing categories.
const NAMED = {
  'inteligencia artificial': 'Inteligencia Artificial',
  'cultura digital': 'Cultura Digital',
  'tendencias digitales': 'Tendencias Digitales',
  'tecnología de consumo': 'Tecnología de Consumo',
};

// Two posts needed a manual call — see conversation with the site owner.
const MANUAL_OVERRIDES = {
  'La IA no viene por tu trabajo. Ya lo está evaluando': 'Inteligencia Artificial',
  'Mundial 2026: nómadas digitales inundan México este año': 'Tendencias Digitales',
};

const xml = readFileSync(FEED_PATH, 'utf-8');
const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
const catsByTitle = new Map();
let m;
while ((m = entryRe.exec(xml))) {
  const block = m[1];
  const typeMatch = block.match(/<blogger:type>([\s\S]*?)<\/blogger:type>/);
  if (!typeMatch || typeMatch[1] !== 'POST') continue;
  const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (!titleMatch) continue;
  const title = titleMatch[1]
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
  const cats = [...block.matchAll(/<category scheme='[^']*' term='([^']*)'\/>/g)].map((c) => c[1]);
  catsByTitle.set(title, cats);
}

const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
let assigned = 0;
const problems = [];

for (const file of files) {
  const full = path.join(POSTS_DIR, file);
  const raw = readFileSync(full, 'utf-8');
  const parsed = matter(raw);
  const title = String(parsed.data.title).trim();

  let category = MANUAL_OVERRIDES[title];
  if (!category) {
    const cats = catsByTitle.get(title) || [];
    const named = cats
      .map((c) => NAMED[c.toLowerCase()])
      .filter(Boolean);
    if (named.length !== 1) {
      problems.push({ file, title, cats });
      continue;
    }
    category = named[0];
  }

  // Insert category right after title in the frontmatter for readability.
  const { title: t, ...rest } = parsed.data;
  const newData = { title: t, category, ...rest };
  const out = matter.stringify(parsed.content, newData);
  writeFileSync(full, out);
  assigned++;
}

console.log(`Assigned category to ${assigned}/${files.length} posts.`);
if (problems.length) {
  console.log(`\n${problems.length} problems (not written):`);
  for (const p of problems) console.log(' -', p.file, p.title, p.cats);
}
