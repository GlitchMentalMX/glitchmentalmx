import { SAVE_VERSION, type CharId, type EndingId } from './config';

// Todo el almacenamiento del juego vive en el localStorage del propio
// navegador: sin cookies, sin cuentas, sin red. Si el navegador lo bloquea
// (modo privado estricto, datos de sitio desactivados) el juego sigue
// funcionando con una copia en memoria que se pierde al cerrar la pestaña.

export type FlagValue = boolean | number | string;

export interface Progress {
  v: number;
  characterId: CharId;
  sceneId: string;
  x: number;
  y: number;
  flags: Record<string, FlagValue>;
  inventory: string[];
  /** Segundos de juego acumulados (para el marcador del final). */
  t?: number;
  /** Checkpoint de Cartucho (instantánea de la partida, sin anidar otro checkpoint). */
  cp?: Omit<Progress, 'cp'>;
}

/** Lo que sobrevive a una partida nueva: finales vistos y preferencias de sonido. */
export interface Meta {
  v: number;
  endings: EndingId[];
  muted: boolean;
  ambient: boolean;
  lastCharacter: CharId | null;
  /** Secretos descubiertos por personaje. */
  secrets: Record<string, string[]>;
}

const KEY_PROGRESS = 'gm-juego:progreso:v1';
const KEY_META = 'gm-juego:meta:v1';

const memory = new Map<string, string>();

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    memory.delete(key);
  }
}

export function loadProgress(): Progress | null {
  const raw = read(KEY_PROGRESS);
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Progress;
    if (p.v !== SAVE_VERSION || !p.characterId || !p.sceneId) return null;
    return p;
  } catch {
    return null;
  }
}

export function saveProgress(p: Progress): void {
  write(KEY_PROGRESS, JSON.stringify(p));
}

export function clearProgress(): void {
  remove(KEY_PROGRESS);
}

const DEFAULT_META: Meta = { v: SAVE_VERSION, endings: [], muted: false, ambient: true, lastCharacter: null, secrets: {} };

export function loadMeta(): Meta {
  const raw = read(KEY_META);
  if (!raw) return { ...DEFAULT_META, secrets: {} };
  try {
    const m = { ...DEFAULT_META, ...(JSON.parse(raw) as Partial<Meta>) };
    return { ...m, secrets: m.secrets ?? {} };
  } catch {
    return { ...DEFAULT_META, secrets: {} };
  }
}

export function saveMeta(m: Meta): void {
  write(KEY_META, JSON.stringify(m));
}
