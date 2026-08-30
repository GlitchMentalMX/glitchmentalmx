import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { loadFeedEntries } from './lib/feed-index.mjs';

// Backfills the real, hand-written Blogger "Search Description" into the
// `description` field of migrated posts. That value survived the export in
// content-export/feed.atom as <blogger:metaDescription> — it was just never
// mapped by migrate-posts.mjs, which fell back to auto-extracting the first
// paragraph of the body instead.

const ROOT = path.resolve(import.meta.dirname, '..');
const FEED_PATH = path.join(ROOT, '..', 'content-export', 'feed.atom');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');

function isValidDescription(text) {
  if (!text) return false;
  const trimmed = text.trim();
  if (trimmed.length <= 20) return false;
  if (/<[^>]+>/.test(trimmed)) return false;
  if (/&[a-zA-Z#0-9]+;/.test(trimmed)) return false;
  return true;
}

function updateDescriptionInFile(filePath, newDescription) {
  const raw = readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') throw new Error('frontmatter no encontrado');
  let closeIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) throw new Error('frontmatter no cerrado');

  const fmLines = lines.slice(1, closeIdx);
  const startIdx = fmLines.findIndex((l) => /^description:/.test(l));
  if (startIdx === -1) throw new Error('campo description no encontrado');
  let endIdx = fmLines.length;
  for (let i = startIdx + 1; i < fmLines.length; i++) {
    if (/^[A-Za-z_][\w-]*:/.test(fmLines[i])) {
      endIdx = i;
      break;
    }
  }

  const dumped = yaml.dump({ description: newDescription }).replace(/\n$/, '');
  const dumpedLines = dumped.split('\n');

  const newFmLines = [...fmLines.slice(0, startIdx), ...dumpedLines, ...fmLines.slice(endIdx)];
  const newLines = ['---', ...newFmLines, '---', ...lines.slice(closeIdx + 1)];
  writeFileSync(filePath, newLines.join('\n'));
}

function main() {
  const feedEntries = loadFeedEntries(FEED_PATH);
  const feedByTitle = new Map();
  for (const e of feedEntries) {
    if (e.type === 'POST') feedByTitle.set(e.title.trim(), e);
  }

  const files = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();
  console.log(`Procesando ${files.length} posts...`);

  const unresolved = [];
  let updated = 0;

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    const title = String(data.title || '').trim();

    const feedEntry = feedByTitle.get(title);
    if (!feedEntry) {
      unresolved.push({ slug, reason: 'sin-match-en-feed' });
      continue;
    }

    const description = feedEntry.metaDescription.trim();
    if (!isValidDescription(description)) {
      unresolved.push({ slug, reason: 'sin-metaDescription-o-invalida' });
      continue;
    }

    try {
      updateDescriptionInFile(filePath, description);
      updated++;
    } catch (e) {
      unresolved.push({ slug, reason: `error: ${e.message}` });
    }
  }

  console.log(`\nListo. ${updated} descriptions actualizadas de ${files.length} posts.`);
  console.log(`\n${unresolved.length} posts sin backfill:`);
  for (const u of unresolved) console.log(`  - ${u.slug} (${u.reason})`);
}

main();
