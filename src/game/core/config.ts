// Constantes globales del juego. Todo se dibuja en "unidades de diseño"
// (escenario 540x960, vertical 9:16). El canvas real es S veces más grande
// (1080x1920) y cada escena aplica zoom S a su cámara: así los gráficos
// vectoriales y el texto salen nítidos en pantallas de alta densidad sin que
// ningún código de juego tenga que pensar en píxeles reales.

export const W = 540;
export const H = 960;
export const S = 2;

export const FONT = `ui-rounded, 'Trebuchet MS', system-ui, -apple-system, sans-serif`;
export const MONO = `ui-monospace, Menlo, Consolas, monospace`;

export const CHAR_IDS = ['don', 'capibara', 'modo-dios', 'glitchman', 'heroe'] as const;
export type CharId = (typeof CHAR_IDS)[number];

export const ENDING_IDS = ['retenido', 'baja', 'turno'] as const;
export type EndingId = (typeof ENDING_IDS)[number];

export const SAVE_VERSION = 1;

// Velocidades en unidades de diseño por segundo.
export const WALK_SPEED = 150;
export const RUN_SPEED = 270;
export const PLAYER_RADIUS = 16;
