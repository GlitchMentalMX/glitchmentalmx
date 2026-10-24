import Phaser from 'phaser';
import { S } from './core/config';
import { computeStageSize } from './core/viewport';
import { audio } from './core/audio';
import { state } from './core/state';
import { BootScene } from './scenes/BootScene';
import { EndingScene } from './scenes/EndingScene';
import { SelectScene } from './scenes/SelectScene';
import { UIScene } from './scenes/UIScene';
import { WorldScene } from './scenes/WorldScene';

// Punto de entrada del juego. Se carga solo desde /juego/ (ver
// src/pages/juego/index.astro), así que Phaser nunca llega al resto del sitio.

const host = document.getElementById('game') as HTMLElement;
const size = computeStageSize(host);

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b0b10',
  // Canvas de S veces el mundo visible (540x960 más el decorado que haga falta
  // para llenar la pantalla): nítido en pantallas de alta densidad. FIT lo
  // escala sin deformar; como el aspecto ya coincide con la pantalla, la llena.
  width: size.w * S,
  height: size.h * S,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  transparent: false,
  input: { activePointers: 2 },
  render: { antialias: true, powerPreference: 'low-power' },
  disableContextMenu: true,
  scene: [BootScene, SelectScene, WorldScene, UIScene, EndingScene],
});

// Si cambia el aspecto (girar el teléfono, barra de Safari que se esconde,
// redimensionar la ventana) se reajusta el tamaño del mundo para seguir llenando.
let lastW = size.w;
let lastH = size.h;
const refit = () => {
  const s = computeStageSize(host);
  if (s.w !== lastW || s.h !== lastH) {
    lastW = s.w;
    lastH = s.h;
    game.scale.setGameSize(s.w * S, s.h * S);
  }
  game.scale.refresh();
};
// iOS Safari esconde y muestra su barra al hacer scroll/girar: visualViewport avisa de esos cambios.
const onResize = () => {
  refit();
  setTimeout(refit, 200);
};
window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', () => setTimeout(onResize, 250));
window.visualViewport?.addEventListener('resize', onResize);

// Teléfonos y tabletas en horizontal: la página muestra "Gira tu teléfono"
// (mismo criterio que el CSS de #rotate) y el juego se pausa, con su audio.
const landscapeTouch = window.matchMedia('(hover: none) and (pointer: coarse) and (orientation: landscape)');
const applyOrientation = () => {
  // Pestaña en segundo plano (o teléfono bloqueado): el audio se pausa SIEMPRE y
  // nada lo reanuda hasta que la pestaña vuelva a estar a la vista.
  if (document.hidden) {
    audio.suspend();
    return;
  }
  if (landscapeTouch.matches) {
    if (game.loop.running) game.loop.sleep();
    audio.suspend();
  } else {
    if (!game.loop.running) {
      game.loop.wake();
      onResize();
    }
    audio.resume();
  }
};
landscapeTouch.addEventListener('change', applyOrientation);
document.addEventListener('visibilitychange', applyOrientation);
window.addEventListener('pagehide', () => audio.suspend());
// El arranque de Phaser es asíncrono y recupera su bucle al volver el foco de
// la pestaña: en vez de depender de esos eventos, se revisa cada medio segundo.
window.setInterval(applyOrientation, 500);
applyOrientation();

// Audio: la música se descarga y decodifica antes del primer toque, y el primer gesto
// válido la arranca. Los navegadores aceptan gestos distintos (iOS/Safari solo "suelta"
// el audio en touchend o click), así que se escuchan todos hasta que el contexto suena.
window.setTimeout(() => audio.preload(), 600);
const GESTURES = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const;
const unlockAudio = () => {
  audio.unlock();
  if (audio.running) GESTURES.forEach((g) => window.removeEventListener(g, unlockAudio, true));
};
GESTURES.forEach((g) => window.addEventListener(g, unlockAudio, true));

if (import.meta.env.DEV) Object.assign(window, { __game: game, __audio: audio, __state: state });
