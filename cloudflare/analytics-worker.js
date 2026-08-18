// worker.js — Analytics propio de glitchmentalMX. Sin cookies, sin IP
// guardada, sin identificador que sobreviva entre días.
//
// Necesita, configurados en el Worker (Settings -> Variables and Secrets):
//   ANALYTICS_SALT   (secreto, Encrypt) — sal para el hash diario de visitante
//   STATS_TOKEN      (secreto, Encrypt) — token para poder leer /stats
// Y un binding de D1 (Settings -> Bindings) llamado exactamente:
//   DB               -> la base de datos creada con analytics-schema.sql
//
// Rutas:
//   POST    /collect  -> recibe un hit del beacon, lo guarda en D1
//   GET     /stats     -> JSON con las métricas, requiere Authorization: Bearer <STATS_TOKEN>
//   OPTIONS *          -> preflight CORS
//   *                  -> 404

const ALLOWED_ORIGINS = ['https://glitchmental.com', 'https://www.glitchmental.com'];

// Palabras que delatan tráfico de bot/crawler/monitor en el User-Agent.
const BOT_UA_RE =
  /bot|crawl|spider|slurp|headless|preview|facebookexternalhit|whatsapp|telegrambot|discordbot|pingdom|uptimerobot|monitor|lighthouse|pagespeed|ahrefs|semrush|mj12bot|petalbot/i;

const SEARCH_HOST_RE = /google\.|bing\.|yahoo\.|duckduckgo\.|baidu\.|yandex\./i;
const SOCIAL_HOST_RE =
  /facebook\.|instagram\.|twitter\.|x\.com|t\.co|linkedin\.|tiktok\.|reddit\.|pinterest\.|threads\.net|bsky\.app|mastodon\.|whatsapp\.|wa\.me|telegram\.|discord\./i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const matchedOrigin = ALLOWED_ORIGINS.find((allowed) => origin === allowed) || ALLOWED_ORIGINS[0];

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(matchedOrigin) });
    }

    if (url.pathname === '/collect' && request.method === 'POST') {
      return handleCollect(request, env, origin, matchedOrigin);
    }

    if (url.pathname === '/stats' && request.method === 'GET') {
      return handleStats(request, env, url, matchedOrigin);
    }

    return new Response('Not found', { status: 404 });
  },
};

