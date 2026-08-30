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

-- Eventos custom (clics, no vistas de página) — tabla aparte de `hits` para
-- no forzar columnas de pageview (referrer, utm, país, etc.) en algo que no
-- las tiene. Primer uso: el botón "Fuentes preferidas" de Google.
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  day TEXT NOT NULL,
  name TEXT NOT NULL,               -- ej. 'preferred-source-click'
  path TEXT NOT NULL,
  data TEXT,                        -- JSON string con detalle extra (ej. {"placement":"footer"})
  visitor_hash TEXT NOT NULL,
  is_bot INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_events_day ON events(day);
CREATE INDEX IF NOT EXISTS idx_events_name ON events(name);
