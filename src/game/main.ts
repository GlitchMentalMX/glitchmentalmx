import Phaser from 'phaser';
import { H, S, W } from './core/config';
import { audio } from './core/audio';
import { BootScene } from './scenes/BootScene';
import { EndingScene } from './scenes/EndingScene';
import { SelectScene } from './scenes/SelectScene';
import { UIScene } from './scenes/UIScene';
import { WorldScene } from './scenes/WorldScene';

// Punto de entrada del juego. Se carga solo desde /juego/ (ver
// src/pages/juego/index.astro), así que Phaser nunca llega al resto del sitio.

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b0b10',
  // Canvas de S veces el escenario de diseño (540x960): nítido en pantallas
  // de alta densidad. FIT lo escala sin deformar y lo centra: en horizontal
  // quedan barras laterales (el fondo de la página las decora).
  width: W * S,
  height: H * S,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  transparent: false,
  input: { activePointers: 2 },
  render: { antialias: true, powerPreference: 'low-power' },
  disableContextMenu: true,
  scene: [BootScene, SelectScene, WorldScene, UIScene, EndingScene],
});

if (import.meta.env.DEV) Object.assign(window, { __game: game, __audio: audio });