async function handleCollect(request, env, origin, matchedOrigin) {
  // Un beacon nunca debe tronar la experiencia del sitio — cualquier error
  // aquí se traga en silencio y de todas formas se responde 204.
  try {
    // Si el navegador mandó un Origin y no es uno de los nuestros, se ignora
    // el hit (probablemente alguien pegándole al endpoint directo) — pero
    // igual respondemos 204 normal, sin dar pistas.
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(null, { status: 204, headers: corsHeaders(matchedOrigin) });
    }

    const bodyText = await request.text();
    const data = JSON.parse(bodyText);

    const ua = request.headers.get('User-Agent') || '';
    const ip = request.headers.get('CF-Connecting-IP') || '';
    const country = (request.cf && request.cf.country) || 'XX';

    const now = new Date();
    const day = now.toISOString().slice(0, 10);
    const hour = now.getUTCHours();
    const ts = Math.floor(now.getTime() / 1000);

    const visitorHash = await hashVisitor(env.ANALYTICS_SALT || '', day, ip, ua);
    const bot = BOT_UA_RE.test(ua) ? 1 : 0;
    const { device, os, browser } = parseUserAgent(ua);

    const query = typeof data.query === 'string' ? data.query : '';
    const qp = new URLSearchParams(query);
    const utmSource = qp.get('utm_source') || null;
    const utmMedium = qp.get('utm_medium') || null;
    const utmCampaign = qp.get('utm_campaign') || null;

    const referrer = typeof data.referrer === 'string' ? data.referrer : '';
    let referrerHost = '';
    try {
      referrerHost = referrer ? new URL(referrer).hostname : '';
    } catch (e) {
      referrerHost = '';
    }
    const trafficSource = classifyTraffic(referrerHost, utmSource, utmMedium);

    const path = (typeof data.path === 'string' ? data.path : '/').slice(0, 500);
    const width = typeof data.width === 'number' ? Math.round(data.width) : null;

    await env.DB.prepare(
      `INSERT INTO hits
        (ts, day, hour, path, referrer, referrer_host, traffic_source, utm_source, utm_medium, utm_campaign, country, device, os, browser, screen_width, visitor_hash, is_bot)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    )
      .bind(
        ts,
        day,
        hour,
        path,
        referrer.slice(0, 500),
        referrerHost.slice(0, 200),
        trafficSource,
        utmSource,
        utmMedium,
        utmCampaign,
        country,
        device,
        os,
        browser,
        width,
        visitorHash,
        bot
      )
      .run();
  } catch (e) {
    // silencio a propósito
  }

  return new Response(null, { status: 204, headers: corsHeaders(matchedOrigin) });
}

async function handleStats(request, env, url, matchedOrigin) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();

  if (!env.STATS_TOKEN || token !== env.STATS_TOKEN) {
    return json({ error: 'No autorizado' }, 401, matchedOrigin);
  }

  const rangeParam = url.searchParams.get('range') || '30d';
  const days = rangeParam === '7d' ? 7 : rangeParam === '90d' ? 90 : 30;
  const sinceDay = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  try {
    const [
      totals,
      botTotals,
      cumulative,
      byDay,
      byHourToday,
      topPages,
      sources,
      referrers,
      countries,
      devices,
      osRows,
      browserRows,
    ] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS views, COUNT(DISTINCT visitor_hash) AS uniques FROM hits WHERE day >= ? AND is_bot = 0')
        .bind(sinceDay)
        .first(),
      env.DB.prepare('SELECT COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 1').bind(sinceDay).first(),
      env.DB.prepare('SELECT COUNT(*) AS views FROM hits WHERE is_bot = 0').first(),
      env.DB.prepare(
        'SELECT day, COUNT(*) AS views, COUNT(DISTINCT visitor_hash) AS uniques FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY day ORDER BY day'
      )
        .bind(sinceDay)
        .all(),
      env.DB.prepare('SELECT hour, COUNT(*) AS views FROM hits WHERE day = ? AND is_bot = 0 GROUP BY hour ORDER BY hour')
        .bind(today)
        .all(),
      env.DB.prepare(
        'SELECT path, COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY path ORDER BY views DESC LIMIT 20'
      )
        .bind(sinceDay)
        .all(),
      env.DB.prepare(
        'SELECT traffic_source, COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY traffic_source ORDER BY views DESC'
      )
        .bind(sinceDay)
        .all(),
      env.DB.prepare(
        `SELECT referrer_host, COUNT(*) AS views FROM hits
         WHERE day >= ? AND is_bot = 0 AND referrer_host != '' GROUP BY referrer_host ORDER BY views DESC LIMIT 15`
      )
        .bind(sinceDay)
        .all(),
      env.DB.prepare(
        'SELECT country, COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY country ORDER BY views DESC LIMIT 20'
      )
        .bind(sinceDay)
        .all(),
      env.DB.prepare(
        'SELECT device, COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY device ORDER BY views DESC'
      )
        .bind(sinceDay)
        .all(),
      env.DB.prepare('SELECT os, COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY os ORDER BY views DESC')
        .bind(sinceDay)
        .all(),
      env.DB.prepare(
        'SELECT browser, COUNT(*) AS views FROM hits WHERE day >= ? AND is_bot = 0 GROUP BY browser ORDER BY views DESC'
      )
        .bind(sinceDay)
        .all(),
    ]);

    return json(
      {
        range_days: days,
        totals: { views: totals?.views || 0, uniques: totals?.uniques || 0 },
        bot_views: botTotals?.views || 0,
        cumulative_views: cumulative?.views || 0,
        by_day: byDay.results || [],
        by_hour_today: byHourToday.results || [],
        top_pages: topPages.results || [],
        sources: sources.results || [],
        referrers: referrers.results || [],
        countries: countries.results || [],
        devices: devices.results || [],
        os: osRows.results || [],
        browsers: browserRows.results || [],
      },
      200,
      matchedOrigin
    );
  } catch (e) {
    return json({ error: 'Error leyendo la base de datos', detail: String(e) }, 500, matchedOrigin);
  }
}

// --- utilidades ---

async function hashVisitor(salt, day, ip, ua) {
  const enc = new TextEncoder();
  const data = enc.encode(salt + '|' + day + '|' + ip + '|' + ua);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(digest));
  const hex = bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex.slice(0, 16);
}

function parseUserAgent(ua) {
  ua = ua || '';

  const isTablet = /iPad|Tablet(?!.*Mobile)/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
  const isMobile = !isTablet && /Mobi|iPhone|iPod|Android/i.test(ua);
  const device = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  let os = 'Otro';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS X|Macintosh/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Otro';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/i.test(ua)) browser = 'Opera';
  else if (/CriOS/i.test(ua)) browser = 'Chrome';
  else if (/FxiOS/i.test(ua)) browser = 'Firefox';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
  else if (/Safari\//i.test(ua) && /Version\//i.test(ua)) browser = 'Safari';

  return { device, os, browser };
}

function classifyTraffic(referrerHost, utmSource, utmMedium) {
  if (utmMedium) {
    const m = utmMedium.toLowerCase();
    if (m.indexOf('social') !== -1) return 'social';
    if (m.indexOf('cpc') !== -1 || m.indexOf('paid') !== -1 || m.indexOf('ppc') !== -1) return 'referral';
    if (m.indexOf('email') !== -1) return 'referral';
  }
  if (utmSource) return 'referral';
  if (!referrerHost) return 'directo';
  if (referrerHost.indexOf('glitchmental.com') !== -1) return 'directo';
  if (SEARCH_HOST_RE.test(referrerHost)) return 'busqueda';
  if (SOCIAL_HOST_RE.test(referrerHost)) return 'social';
  return 'referral';
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}
