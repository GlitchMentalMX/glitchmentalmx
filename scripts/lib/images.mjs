import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Blogger's image proxy ignores the extension in the URL once you rewrite the
 * size segment (e.g. requesting `w900` instead of the original `w1120-h620`) —
 * it silently serves JPEG bytes for what was a .webp-named asset. Trust the
 * actual bytes, not the URL, when deciding the extension to save with.
 */
function detectRealExt(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') return 'webp';
  if (buf.slice(0, 4).toString('ascii') === 'GIF8') return 'gif';
  return null;
}

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

/**
 * Downloads a URL to destPath, correcting the file extension to match the
 * actual downloaded bytes if it doesn't match what the URL implied.
 * Returns the final path actually written (or the pre-existing one on a
 * skipped re-run), or null on failure.
 */
export async function downloadImage(url, destPath, { retries = 3 } = {}) {
  if (existsSync(destPath)) return destPath;
  if (downloadCache.has(destPath)) return downloadCache.get(destPath);

  const attempt = async () => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());

        const realExt = detectRealExt(buf);
        let finalPath = destPath;
        if (realExt) {
          const dir = path.dirname(destPath);
          const base = path.basename(destPath, path.extname(destPath));
          finalPath = path.join(dir, `${base}.${realExt}`);
        }

        if (existsSync(finalPath)) return finalPath;
        mkdirSync(path.dirname(finalPath), { recursive: true });
        writeFileSync(finalPath, buf);
        return finalPath;
      } catch (err) {
        if (i === retries - 1) {
          console.warn(`  ! failed to download ${url}: ${err.message}`);
          return null;
        }
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
      }
    }
    return null;
  };

  const p = attempt();
  downloadCache.set(destPath, p);
  return p;
}
