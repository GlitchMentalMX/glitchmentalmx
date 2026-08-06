// worker.js — Proxy seguro entre GlitchSearch y Gemini

const ALLOWED_ORIGINS = ['https://glitchmental.com', 'https://www.glitchmental.com'];
const RATE_LIMIT_PER_MINUTE = 10; // por IP
const CACHE_TTL_SECONDS = 300; // 5 min — consultas repetidas no gastan cuota

export default {
  async fetch(request, env, ctx) {
    // 1. Validación del origen — bloquea cualquier llamada que no venga de tu sitio
    const origin = request.headers.get('Origin') || request.headers.get('Referer') || '';
    const matchedOrigin = ALLOWED_ORIGINS.find((allowed) => origin.startsWith(allowed));
    if (!matchedOrigin) {
      return new Response(JSON.stringify({ error: 'Origen no permitido' }), {
        status: 403,
        headers: corsHeaders(ALLOWED_ORIGINS[0])
      });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(matchedOrigin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // 2. Rate limit por IP — usando KV como contador con expiración
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rl-gemini:${ip}:${Math.floor(Date.now() / 60000)}`; // ventana de 1 minuto
    const currentCount = parseInt((await env.RATE_LIMIT_KV.get(rateLimitKey)) || '0', 10);

    if (currentCount >= RATE_LIMIT_PER_MINUTE) {
      return new Response(JSON.stringify({ error: 'Demasiadas solicitudes, espera un momento' }), {
        status: 429,
        headers: corsHeaders(matchedOrigin)
      });
    }
    ctx.waitUntil(env.RATE_LIMIT_KV.put(rateLimitKey, String(currentCount + 1), { expirationTtl: 90 }));

    // 3. El sitio manda { model, contents, generationConfig } — separamos el
    // modelo (va en la URL) del resto del cuerpo (va tal cual a Gemini)
    const payload = await request.json();
    const { model, ...geminiBody } = payload;
    if (!model) {
      return new Response(JSON.stringify({ error: 'Falta el modelo' }), {
        status: 400,
        headers: corsHeaders(matchedOrigin)
      });
    }

    // 4. Caché — si ya respondimos esta misma consulta hace poco, no gastamos cuota de nuevo
    const cacheKey = `cache-gemini:${model}:${JSON.stringify(geminiBody)}`;
    const cached = await env.RATE_LIMIT_KV.get(cacheKey);
    if (cached) {
      return new Response(cached, { headers: { ...corsHeaders(matchedOrigin), 'Content-Type': 'application/json' } });
    }

    // 5. Llamada real a Gemini — la key vive solo aquí, nunca llega al navegador
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify(geminiBody)
      }
    );

    const responseText = await geminiResponse.text();

    // 6. Registro de uso — visible en el dashboard de Cloudflare (logs gratis)
    console.log(`[${new Date().toISOString()}] IP:${ip} model:${model} status:${geminiResponse.status}`);

    if (geminiResponse.ok) {
      ctx.waitUntil(env.RATE_LIMIT_KV.put(cacheKey, responseText, { expirationTtl: CACHE_TTL_SECONDS }));
    }

    return new Response(responseText, {
      status: geminiResponse.status,
      headers: { ...corsHeaders(matchedOrigin), 'Content-Type': 'application/json' }
    });
  }
};

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
