import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

/** Rewrites a blogger.googleusercontent.com image URL to request a given target width. */
export function resizeBloggerUrl(url, targetWidth) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    const sizeIdx = parts.findIndex((p) => /^(s\d+|w\d+(-h\d+)?)(-.*)?$/.test(p));
    if (sizeIdx === -1) return url;
    parts[sizeIdx] = `w${targetWidth}`;
    u.pathname = parts.join('/');
    return u.toString();
  } catch {
    return url;
  }
}

export function extFromUrl(url) {
  const clean = url.split('?')[0];
  const ext = clean.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext)) return ext;
  return 'jpg';
}

/** Small concurrency limiter, no deps. */
export function createLimiter(concurrency) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (active >= concurrency || queue.length === 0) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    fn()
      .then(resolve, reject)
      .finally(() => {
        active--;
        next();
      });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
}

const downloadCache = new Map();

/** Downloads a URL to destPath (skips if already present on disk). Returns true on success. */
export async function downloadImage(url, destPath, { retries = 3 } = {}) {
  if (existsSync(destPath)) return true;
  if (downloadCache.has(destPath)) return downloadCache.get(destPath);

  const attempt = async () => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        mkdirSync(path.dirname(destPath), { recursive: true });
        writeFileSync(destPath, buf);
        return true;
      } catch (err) {
        if (i === retries - 1) {
          console.warn(`  ! failed to download ${url}: ${err.message}`);
          return false;
        }
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
      }
    }
    return false;
  };

  const p = attempt();
  downloadCache.set(destPath, p);
  return p;
}
