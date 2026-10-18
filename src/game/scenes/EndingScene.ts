import Phaser from 'phaser';
import { ENDING_IDS, H, W, type EndingId } from '../core/config';
import { audio } from '../core/audio';
import { fitCamera, hexNum, txt, viewRect } from '../core/gfx';
import { state } from '../core/state';
import { CHARACTERS } from '../data/characters';
import { ENDINGS } from '../data/endings';
import { Actor } from '../engine/Actor';

/**
 * Desenlace: el título del final y una línea por cada decisión que tomaste.
 * Los textos salen de data/endings.ts; esta escena solo los presenta.
 */
export class EndingScene extends Phaser.Scene {
  private actor!: Actor;
  private endingId: EndingId = 'retenido';

  constructor() {
    super('Ending');
  }

  init(data: { id: EndingId }): void {
    this.endingId = data.id ?? 'retenido';
  }

  create(): void {
    fitCamera(this);
    const def = ENDINGS[this.endingId];
    const dark = this.endingId === 'retenido';
    const fg = dark ? '#f6f3ec' : '#14161c';
    this.cameras.main.setBackgroundColor(def.bg);
    this.cameras.main.fadeIn(700, 255, 255, 255);

    const v0 = viewRect(this);
    for (let i = 0; i < 24; i++) {
      const r = this.add.rectangle(v0.x0 + Math.random() * v0.w, v0.y0 + Math.random() * v0.h, 20 + Math.random() * 80, 6 + Math.random() * 16, hexNum(def.accent), 0.12).setDepth(-5);
      this.tweens.add({ targets: r, y: r.y + 60, alpha: 0.02, duration: 3000 + Math.random() * 3000, yoyo: true, repeat: -1 });
    }

    const char = CHARACTERS[state.characterId ?? 'don'];
    txt(this, W / 2, 96, def.title, 34, def.accent, { fontStyle: 'bold', align: 'center', wordWrap: { width: W - 60 } }).setOrigin(0.5).setStroke(dark ? '#000000' : '#ffffff', 5);

    txt(this, W / 2, 158, def.verdict, 20, fg, { fontStyle: 'bold', align: 'center', wordWrap: { width: W - 60 } }).setOrigin(0.5);
    this.actor = new Actor(this, W / 2, 352, char, { scale: 1.3, shadow: !state.is('sombraFuera') });
    if (this.endingId === 'baja') {
      this.actor.mode = 'run';
      this.tweens.add({ targets: this.actor, x: W / 2 + 14, duration: 900, yoyo: true, repeat: -1 });
    } else {
      this.time.delayedCall(500, () => this.actor.react('happy'));
      this.add.text(W / 2, 372, 'PREMIUM™', { fontFamily: 'system-ui', fontSize: '22px', color: '#2a1650', backgroundColor: '#ffd23f', padding: { x: 14, y: 6 }, resolution: 2 }).setOrigin(0.5).setAngle(-6);
    }

    // Las consecuencias aparecen una a una.
    const lines = [...def.lines(), def.closing];
    const body = txt(this, W / 2, 404, '', 17, fg, { align: 'center', wordWrap: { width: W - 70 }, lineSpacing: 7 }).setOrigin(0.5, 0);
    let shown = 0;
    const showNext = () => {
      if (shown >= lines.length) {
        this.buildButtons();
        return;
      }
      shown += 1;
      body.setText(lines.slice(0, shown).join('\n'));
      // Si hay muchas consecuencias, el texto se achica para no pisar los botones.
      body.setFontSize(17);
      while (body.height > H - 136 - 34 - 404 - 6 && parseInt(String(body.style.fontSize), 10) > 13) {
        body.setFontSize(parseInt(String(body.style.fontSize), 10) - 1);
      }
      audio.play('tap');
      this.time.delayedCall(shown >= lines.length ? 500 : 1700, showNext);
    };
    this.time.delayedCall(1100, showNext);
  }

  private buildButtons(): void {
    const mk = (y: number, label: string, fill: number, onTap: () => void) => {
      const g = this.add.graphics();
      g.fillStyle(fill, 1).fillRoundedRect(W / 2 - 190, y - 29, 380, 58, 18);
      g.lineStyle(3, 0x111111, 1).strokeRoundedRect(W / 2 - 190, y - 29, 380, 58, 18);
      txt(this, W / 2, y, label, 18, '#111111', { fontStyle: 'bold' }).setOrigin(0.5);
      const z = this.add.zone(W / 2, y, 380, 58).setInteractive({ useHandCursor: true });
      z.on('pointerdown', () => {
        audio.play('select');
        onTap();
      });
    };
    const found = state.meta.endings.filter((e) => ENDING_IDS.includes(e)).length;
    mk(H - 136, 'Jugar de nuevo con el mismo personaje', hexNum(ENDINGS[this.endingId].accent), () => {
      if (state.characterId) state.newGame(state.characterId);
      this.scene.start('World');
    });
    mk(H - 70, 'Elegir otro personaje', 0xf6f3ec, () => this.scene.start('Select'));
    txt(this, W / 2, H - 30, `Finales descubiertos: ${found} de ${ENDING_IDS.length}`, 13, this.endingId === 'baja' ? '#445' : '#c9c5d4').setOrigin(0.5);
  }

  update(_t: number, delta: number): void {
    const dt = Math.min(delta / 1000, 0.05);
    this.actor.tick(dt);
  }
}
