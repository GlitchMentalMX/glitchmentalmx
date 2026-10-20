// Imágenes cargadas por BootScene que las piezas de personaje pueden dibujar
// en sus texturas. Si a un personaje le falta alguna, BootScene lo deja con su
// dibujo de respaldo hecho por código (PARTS.<id>Drawn).
export const loadedImages = new Map<string, CanvasImageSource>();

/**
 * Piezas recortadas de las hojas de referencia con scripts/make-*-sprite.mjs.
 * Agregar un personaje ilustrado = agregar su carpeta aquí y su corte en scripts/.
 */
export const IMAGE_SETS = {
  /** Objetos ilustrados de la sala (scripts/make-sala-props.mjs). */
  sala: {
    botOk: '/juego/sala/bot-ok.webp',
    botHappy: '/juego/sala/bot-happy.webp',
    botHmm: '/juego/sala/bot-hmm.webp',
    botFrozen: '/juego/sala/bot-frozen.webp',
    vending: '/juego/sala/cookie-matic.webp',
    printer: '/juego/sala/fax.webp',
    plant: '/juego/sala/planta.webp',
    door: '/juego/sala/puerta-cancelar.webp',
    // Segunda tanda (scripts/make-sala-props-2.mjs)
    desk: '/juego/sala/mostrador.webp',
    display: '/juego/sala/pantalla-turnos.webp',
    chairs: '/juego/sala/sillas.webp',
    frame: '/juego/sala/marco-suscribete.webp',
    glass: '/juego/sala/cristal.webp',
    itemCookie: '/juego/sala/item-galleta.webp',
    itemHoja: '/juego/sala/item-hoja.webp',
    itemPostit: '/juego/sala/item-postit.webp',
  },
  glitchman: {
    head: '/juego/glitchman/head.webp',
    headReact: '/juego/glitchman/head-react.webp',
    torso: '/juego/glitchman/torso.webp',
    legs: '/juego/glitchman/legs.webp',
  },
  capibara: {
    head: '/juego/capibara/head.webp',
    eyeReact: '/juego/capibara/eye-react.webp',
    body: '/juego/capibara/body.webp',
    legsBack: '/juego/capibara/legs-back.webp',
    legsFront: '/juego/capibara/legs-front.webp',
    pose: '/juego/capibara/pose.webp',
  },
  'modo-dios': {
    head: '/juego/modo-dios/head.webp',
    headReact: '/juego/modo-dios/head-react.webp',
    torso: '/juego/modo-dios/torso.webp',
    legs: '/juego/modo-dios/legs.webp',
    pose: '/juego/modo-dios/pose.webp',
  },
  heroe: {
    head: '/juego/heroe/head.webp',
    headReact: '/juego/heroe/head-react.webp',
    torso: '/juego/heroe/torso.webp',
    legLeft: '/juego/heroe/leg-left.webp',
    legRight: '/juego/heroe/leg-right.webp',
    pose: '/juego/heroe/pose.webp',
  },
  don: {
    head: '/juego/don/head.webp',
    headReact: '/juego/don/head-react.webp',
    torso: '/juego/don/torso.webp',
    legs: '/juego/don/legs.webp',
    pose: '/juego/don/pose.webp',
  },
} as const;
