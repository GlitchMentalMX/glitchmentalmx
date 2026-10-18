import Phaser from 'phaser';
import { CHAR_IDS, ENDING_IDS, H, W, type CharId } from '../core/config';
import { audio } from '../core/audio';
import { fitCamera, hexNum, txt } from '../core/gfx';
import { state } from '../core/state';
import { CHARACTERS } from '../data/characters';
import { Actor } from '../engine/Actor';

const CARD_W = 92;
const CARD_H = 124;
const CARD_GAP = 8;
const CARD_Y = 626;

/**
 * Pantalla de selección: cinco personajes con el mismo sistema de movimiento,
 * distinto arte, animación y reacción. Funciona con toque, ratón y teclado.
 */
export class SelectScene extends Phaser.Scene {
  private index = 0;
  private preview!: Actor;
  private cards: { actor: Actor; frame: Phaser.GameObjects.Graphics; id: CharId; x: number }[] = [];
  private halo!: Phaser.GameObjects.Graphics;
  private nameT!: Phaser.GameObjects.Text;
  private titleT!: Phaser.GameObjects.Text;
  private styleT!: Phaser.GameObjects.Text;
  private introT!: Phaser.GameObjects.Text;
  private introG!: Phaser.GameObjects.Graphics;
  private playBtn!: Phaser.GameObjects.Container;
  private playLabel!: Phaser.GameObjects.Text;
  private bits: { r: Phaser.GameObjects.Rectangle; vy: number }[] = [];
  private leaving = false;

  constructor() {
    super('Select');
  }

  create(): void {
    this.leaving = false;
    this.cards = [];
    this.bits = [];
    fitCamera(this);
    this.cameras.main.setBackgroundColor('#0b0b10');
    this.cameras.main.fadeIn(300, 0, 0, 0);

    // fondo con fragmentos que se mueven despacio (collage glitch)
    const cols = [0xff2e93, 0x00e5ff, 0xffd23f, 0x7a2cf0];
    for (let i = 0; i < 16; i++) {
      const r = this.add.rectangle(Math.random() * W, Math.random() * H, 20 + Math.random() * 60, 6 + Math.random() * 18, cols[i % 4], 0.1 + Math.random() * 0.12).setDepth(-5);
      this.bits.push({ r, vy: 4 + Math.random() * 14 });
    }

    const saved = state.savedCharacter();
    this.index = Math.max(0, CHAR_IDS.indexOf(saved ?? state.meta.lastCharacter ?? 'don'));

    txt(this, W / 2, 34, 'título provisional', 12, '#ffffff', { fontStyle: 'italic' }).setOrigin(0.5).setAlpha(0.4);
    txt(this, W / 2, 84, 'ELIGE QUIÉN ERES', 38, '#f6f3ec', { fontStyle: 'bold' }).setOrigin(0.5);
    txt(this, W / 2, 126, 'Todos ven el mismo mundo. Ninguno lo ve igual.', 15, '#c9c5d4').setOrigin(0.5);

    this.halo = this.add.graphics();
    this.nameT = txt(this, W / 2, 468, '', 32, '#ffffff', { fontStyle: 'bold' }).setOrigin(0.5);
    this.titleT = txt(this, W / 2, 502, '', 17, '#c9c5d4').setOrigin(0.5);
    this.styleT = txt(this, W / 2, 526, '', 12, '#8d89a0', { fontStyle: 'italic' }).setOrigin(0.5);
    this.introG = this.add.graphics();
    this.introT = txt(this, W / 2, 576, '', 18, '#f6f3ec', { align: 'center', wordWrap: { width: 440 }, fontStyle: 'bold' }).setOrigin(0.5);

    this.buildCards();
    this.buildButtons();
    this.buildTopButtons();

    txt(this, W / 2, H - 22, `Finales descubiertos: ${state.meta.endings.filter((e) => ENDING_IDS.includes(e)).length} de ${ENDING_IDS.length}`, 13, '#8d89a0').setOrigin(0.5);

    this.focus(this.index, false);

    this.input.keyboard?.on('keydown-LEFT', () => this.focus((this.index + 4) % 5));
    this.input.keyboard?.on('keydown-RIGHT', () => this.focus((this.index + 1) % 5));
    this.input.keyboard?.on('keydown-ENTER', () => this.play());
    this.input.on('pointerdown', () => audio.unlock());
  }

