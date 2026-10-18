import Phaser from 'phaser';
import { S } from './core/config';
import { computeStageSize } from './core/viewport';
import { audio } from './core/audio';
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

if (import.meta.env.DEV) Object.assign(window, { __game: game, __audio: audio });
