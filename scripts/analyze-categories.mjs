import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const FEED_PATH = path.join(ROOT, '..', 'content-export', 'feed.atom');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');

const xml = readFileSync(FEED_PATH, 'utf-8');

function decodeXml(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
const feedByTitle = new Map();
let m;
while ((m = entryRe.exec(xml))) {
  const block = m[1];
  const typeMatch = block.match(/<blogger:type>([\s\S]*?)<\/blogger:type>/);
  if (!typeMatch || typeMatch[1] !== 'POST') continue;
  const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (!titleMatch) continue;
  const title = decodeXml(titleMatch[1].trim());
  const categories = [...block.matchAll(/<category scheme='[^']*' term='([^']*)'\/>/g)].map((c) =>
    decodeXml(c[1])
  );
  feedByTitle.set(title, categories);
}

const NAMED = ['Inteligencia Artificial', 'Cultura digital', 'Tendencias Digitales', 'Tecnología de consumo'];

const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
let matched = 0;
let noCategories = 0;
let noneOfNamed = 0;
const allTermCounts = {};
const noneOfNamedTitles = [];

for (const file of files) {
  const raw = readFileSync(path.join(POSTS_DIR, file), 'utf-8');
  const { data } = matter(raw);
  const title = String(data.title).trim();
  const cats = feedByTitle.get(title);
  if (cats === undefined) continue;
  matched++;
  if (cats.length === 0) {
    noCategories++;
    continue;
  }
  for (const c of cats) allTermCounts[c] = (allTermCounts[c] || 0) + 1;
  const hasNamed = cats.some((c) => NAMED.some((n) => n.toLowerCase() === c.toLowerCase()));
  if (!hasNamed) {
    noneOfNamed++;
    noneOfNamedTitles.push({ title, cats });
  }
}

console.log(`Matched ${matched}/${files.length} posts to feed.atom categories.`);
console.log(`Posts with zero categories in feed: ${noCategories}`);
console.log(`Posts with categories but none matching the 4 named ones: ${noneOfNamed}`);
console.log('\nAll term counts:');
console.log(JSON.stringify(allTermCounts, null, 2));
console.log('\nSample of posts with no match to the 4 named categories:');
for (const t of noneOfNamedTitles.slice(0, 15)) console.log(' -', t.title, '|', t.cats);

// multi-category distribution
const multiCounts = {};
for (const file of files) {
  const raw = readFileSync(path.join(POSTS_DIR, file), 'utf-8');
  const { data } = matter(raw);
  const title = String(data.title).trim();
  const cats = feedByTitle.get(title);
  if (!cats) continue;
  const namedOnly = cats.filter((c) => NAMED.some((n) => n.toLowerCase() === c.toLowerCase()));
  multiCounts[namedOnly.length] = (multiCounts[namedOnly.length] || 0) + 1;
}
console.log('\nHow many of the 4 named categories each post has:');
console.log(JSON.stringify(multiCounts, null, 2));
