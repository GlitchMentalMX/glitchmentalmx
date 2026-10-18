import Phaser from 'phaser';
import { txt, viewRect } from '../core/gfx';

/** Cuánto debe durar un globo para poder leerse con calma. */
export const bubbleMs = (text: string): number => Math.max(2600, 1700 + text.length * 62);

/**
 * Globo de texto que crece hacia arriba desde su origen. Lo comparten los
 * personajes, el chatbot y la sombra. La cola se dibuja aparte para poder
 * moverla cuando el globo se desplaza a un lado y no se sale de la pantalla.
 */
export function makeBubble(scene: Phaser.Scene, x: number, y: number, text: string): Phaser.GameObjects.Container {
  const c = scene.add.container(x, y).setDepth(5000);
  const t = txt(scene, 0, -15, text, 17, '#111111', { fontStyle: 'bold', align: 'center', wordWrap: { width: 190 } }).setOrigin(0.5, 1);
  const pw = Math.max(34, t.width + 22);
  const ph = t.height + 14;
  const g = scene.add.graphics();
  g.fillStyle(0xffffff, 1);
  g.lineStyle(2.5, 0x111111, 1);
  g.fillRoundedRect(-pw / 2, -ph - 8, pw, ph, 10);
  g.strokeRoundedRect(-pw / 2, -ph - 8, pw, ph, 10);
  const tail = scene.add.graphics();
  tail.fillStyle(0xffffff, 1);
  tail.fillTriangle(-6, -9, 6, -9, 0, 3);
  tail.lineStyle(2.5, 0x111111, 1);
  tail.beginPath();
  tail.moveTo(-6, -8);
  tail.lineTo(0, 3);
  tail.lineTo(6, -8);
  tail.strokePath();
  c.add([g, tail, t]);
  c.setData('hw', pw / 2);
  c.setData('tail', tail);
  c.setScale(0);
  scene.tweens.add({ targets: c, scale: 1, duration: 140, ease: 'Back.easeOut' });
  return c;
}

/**
 * Coloca el globo sobre (ax, ay) sin dejar que se salga de la pantalla: el
 * globo se corre hacia dentro y la cola sigue apuntando al personaje.
 */
export function placeBubble(scene: Phaser.Scene, c: Phaser.GameObjects.Container, ax: number, ay: number): void {
  const v = viewRect(scene);
  const hw = (c.getData('hw') as number) ?? 40;
  const m = 8;
  const x = Math.min(v.x1 - hw - m, Math.max(v.x0 + hw + m, ax));
  c.setPosition(x, ay);
  const tail = c.getData('tail') as Phaser.GameObjects.Graphics | undefined;
  tail?.setX(Math.max(-hw + 14, Math.min(hw - 14, ax - x)));
}

export function dismissBubble(scene: Phaser.Scene, c: Phaser.GameObjects.Container): void {
  scene.tweens.add({ targets: c, alpha: 0, duration: 200, onComplete: () => c.destroy() });
}
