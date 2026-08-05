import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');

const WIDGET_RE = /\n{1,3}#[a-z]{2,5}-wrap \{[\s\S]*$/;

const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
let stripped = 0;

for (const file of files) {
  const full = path.join(POSTS_DIR, file);
  const content = readFileSync(full, 'utf-8');
  if (!WIDGET_RE.test(content)) continue;

  const cleaned = content.replace(WIDGET_RE, '').trimEnd() + '\n';
  writeFileSync(full, cleaned);
  stripped++;
}

console.log(`Stripped the broken series-link widget from ${stripped} posts.`);
