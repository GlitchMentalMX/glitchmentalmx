/**
 * Sirve videos cortos del bucket R2 para glitchmental.com (hoy: el bucle del
 * Laboratorio en el home).
 *
 * Despliegue (igual que los demás Workers: se pega en el panel):
 *   1. R2 -> crear un bucket (p. ej. "glitchmental-video") y subir el .mp4.
 *   2. Crear un Worker llamado "glitchmental-video" en la cuenta
 *      glitchmental-web. Su URL será
 *      https://glitchmental-video.glitchmental-web.workers.dev/
 *   3. Worker -> Settings -> Bindings -> R2 bucket:
 *        Variable name: VIDEOS   |   Bucket: el del paso 1
 *   4. Pegar la URL completa del archivo en LAB_VIDEO_URL (src/pages/index.astro),
 *      p. ej. https://glitchmental-video.glitchmental-web.workers.dev/laboratorio-loop.mp4
 *
 * Safari/iOS exige HTTP Range (206 + Accept-Ranges + Content-Range) para
 * reproducir <video>; por eso se pasa el header "range" a R2 y se responde 206
 * cuando corresponde. Solo sirve .mp4 / .webm, solo GET y HEAD.
 */

const TIPOS = { mp4: 'video/mp4', webm: 'video/webm' };

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

    const headers = new Headers({
      'Content-Type': TIPOS[ext],
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    });

    if (request.method === 'HEAD') {
      const meta = await env.VIDEOS.head(key);
      if (!meta) return new Response(null, { status: 404 });
      headers.set('Content-Length', String(meta.size));
      headers.set('ETag', meta.httpEtag);
      return new Response(null, { status: 200, headers });
    }

    const pideRango = request.headers.has('range');
    let obj;
    try {
      obj = await env.VIDEOS.get(key, pideRango ? { range: request.headers } : undefined);
    } catch {
      // Rango inválido o fuera de límites: se responde 416 en vez de fallar.
      const meta = await env.VIDEOS.head(key);
      if (!meta) return new Response('No encontrado', { status: 404 });
      headers.set('Content-Range', `bytes */${meta.size}`);
      return new Response(null, { status: 416, headers });
    }
    if (!obj) return new Response('No encontrado', { status: 404 });

    headers.set('ETag', obj.httpEtag);

    if (pideRango && obj.range) {
      const r = obj.range;
      const size = obj.size;
      let offset = r.offset ?? 0;
      let length = r.length ?? size - offset;
      if (r.suffix !== undefined) {
        length = Math.min(r.suffix, size);
        offset = size - length;
      }
      headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${size}`);
      headers.set('Content-Length', String(length));
      return new Response(obj.body, { status: 206, headers });
    }

    headers.set('Content-Length', String(obj.size));
    return new Response(obj.body, { status: 200, headers });
  },
};
