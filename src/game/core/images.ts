// Imágenes cargadas por BootScene que las piezas de personaje pueden dibujar
// en sus texturas. Si alguna falta, BootScene deja al personaje con su dibujo
// de respaldo hecho por código.
export const loadedImages = new Map<string, CanvasImageSource>();

/** Piezas de Glitchman recortadas de la hoja de referencia (scripts/make-glitchman-sprite.mjs). */
export const GLITCHMAN_PIECES = {
  head: '/juego/glitchman/head.webp',
  headReact: '/juego/glitchman/head-react.webp',
  torso: '/juego/glitchman/torso.webp',
  legs: '/juego/glitchman/legs.webp',
} as const;