  private buildCards(): void {
    const total = 5 * CARD_W + 4 * CARD_GAP;
    const x0 = (W - total) / 2;
    CHAR_IDS.forEach((id, i) => {
      const x = x0 + i * (CARD_W + CARD_GAP);
      const def = CHARACTERS[id];
      const frame = this.add.graphics();
      const actor = new Actor(this, x + CARD_W / 2, CARD_Y + CARD_H - 30, def, { scale: 0.56 });
      const hit = this.add.zone(x + CARD_W / 2, CARD_Y + CARD_H / 2, CARD_W, CARD_H).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => {
        audio.unlock();
        this.focus(i);
      });
      this.cards.push({ actor, frame, id, x });
    });
  }

  private drawCards(): void {
    this.cards.forEach((c, i) => {
      const sel = i === this.index;
      const col = hexNum(CHARACTERS[c.id].accent);
      c.frame.clear();
      c.frame.fillStyle(sel ? col : 0x1a1826, sel ? 0.28 : 1).fillRoundedRect(c.x, CARD_Y, CARD_W, CARD_H, 16);
      c.frame.lineStyle(sel ? 4 : 2, sel ? col : 0x3a3750, 1).strokeRoundedRect(c.x, CARD_Y, CARD_W, CARD_H, 16);
      c.actor.setAlpha(sel ? 1 : 0.72);
    });
  }

  private focus(i: number, animate = true): void {
    this.index = i;
    const def = CHARACTERS[CHAR_IDS[i]];
    const col = hexNum(def.accent);
    this.preview?.destroy();
    this.preview = new Actor(this, W / 2, 430, def, { scale: 1.9 });
    this.preview.setDepth(5);
    if (animate) {
      audio.play('select');
      this.preview.setScale(1.6);
      this.tweens.add({ targets: this.preview, scale: 1.9, duration: 220, ease: 'Back.easeOut' });
      this.time.delayedCall(260, () => this.preview.signature());
    }
    this.halo.clear();
    this.halo.fillStyle(col, 0.16).fillCircle(W / 2, 330, 150);
    this.halo.lineStyle(3, col, 0.5).strokeCircle(W / 2, 330, 150);
    this.nameT.setText(def.name).setColor(def.accent);
    this.titleT.setText(def.title);
    this.styleT.setText(def.style);
    this.introT.setText(`“${def.intro}”`);
    this.introG.clear();
    const h = this.introT.height + 26;
    this.introG.fillStyle(0x14121c, 0.9).fillRoundedRect(40, 576 - h / 2, W - 80, h, 18);
    this.introG.lineStyle(2.5, col, 0.9).strokeRoundedRect(40, 576 - h / 2, W - 80, h, 18);
    this.playLabel?.setColor('#111111');
    this.drawCards();
    this.preview.setInteractive(new Phaser.Geom.Rectangle(-60, -120, 120, 130), Phaser.Geom.Rectangle.Contains);
    this.preview.on('pointerdown', () => this.preview.signature());
    this.refreshPlay();
  }

  private makeButton(x: number, y: number, w: number, h: number, label: string, fill: number, color: string, onTap: () => void): { c: Phaser.GameObjects.Container; t: Phaser.GameObjects.Text } {
    const c = this.add.container(x, y);
    const g = this.add.graphics();
    g.fillStyle(fill, 1).fillRoundedRect(-w / 2, -h / 2, w, h, 18);
    g.lineStyle(3, 0x111111, 1).strokeRoundedRect(-w / 2, -h / 2, w, h, 18);
    const t = txt(this, 0, 0, label, 20, color, { fontStyle: 'bold' }).setOrigin(0.5);
    const hit = this.add.zone(0, 0, w, h).setInteractive({ useHandCursor: true });
    hit.on('pointerdown', () => {
      audio.unlock();
      onTap();
    });
    c.add([g, t, hit]);
    return { c, t };
  }

  private buildButtons(): void {
    const hasSave = state.hasSave();
    if (hasSave) {
      const who = CHARACTERS[state.savedCharacter() ?? 'don'].name;
      this.makeButton(W / 2, 800, 380, 56, `Continuar partida (${who})`, 0xf6f3ec, '#111111', () => this.continueGame());
    }
    const b = this.makeButton(W / 2, hasSave ? 868 : 836, 380, 62, 'JUGAR', hexNum(CHARACTERS[CHAR_IDS[this.index]].accent), '#111111', () => this.play());
    this.playBtn = b.c;
    this.playLabel = b.t;
    if (hasSave) txt(this, W / 2, 906, 'Una partida nueva reemplaza la guardada', 12, '#8d89a0').setOrigin(0.5);
  }

  private refreshPlay(): void {
    if (!this.playBtn) return;
    const g = this.playBtn.list[0] as Phaser.GameObjects.Graphics;
    const w = 380;
    const h = 62;
    g.clear();
    g.fillStyle(hexNum(CHARACTERS[CHAR_IDS[this.index]].accent), 1).fillRoundedRect(-w / 2, -h / 2, w, h, 18);
    g.lineStyle(3, 0x111111, 1).strokeRoundedRect(-w / 2, -h / 2, w, h, 18);
    this.playLabel.setText(state.hasSave() ? 'NUEVA PARTIDA' : 'JUGAR');
  }

  private buildTopButtons(): void {
    const back = txt(this, 18, 20, '← Salir al sitio', 14, '#c9c5d4', { backgroundColor: '#14121c', padding: { x: 10, y: 6 } }).setInteractive({ useHandCursor: true });
    back.on('pointerdown', () => {
      window.location.href = '/';
    });
    const snd = txt(this, W - 18, 20, audio.muted ? 'Sonido: no' : 'Sonido: sí', 14, '#c9c5d4', { backgroundColor: '#14121c', padding: { x: 10, y: 6 } }).setOrigin(1, 0).setInteractive({ useHandCursor: true });
    snd.on('pointerdown', () => {
      audio.unlock();
      audio.setMuted(!audio.muted);
      snd.setText(audio.muted ? 'Sonido: no' : 'Sonido: sí');
      audio.play('tap');
    });
  }

  private go(): void {
    if (this.leaving) return;
    this.leaving = true;
    audio.play('win');
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('World'));
    this.cameras.main.fadeOut(350, 0, 0, 0);
  }

  private play(): void {
    audio.unlock();
    state.newGame(CHAR_IDS[this.index]);
    this.go();
  }

  private continueGame(): void {
    audio.unlock();
    if (!state.continueGame()) return;
    this.go();
  }

  update(_t: number, delta: number): void {
    const dt = Math.min(delta / 1000, 0.05);
    this.preview.tick(dt);
    for (const c of this.cards) c.actor.tick(dt);
    for (const b of this.bits) {
      b.r.y += b.vy * dt;
      if (b.r.y > H + 20) b.r.y = -20;
    }
  }
}
