import Phaser from 'phaser';
import { txt } from '../core/gfx';

/**
 * Globo de texto que crece hacia arriba desde su origen (la punta de la cola).
 * Lo comparten los personajes, el chatbot y la sombra.
 */
export function makeBubble(scene: Phaser.Scene, x: number, y: number, text: string): Phaser.GameObjects.Container {
  const c = scene.add.container(x, y).setDepth(5000);
  const t = txt(scene, 0, -15, text, 15, '#111111', { fontStyle: 'bold', align: 'center', wordWrap: { width: 170 } }).setOrigin(0.5, 1);
  const pw = Math.max(34, t.width + 22);
  const ph = t.height + 14;
  const g = scene.add.graphics();
  g.fillStyle(0xffffff, 1);
  g.lineStyle(2.5, 0x111111, 1);
  g.fillRoundedRect(-pw / 2, -ph - 8, pw, ph, 10);
  g.strokeRoundedRect(-pw / 2, -ph - 8, pw, ph, 10);
  g.fillTriangle(-6, -8, 6, -8, 0, 3);
  c.add([g, t]);
  c.setScale(0);
  scene.tweens.add({ targets: c, scale: 1, duration: 140, ease: 'Back.easeOut' });
  return c;
}

export function dismissBubble(scene: Phaser.Scene, c: Phaser.GameObjects.Container): void {
  scene.tweens.add({ targets: c, alpha: 0, duration: 200, onComplete: () => c.destroy() });
}
