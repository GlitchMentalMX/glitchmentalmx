import Phaser from 'phaser';
import { H, W } from '../core/config';
import { audio } from '../core/audio';
import { txt, viewRect } from '../core/gfx';

export const HOWTO_LINES = [
  'Tu objetivo: cancelar la suscripción y salir de la sala. Suena fácil. Cada decisión tiene consecuencias.',
  'Toca el suelo para caminar. Toca dos veces para correr. (En computadora: clic, y Mayús + clic para correr.)',
  'Toca los puntos blancos para hablar con personajes y usar puertas y objetos.',
  'Elige tus respuestas con las opciones. Cada decisión cambia el final.',
  'Arriba a la izquierda está tu inventario: toca un objeto para verlo o usarlo.',
  'Cada personaje tiene secretos propios: rejuega con otro y descúbrelos.',
  'Tu progreso se guarda solo.',
  'Es solo un juego: aquí no hay suscripciones, cobros ni datos reales.',
];

/**
 * Tarjeta "Cómo jugar" con fondo oscuro que bloquea los toques. Se dibuja
 * dentro de `layer` (un contenedor vacío de la escena que la llama) y llama a
 * `onClose` al cerrarse. `markUi` evita que el toque llegue al mundo.
 */
export function showHowTo(scene: Phaser.Scene, layer: Phaser.GameObjects.Container, onClose: () => void, markUi?: (p: Phaser.Input.Pointer) => void): void {
  layer.removeAll(true).setVisible(true);
  const v = viewRect(scene);
  const dim = scene.add.rectangle(W / 2, H / 2, v.w + 4, v.h + 4, 0x000000, 0.78).setInteractive();
  dim.on('pointerdown', (p: Phaser.Input.Pointer) => markUi?.(p));
  const body = txt(scene, W / 2, 0, HOWTO_LINES.map((l) => `•  ${l}`).join('\n\n'), 18, '#f6f3ec', { wordWrap: { width: 410 }, lineSpacing: 3 }).setOrigin(0.5, 0);
  const cardH = body.height + 178;
  const top = H / 2 - cardH / 2;
  body.setY(top + 76);
  const g = scene.add.graphics();
  g.fillStyle(0x14121c, 0.98).fillRoundedRect(W / 2 - 230, top, 460, cardH, 22);
  g.lineStyle(3, 0xf6f3ec, 1).strokeRoundedRect(W / 2 - 230, top, 460, cardH, 22);
  const title = txt(scene, W / 2, top + 36, 'Cómo jugar', 28, '#ffd23f', { fontStyle: 'bold' }).setOrigin(0.5);
  const by = top + cardH - 42;
  const bg = scene.add.graphics();
  const draw = (hot: boolean) => {
    bg.clear();
    bg.fillStyle(hot ? 0xfff3b0 : 0xf6f3ec, 1).fillRoundedRect(W / 2 - 110, by - 24, 220, 48, 16);
    bg.lineStyle(3, 0x111111, 1).strokeRoundedRect(W / 2 - 110, by - 24, 220, 48, 16);
  };
  draw(false);
  const label = txt(scene, W / 2, by, 'Entendido', 18, '#111111', { fontStyle: 'bold' }).setOrigin(0.5);
  const hit = scene.add.zone(W / 2, by, 220, 48).setInteractive({ useHandCursor: true });
  hit.on('pointerover', () => draw(true));
  hit.on('pointerout', () => draw(false));
  hit.on('pointerdown', (p: Phaser.Input.Pointer) => {
    markUi?.(p);
    audio.play('select');
    layer.removeAll(true);
    onClose();
  });
  layer.add([dim, g, title, body, bg, label, hit]);
}
