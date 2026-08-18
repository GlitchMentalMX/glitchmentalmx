-- Schema de analytics-worker.js — pegar completo en la consola de D1
-- (Cloudflare Dashboard -> Workers & Pages -> D1 -> tu base de datos -> Console).
-- Una sola tabla, sin resúmenes/rollups por ahora.

CREATE TABLE IF NOT EXISTS hits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,              -- unix timestamp, segundos
  day TEXT NOT NULL,                -- 'YYYY-MM-DD' (UTC), para agrupar rápido
  hour INTEGER NOT NULL,            -- 0-23 (UTC)
  path TEXT NOT NULL,
  referrer TEXT,
  referrer_host TEXT,
  traffic_source TEXT NOT NULL,     -- busqueda | social | referral | directo
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  country TEXT,                     -- código de 2 letras (MX, US, ES...) o XX
  device TEXT,                      -- desktop | mobile | tablet
  os TEXT,
  browser TEXT,
  screen_width INTEGER,
  visitor_hash TEXT NOT NULL,       -- rota cada día, nunca guarda IP
  is_bot INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_hits_day ON hits(day);
CREATE INDEX IF NOT EXISTS idx_hits_ts ON hits(ts);
CREATE INDEX IF NOT EXISTS idx_hits_bot ON hits(is_bot);
CREATE INDEX IF NOT EXISTS idx_hits_path ON hits(path);
