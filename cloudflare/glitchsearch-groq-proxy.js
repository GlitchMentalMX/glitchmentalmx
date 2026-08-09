// worker.js — Proxy seguro entre GlitchSearch y Groq

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

    // 2. Rate limit por IP — usando KV como contador con expiración. Si KV
    // falla por lo que sea, no debe tronar la búsqueda del usuario — sin
    // límite de velocidad es mejor que un error 1101 sin CORS (que el
    // navegador reporta como "Failed to fetch").
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rl:${ip}:${Math.floor(Date.now() / 60000)}`; // ventana de 1 minuto
    try {
      const currentCount = parseInt((await env.RATE_LIMIT_KV.get(rateLimitKey)) || '0', 10);
      if (currentCount >= RATE_LIMIT_PER_MINUTE) {
        return new Response(JSON.stringify({ error: 'Demasiadas solicitudes, espera un momento' }), {
          status: 429,
          headers: corsHeaders(matchedOrigin)
        });
      }
      ctx.waitUntil(env.RATE_LIMIT_KV.put(rateLimitKey, String(currentCount + 1), { expirationTtl: 90 }));
    } catch (e) {
      console.log(`[rate-limit-error] ${e.message}`);
    }

    // 3. Caché — si ya respondimos esta misma consulta hace poco, no gastamos
    // cuota de nuevo. Las llaves de KV tienen un límite de 512 bytes — el
    // cuerpo completo (prompt + snippets de resultados) lo supera fácilmente
    // en búsquedas con fragmentos largos, y KV truena con una excepción no
    // controlada si la llave es muy larga (eso rompía la petición entera de
    // forma intermitente — el mismo bug que tenía el proxy de Gemini). Usamos
    // un hash corto en vez del cuerpo crudo, y protegemos ambas operaciones
    // de KV con try/catch — un fallo de caché nunca debe tronar la respuesta real.
    const body = await request.json();
    const cacheKey = `cache:${hashString(JSON.stringify(body))}`;
    try {
      const cached = await env.RATE_LIMIT_KV.get(cacheKey);
      if (cached) {
        return new Response(cached, { headers: { ...corsHeaders(matchedOrigin), 'Content-Type': 'application/json' } });
      }
    } catch (e) {
      console.log(`[cache-read-error] ${e.message}`);
    }

    // 4. Llamada real a Groq — la key vive solo aquí, nunca llega al navegador
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}` // secreto, configurado en Cloudflare
      },
      body: JSON.stringify(body)
    });

    const responseText = await groqResponse.text();

    // 5. Registro de uso — visible en el dashboard de Cloudflare (logs gratis)
    console.log(`[${new Date().toISOString()}] IP:${ip} status:${groqResponse.status}`);

    if (groqResponse.ok) {
      try {
        ctx.waitUntil(env.RATE_LIMIT_KV.put(cacheKey, responseText, { expirationTtl: CACHE_TTL_SECONDS }));
      } catch (e) {
        console.log(`[cache-write-error] ${e.message}`);
      }
    }

    return new Response(responseText, {
      status: groqResponse.status,
      headers: { ...corsHeaders(matchedOrigin), 'Content-Type': 'application/json' }
    });
  }
};

// Hash corto y determinista (djb2) — evita que las llaves de caché superen
// el límite de 512 bytes de Cloudflare KV sin importar qué tan largo sea
// el prompt real que manda el sitio.
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
