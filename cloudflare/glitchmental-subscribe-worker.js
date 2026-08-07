/**
 * Subscribe form backend for glitchmental.com — replaces Tally.
 *
 * Deploy this as its own Cloudflare Worker in the same account that hosts
 * glitchsearch-groq-proxy / glitchsearch-gemini-proxy (glitchmental-web
 * account), and bind it to the SAME KV namespace those two use
 * (glitchsearch_rate_limit -> binding name RATE_LIMIT_KV). This worker only
 * adds new keys under the "rl-subscribe:" prefix, so it can't collide with
 * the search rate limits already stored there.
 *
 * Secrets to set in the Worker's settings (Settings -> Variables -> Encrypt),
 * NEVER hardcoded here:
 *   RESEND_API_KEY   — API key from https://resend.com (free tier: 3,000
 *                       emails/month, 100/day — plenty for a subscribe form).
 *   NOTIFY_EMAIL      — the address that should receive each new-subscriber
 *                       notification (e.g. jorge@glitchmental.com).
 *   FROM_EMAIL        — the "from" address on the notification email. Until
 *                       you verify glitchmental.com in Resend, use their
 *                       shared sandbox address: onboarding@resend.dev — it
 *                       works in production, it just isn't branded. Once you
 *                       verify your domain in Resend (adds a couple of DNS
 *                       records), switch this to something like
 *                       notificaciones@glitchmental.com.
 *   TURNSTILE_SECRET  — optional, leave unset for now. If you later add a
 *                       Cloudflare Turnstile widget to the form, set this to
 *                       the secret key and the verification block below
 *                       activates automatically — no code changes needed.
 *
 * Plain variables (Settings -> Variables, not encrypted):
 *   ALLOWED_ORIGINS is hardcoded below (same pattern as the other workers)
 *   since it never changes per-deploy.
 */

const ALLOWED_ORIGINS = ['https://glitchmental.com', 'https://www.glitchmental.com'];
const RATE_LIMIT_PER_WINDOW = 3; // per IP
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes
const MIN_FILL_TIME_MS = 2500; // reject submissions faster than a human could plausibly type

const REQUIRED_CONSENT_TEXT =
  'Sí quiero recibir el newsletter mensual y la versión ejecutiva del Índice glitchMentalMX.';

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
    const rateLimitKey = `rl-subscribe:${ip}:${Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SECONDS * 1000))}`;
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

    const { name, email, consent, website, formLoadedAt, turnstileToken } = body || {};

    // Honeypot — a real visitor never sees or fills this field. If it's
    // filled, pretend success so the bot doesn't learn it was caught.
    if (typeof website === 'string' && website.trim() !== '') {
      return json({ ok: true }, 200, matchedOrigin);
    }

    // Speed trap — bots that submit instantly on page load get silently
    // accepted-looking too, for the same reason as the honeypot above.
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
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const errors = [];
    if (cleanName.length < 2 || cleanName.length > 200) errors.push('Nombre inválido');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 320) {
      errors.push('Correo inválido');
    }
    if (consent !== true) errors.push('Falta aceptar la casilla de consentimiento');
    if (errors.length > 0) {
      return json({ ok: false, error: errors.join(', ') }, 400, matchedOrigin);
    }

    const now = new Date();
    const fecha = now.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'long' });
    const hora = now.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', timeStyle: 'short' });

    const emailResult = await sendNotification(env, {
      name: cleanName,
      email: cleanEmail,
      fecha,
      hora,
    });

    if (!emailResult.ok) {
      console.log(`[subscribe] Resend error: ${emailResult.status} ${emailResult.text}`);
      return json({ ok: false, error: 'No se pudo enviar la notificación, intenta de nuevo' }, 502, matchedOrigin);
    }

    return json({ ok: true }, 200, matchedOrigin);
  },
};

async function sendNotification(env, { name, email, fecha, hora }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: env.NOTIFY_EMAIL,
      reply_to: email,
      subject: `Nueva suscripción — ${name}`,
      text: [
        'Nueva suscripción al newsletter de glitchmentalMX.',
        '',
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Fecha: ${fecha}`,
        `Hora: ${hora}`,
        '',
        `Confirmó: "${REQUIRED_CONSENT_TEXT}"`,
      ].join('\n'),
    }),
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
