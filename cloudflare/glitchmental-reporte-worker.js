/**
 * "Reportar un dato desactualizado" backend for glitchmental.com.
 *
 * Same architecture as glitchmental-contact-worker.js — deploy this as its
 * own Worker in the glitchmental-web account (name it exactly
 * "glitchmental-reporte" so the URL matches src/components/ReportarDato.astro:
 * https://glitchmental-reporte.glitchmental-web.workers.dev/) and bind it to
 * the SAME KV namespace (glitchsearch_rate_limit -> binding name
 * RATE_LIMIT_KV). It only touches keys under the "rl-reporte:" prefix, so it
 * can't collide with the search, subscribe or contact rate limits.
 *
 * Secrets to set in the Worker's settings (Settings -> Variables -> Encrypt),
 * NEVER hardcoded here — they are the same three the contact worker uses:
 *   RESEND_API_KEY, NOTIFY_EMAIL, FROM_EMAIL
 *   TURNSTILE_SECRET (optional; leave unset)
 *
 * Unlike the contact form, the reader's email is OPTIONAL here: most people
 * who spot a stale price just want to tell us, not start a conversation.
 */

const ALLOWED_ORIGINS = ['https://glitchmental.com', 'https://www.glitchmental.com'];
const RATE_LIMIT_PER_WINDOW = 5; // per IP
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes
const MIN_FILL_TIME_MS = 2500; // reject submissions faster than a human could plausibly type

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || request.headers.get('Referer') || '';
    const matchedOrigin = ALLOWED_ORIGINS.find((allowed) => origin.startsWith(allowed));
    if (!matchedOrigin) {
      return json({ ok: false, error: 'Origen no permitido' }, 403, ALLOWED_ORIGINS[0]);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(matchedOrigin) });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Método no permitido' }, 405, matchedOrigin);
    }

    // Rate limit per IP — same KV-counter pattern as the other workers.
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rl-reporte:${ip}:${Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SECONDS * 1000))}`;
    const currentCount = parseInt((await env.RATE_LIMIT_KV.get(rateLimitKey)) || '0', 10);
    if (currentCount >= RATE_LIMIT_PER_WINDOW) {
      return json({ ok: false, error: 'Demasiados intentos, espera unos minutos' }, 429, matchedOrigin);
    }
    ctx.waitUntil(
      env.RATE_LIMIT_KV.put(rateLimitKey, String(currentCount + 1), {
        expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
      })
    );

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'JSON inválido' }, 400, matchedOrigin);
    }

    const { message, email, pagina, titulo, website, formLoadedAt, turnstileToken } = body || {};

    // Honeypot — a real visitor never sees or fills this field. If it's
    // filled, pretend success so the bot doesn't learn it was caught.
    if (typeof website === 'string' && website.trim() !== '') {
      return json({ ok: true }, 200, matchedOrigin);
    }

    // Speed trap — same reasoning as the honeypot above.
    if (typeof formLoadedAt === 'number' && Date.now() - formLoadedAt < MIN_FILL_TIME_MS) {
      return json({ ok: true }, 200, matchedOrigin);
    }

    // Optional Turnstile check — inert until TURNSTILE_SECRET is configured.
    if (env.TURNSTILE_SECRET) {
      if (!turnstileToken) {
        return json({ ok: false, error: 'Verificación anti-spam faltante' }, 400, matchedOrigin);
      }
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: turnstileToken, remoteip: ip }),
      });
      const verifyResult = await verify.json();
      if (!verifyResult.success) {
        return json({ ok: false, error: 'Verificación anti-spam fallida' }, 400, matchedOrigin);
      }
    }

    // Server-side validation — never trust the client, even though it also validates.
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanPagina = typeof pagina === 'string' ? pagina.trim() : '';
    // The title goes into an email subject: strip control chars (header
    // injection) and cap the length.
    const cleanTitulo = (typeof titulo === 'string' ? titulo : '')
      .replace(/[\u0000-\u001f\u007f]+/g, ' ')
      .trim()
      .slice(0, 120);

    const errors = [];
    if (cleanMessage.length < 10 || cleanMessage.length > 1500) errors.push('Mensaje inválido');
    if (cleanEmail !== '' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 320)) {
      errors.push('Correo inválido');
    }
    if (!cleanPagina.startsWith('/') || cleanPagina.length > 300 || /[\s\u0000-\u001f]/.test(cleanPagina)) {
      errors.push('Página inválida');
    }
    if (errors.length > 0) {
      return json({ ok: false, error: errors.join(', ') }, 400, matchedOrigin);
    }

    const now = new Date();
    const fecha = now.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'long' });
    const hora = now.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', timeStyle: 'short' });

    const emailResult = await sendNotification(env, {
      message: cleanMessage,
      email: cleanEmail,
      url: `https://glitchmental.com${cleanPagina}`,
      titulo: cleanTitulo,
      fecha,
      hora,
    });

    if (!emailResult.ok) {
      console.log(`[reporte] Resend error: ${emailResult.status} ${emailResult.text}`);
      return json({ ok: false, error: 'No se pudo enviar el reporte, intenta de nuevo' }, 502, matchedOrigin);
    }

    return json({ ok: true }, 200, matchedOrigin);
  },
};

async function sendNotification(env, { message, email, url, titulo, fecha, hora }) {
  const payload = {
    from: env.FROM_EMAIL,
    to: env.NOTIFY_EMAIL,
    subject: `Dato por revisar — ${titulo || url}`,
    text: [
      'Un lector reportó un dato desactualizado o incorrecto.',
      '',
      `Página: ${url}`,
      `Lo que reporta: ${message}`,
      `Correo del lector: ${email || '(no lo dejó)'}`,
      '',
      `Fecha: ${fecha}`,
      `Hora: ${hora}`,
    ].join('\n'),
  };
  if (email) payload.reply_to = email;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, status: res.status, text: res.ok ? '' : await res.text() };
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}
