// Imágenes cargadas por BootScene que las piezas de personaje pueden dibujar
// en sus texturas. Si a un personaje le falta alguna, BootScene lo deja con su
// dibujo de respaldo hecho por código (PARTS.<id>Drawn).
export const loadedImages = new Map<string, CanvasImageSource>();

/**
 * Piezas recortadas de las hojas de referencia con scripts/make-*-sprite.mjs.
 * Agregar un personaje ilustrado = agregar su carpeta aquí y su corte en scripts/.
 */
export const IMAGE_SETS = {
  glitchman: {
    head: '/juego/glitchman/head.webp',
    headReact: '/juego/glitchman/head-react.webp',
    torso: '/juego/glitchman/torso.webp',
    legs: '/juego/glitchman/legs.webp',
  },
  don: {
    head: '/juego/don/head.webp',
    headReact: '/juego/don/head-react.webp',
    torso: '/juego/don/torso.webp',
    legs: '/juego/don/legs.webp',
    pose: '/juego/don/pose.webp',
  },
} as const;
