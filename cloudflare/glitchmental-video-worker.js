/**
 * Sirve videos cortos de glitchmental.com (hoy: el bucle del Laboratorio en el
 * home) con soporte de HTTP Range.
 *
 * Por qué existe: Safari/iOS exige Range (206 + Accept-Ranges + Content-Range)
 * para reproducir <video>, y el hosting de archivos estáticos de Cloudflare
 * responde 200 con el archivo completo aunque se le pida un rango. Este Worker
 * se pone delante: pide el archivo completo al Worker de estáticos (service
 * binding) y devuelve el pedazo que el navegador pidió. Pensado para archivos
 * chicos (≈1 MB, 5 s); no usar con videos grandes.
 *
 * Despliegue (se pega en el panel, sin tarjeta):
 *   1. El mp4 ya vive en el Worker de estáticos (p. ej. "rough-dew-f9f5").
 *   2. Crear un Worker "glitchmental-video" (plantilla Hello World), Edit code,
 *      pegar este archivo, Deploy.
 *   3. Settings -> Bindings -> Add -> Service binding:
 *        Variable name: ORIGEN   |   Service: el Worker de estáticos del paso 1
 *   4. Pegar en LAB_VIDEO_URL (src/pages/index.astro) la URL de ESTE Worker +
 *      el nombre del archivo, p. ej.
 *      https://glitchmental-video.<cuenta>.workers.dev/laboratorio-loop.mp4
 *
 * Solo sirve .mp4 / .webm, solo GET y HEAD.
 */

const TIPOS = { mp4: 'video/mp4', webm: 'video/webm' };
const CACHE = new Map(); // dentro del isolate: evita re-pedir el archivo cada vez

async function cargar(env, key) {
  if (CACHE.has(key)) return CACHE.get(key);
  const r = await env.ORIGEN.fetch(new Request(`https://origen/${encodeURIComponent(key)}`));
  if (!r.ok) return null;
  const buf = await r.arrayBuffer();
  if (CACHE.size >= 4) CACHE.clear();
  CACHE.set(key, buf);
  return buf;
}

// "bytes=a-b" | "bytes=a-" | "bytes=-n" -> {start,end} (inclusivos) | null (inválido)
function parsearRango(cabecera, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(cabecera.trim());
  if (!m || (m[1] === '' && m[2] === '')) return null;
  let start, end;
  if (m[1] === '') {
    const n = Number(m[2]);
    if (n === 0) return null;
    start = Math.max(size - n, 0);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start > end || start >= size) return null;
  return { start, end };
}

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Método no permitido', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }

    let key;
    try {
      key = decodeURIComponent(new URL(request.url).pathname.slice(1));
    } catch {
      return new Response('No encontrado', { status: 404 });
    }
    const ext = key.split('.').pop()?.toLowerCase() ?? '';
    if (!key || key.includes('..') || !TIPOS[ext]) {
      return new Response('No encontrado', { status: 404 });
    }

    const buf = await cargar(env, key);
    if (!buf) return new Response('No encontrado', { status: 404 });
    const size = buf.byteLength;

    const headers = new Headers({
      'Content-Type': TIPOS[ext],
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    });

    const pedido = request.headers.get('range');
    if (pedido) {
      const rango = parsearRango(pedido, size);
      if (!rango) {
        headers.set('Content-Range', `bytes */${size}`);
        return new Response(null, { status: 416, headers });
      }
      const largo = rango.end - rango.start + 1;
      headers.set('Content-Range', `bytes ${rango.start}-${rango.end}/${size}`);
      headers.set('Content-Length', String(largo));
      return new Response(request.method === 'HEAD' ? null : buf.slice(rango.start, rango.end + 1), { status: 206, headers });
    }

    headers.set('Content-Length', String(size));
    return new Response(request.method === 'HEAD' ? null : buf, { status: 200, headers });
  },
};
