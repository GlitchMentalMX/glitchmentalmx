-- Migración para una base D1 que YA existe (octubre 2026): duración de visita,
-- profundidad de scroll y "visitantes ahora". Pegar completo en la consola de
-- D1 y ejecutar UNA sola vez (ALTER TABLE no es idempotente: si repites, dará
-- "duplicate column name" — es inofensivo).
-- Las filas viejas quedan con NULL en estas columnas y simplemente no entran
-- en los promedios de duración/scroll.

ALTER TABLE hits ADD COLUMN pid TEXT;
ALTER TABLE hits ADD COLUMN duration INTEGER;
ALTER TABLE hits ADD COLUMN scroll INTEGER;
ALTER TABLE hits ADD COLUMN last_seen INTEGER;

CREATE INDEX IF NOT EXISTS idx_hits_pid ON hits(pid);
CREATE INDEX IF NOT EXISTS idx_hits_last_seen ON hits(last_seen);
