import Phaser from 'phaser';
import { H, W } from '../core/config';
import { audio } from '../core/audio';
import { fitCamera, img, makeTex, txt, viewRect } from '../core/gfx';
import { state } from '../core/state';
import { ITEMS } from '../data/items';
import { showHowTo } from '../engine/howto';

export interface Speaker {
  name: string;
  color: string;
}

const PANEL_X = 20;
const PANEL_W = W - 40;
const BTN_H = 52;
const BTN_GAP = 9;

/**
 * Capa de interfaz: diálogos, opciones, inventario, avisos y menú. Corre en
 * paralelo a la escena del mundo y se comunica solo por promesas (say, ask)
 * y eventos ('item', 'menu'), de modo que los guiones se escriben como código
 * lineal con await.
 */
export class UIScene extends Phaser.Scene {
  ready = false;
  /** Hay un diálogo, una pregunta o el menú abiertos: el mundo no debe reaccionar. */
  get blocking(): boolean {
    return this.dialogueOpen || this.menuOpen;
  }

  private dialogueOpen = false;
  private menuOpen = false;
  private panel!: Phaser.GameObjects.Container;
  private panelG!: Phaser.GameObjects.Graphics;
  private nameTag!: Phaser.GameObjects.Graphics;
  private nameText!: Phaser.GameObjects.Text;
  private body!: Phaser.GameObjects.Text;
  private arrow!: Phaser.GameObjects.Text;
  private tapZone!: Phaser.GameObjects.Zone;
  private choiceLayer!: Phaser.GameObjects.Container;
  private hud!: Phaser.GameObjects.Container;
  private hudLeft!: Phaser.GameObjects.Container;
  private hudRight!: Phaser.GameObjects.Container;
  private invLayer!: Phaser.GameObjects.Container;
  private toastC!: Phaser.GameObjects.Container;
  private hint?: Phaser.GameObjects.Text;
  private menuLayer!: Phaser.GameObjects.Container;
  private typing?: Phaser.Time.TimerEvent;
  private typingDone: (() => void) | null = null;
  private fullText = '';
  private advance: (() => void) | null = null;

  constructor() {
    super('UI');
  }

  create(): void {
    fitCamera(this);
    this.dialogueOpen = false;
    this.menuOpen = false;
    for (const it of Object.values(ITEMS)) makeTex(this, `item_${it.id}`, 40, 40, it.icon);

    // El HUD se ancla a los bordes REALES de la pantalla (no del escenario de
    // diseño), así sigue pegado arriba aunque el mundo se extienda.
    this.hud = this.add.container(0, 0).setDepth(10);
    this.hudLeft = this.add.container(0, 0);
    this.hudRight = this.add.container(0, 0);
    this.hud.add([this.hudLeft, this.hudRight]);
    this.invLayer = this.add.container(0, 0);
    this.hudLeft.add(this.invLayer);
    this.buildMenuButton();

    this.panel = this.add.container(0, 0).setDepth(50).setVisible(false);
    this.panelG = this.add.graphics();
    this.nameTag = this.add.graphics();
    this.nameText = txt(this, 0, 0, '', 15, '#111111', { fontStyle: 'bold' });
    this.body = txt(this, PANEL_X + 18, 0, '', 19, '#f6f3ec', { wordWrap: { width: PANEL_W - 54 }, lineSpacing: 4 });
    this.arrow = txt(this, W - 46, 0, '▼', 16, '#f6f3ec');
    this.panel.add([this.panelG, this.nameTag, this.nameText, this.body, this.arrow]);
    this.tweens.add({ targets: this.arrow, alpha: 0.2, duration: 450, yoyo: true, repeat: -1 });

    this.tapZone = this.add.zone(W / 2, H / 2, W, H).setInteractive().setDepth(40);
    this.tapZone.disableInteractive();
    this.tapZone.on('pointerdown', (p: Phaser.Input.Pointer) => {
      this.markUi(p);
      this.onTapAdvance();
    });

    this.choiceLayer = this.add.container(0, 0).setDepth(60);
    this.toastC = this.add.container(W / 2, this.view.y0 + 96).setDepth(70).setAlpha(0);
    this.menuLayer = this.add.container(0, 0).setDepth(90).setVisible(false);

    state.on('inventory', this.refreshInventory, this);
    this.events.once('shutdown', () => state.off('inventory', this.refreshInventory, this));
    this.refreshInventory();

    this.input.keyboard?.on('keydown-SPACE', () => this.onTapAdvance());
    this.input.keyboard?.on('keydown-ENTER', () => this.onTapAdvance());
    this.input.keyboard?.on('keydown-ESC', () => this.toggleMenu());

    this.layoutHud();
    this.scale.on('resize', this.layoutHud, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.layoutHud, this));

    this.ready = true;
    this.events.emit('ui-ready');
  }

  /** Bordes visibles de la pantalla en unidades de diseño. */
  private get view() {
    return viewRect(this);
  }

  private layoutHud(): void {
    const v = this.view;
    this.hudLeft.setPosition(v.x0, v.y0);
    this.hudRight.setPosition(v.x1 - W, v.y0);
    this.tapZone?.setSize(v.w + 4, v.h + 4);
    if (this.tapZone?.input) this.tapZone.input.hitArea.setTo(0, 0, v.w + 4, v.h + 4);
    this.toastC?.setY(v.y0 + 96);
  }

  /** Marca el evento nativo para que la escena del mundo ignore este toque. */
  markUi(p: Phaser.Input.Pointer): void {
    const ev = p.event as { __ui?: boolean } | undefined;
    if (ev) ev.__ui = true;
  }

  // ---------- Inventario ----------

  private refreshInventory(): void {
    this.invLayer.removeAll(true);
    state.inventory.forEach((id, i) => {
      const it = ITEMS[id];
      if (!it) return;
      const x = 16 + i * 58;
      const g = this.add.graphics();
      g.fillStyle(0x14121c, 0.82).fillRoundedRect(x, 14, 50, 50, 12);
      g.lineStyle(2, 0xf6f3ec, 0.9).strokeRoundedRect(x, 14, 50, 50, 12);
      const icon = img(this, x + 25, 39, `item_${id}`);
      const hit = this.add.zone(x + 25, 39, 54, 54).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', (p: Phaser.Input.Pointer) => {
        this.markUi(p);
        if (this.blocking) return;
        audio.play('tap');
        this.events.emit('item', id);
      });
      this.invLayer.add([g, icon, hit]);
    });
  }

  toast(msg: string): void {
    this.toastC.removeAll(true);
    const t = txt(this, 0, 0, msg, 16, '#111111', { fontStyle: 'bold' }).setOrigin(0.5);
    const g = this.add.graphics();
    g.fillStyle(0xfff3b0, 1).fillRoundedRect(-t.width / 2 - 16, -17, t.width + 32, 34, 17);
    g.lineStyle(2.5, 0x111111, 1).strokeRoundedRect(-t.width / 2 - 16, -17, t.width + 32, 34, 17);
    this.toastC.add([g, t]);
    this.tweens.killTweensOf(this.toastC);
    const ty = this.view.y0 + 96;
    this.toastC.setAlpha(0).setY(ty - 16);
    this.tweens.add({ targets: this.toastC, alpha: 1, y: ty, duration: 180 });
    this.tweens.add({ targets: this.toastC, alpha: 0, delay: 2300, duration: 300 });
  }

  showHint(msg: string, ms = 7000): void {
    this.hint?.destroy();
    this.hint = txt(this, W / 2, this.view.y1 - 34, msg, 15, '#f6f3ec', { backgroundColor: '#14121ccc', padding: { x: 12, y: 7 } }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets: this.hint, alpha: 0, delay: ms, duration: 600, onComplete: () => this.hint?.destroy() });
  }

  hideHint(): void {
    if (!this.hint) return;
    const h = this.hint;
    this.hint = undefined;
    this.tweens.add({ targets: h, alpha: 0, duration: 250, onComplete: () => h.destroy() });
  }

  // ---------- Diálogo ----------

  private layoutPanel(sp: Speaker, bottom: number): void {
    const textH = this.body.height;
    const h = Math.max(104, textH + 52);
    const top = bottom - h;
    this.panelG.clear();
    this.panelG.fillStyle(0x14121c, 0.95).fillRoundedRect(PANEL_X, top, PANEL_W, h, 18);
    this.panelG.lineStyle(3, Phaser.Display.Color.HexStringToColor(sp.color).color, 1).strokeRoundedRect(PANEL_X, top, PANEL_W, h, 18);
    this.nameText.setText(sp.name);
    const tw = this.nameText.width + 26;
    this.nameTag.clear();
    this.nameTag.fillStyle(Phaser.Display.Color.HexStringToColor(sp.color).color, 1).fillRoundedRect(PANEL_X + 14, top - 15, tw, 28, 14);
    this.nameTag.lineStyle(2.5, 0x111111, 1).strokeRoundedRect(PANEL_X + 14, top - 15, tw, 28, 14);
    this.nameText.setPosition(PANEL_X + 27, top - 10);
    this.body.setY(top + 26);
    this.arrow.setY(bottom - 28);
  }

  private typeText(text: string, done: () => void): void {
    this.fullText = text;
    this.body.setText('');
    this.typing?.remove();
    let i = 0;
    this.typingDone = done;
    this.typing = this.time.addEvent({
      delay: 20,
      loop: true,
      callback: () => {
        i += 1;
        this.body.setText(text.slice(0, i));
        if (i % 3 === 0) audio.play('type');
        if (i >= text.length) this.finishTyping();
      },
    });
  }

  private finishTyping(): void {
    this.typing?.remove();
    this.typing = undefined;
    this.body.setText(this.fullText);
    const d = this.typingDone;
    this.typingDone = null;
    d?.();
  }

  private onTapAdvance(): void {
    if (this.menuOpen) return;
    if (this.typing) {
      this.finishTyping();
      return;
    }
    const a = this.advance;
    if (a) {
      this.advance = null;
      audio.play('tap');
      a();
    }
  }

  private openDialogue(): void {
    this.dialogueOpen = true;
    this.hud.setAlpha(0.35);
    this.hideHint();
    this.tapZone.setInteractive();
  }

  private closeDialogue(): void {
    this.dialogueOpen = false;
    this.panel.setVisible(false);
    this.choiceLayer.removeAll(true);
    this.hud.setAlpha(1);
    this.tapZone.disableInteractive();
  }

  /** Muestra una línea y espera a que el jugador toque para continuar. */
  say(sp: Speaker, text: string, keepOpen = false): Promise<void> {
    return new Promise((resolve) => {
      this.openDialogue();
      this.choiceLayer.removeAll(true);
      this.body.setText(text);
      this.layoutPanel(sp, this.view.y1 - 24);
      this.panel.setVisible(true).setAlpha(1);
      this.arrow.setVisible(false);
      this.typeText(text, () => {
        this.arrow.setVisible(true);
        this.advance = () => {
          this.arrow.setVisible(false);
          if (!keepOpen) this.closeDialogue();
          resolve();
        };
      });
    });
  }

  /** Línea con opciones: devuelve el índice elegido. */
  ask(sp: Speaker, text: string, options: string[]): Promise<number> {
    return new Promise((resolve) => {
      this.openDialogue();
      this.choiceLayer.removeAll(true);
      const n = options.length;
      const stackTop = this.view.y1 - 24 - n * BTN_H - (n - 1) * BTN_GAP;
      this.body.setText(text);
      this.layoutPanel(sp, stackTop - 14);
      this.panel.setVisible(true);
      this.arrow.setVisible(false);
      this.tapZone.disableInteractive();
      const show = () => {
        this.typing?.remove();
        this.typing = undefined;
        this.body.setText(text);
        options.forEach((label, i) => {
          const y = stackTop + i * (BTN_H + BTN_GAP);
          const g = this.add.graphics();
          const draw = (hot: boolean) => {
            g.clear();
            g.fillStyle(hot ? 0xfff3b0 : 0xf6f3ec, 1).fillRoundedRect(PANEL_X, y, PANEL_W, BTN_H, 16);
            g.lineStyle(3, 0x111111, 1).strokeRoundedRect(PANEL_X, y, PANEL_W, BTN_H, 16);
          };
          draw(false);
          const t = txt(this, W / 2, y + BTN_H / 2, label, 17, '#111111', { fontStyle: 'bold', align: 'center', wordWrap: { width: PANEL_W - 30 } }).setOrigin(0.5);
          const hit = this.add.zone(W / 2, y + BTN_H / 2, PANEL_W, BTN_H).setInteractive({ useHandCursor: true });
          hit.on('pointerover', () => draw(true));
          hit.on('pointerout', () => draw(false));
          hit.on('pointerdown', (p: Phaser.Input.Pointer) => {
            this.markUi(p);
            audio.play('select');
            this.input.keyboard?.off('keydown', keyHandler);
            this.closeDialogue();
            resolve(i);
          });
          this.choiceLayer.add([g, t, hit]);
        });
        const keyHandler = (e: KeyboardEvent) => {
          const k = Number(e.key) - 1;
          if (k >= 0 && k < n) {
            this.input.keyboard?.off('keydown', keyHandler);
            audio.play('select');
            this.closeDialogue();
            resolve(k);
          }
        };
        this.input.keyboard?.on('keydown', keyHandler);
      };
      this.body.setText('');
      this.typeText(text, show);
    });
  }

  // ---------- Menú ----------

  private buildMenuButton(): void {
    const x = W - 66;
    const g = this.add.graphics();
    g.fillStyle(0x14121c, 0.82).fillRoundedRect(x, 14, 50, 50, 12);
    g.lineStyle(2, 0xf6f3ec, 0.9).strokeRoundedRect(x, 14, 50, 50, 12);
    g.fillStyle(0xf6f3ec, 1);
    for (const dy of [0, 10, 20]) g.fillRoundedRect(x + 13, 25 + dy, 24, 4, 2);
    const hit = this.add.zone(x + 25, 39, 54, 54).setInteractive({ useHandCursor: true });
    hit.on('pointerdown', (p: Phaser.Input.Pointer) => {
      this.markUi(p);
      if (!this.dialogueOpen) this.toggleMenu();
    });
    this.hudRight.add([g, hit]);
  }

  private toggleMenu(): void {
    if (this.dialogueOpen) return;
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }
    this.menuOpen = true;
    audio.play('tap');
    this.renderMenu();
  }

  private closeMenu(): void {
    this.menuOpen = false;
    this.menuLayer.setVisible(false).removeAll(true);
  }

  private renderMenu(): void {
    this.menuLayer.removeAll(true).setVisible(true);
    const v = this.view;
    const dim = this.add.rectangle(W / 2, H / 2, v.w + 4, v.h + 4, 0x000000, 0.7).setInteractive();
    dim.on('pointerdown', (p: Phaser.Input.Pointer) => this.markUi(p));
    this.menuLayer.add(dim);
    const rows: { label: string; run: () => void }[] = [
      { label: 'Seguir jugando', run: () => this.closeMenu() },
      { label: 'Cómo jugar', run: () => showHowTo(this, this.menuLayer, () => this.renderMenu(), (p) => this.markUi(p)) },
      { label: audio.muted ? 'Sonido: apagado' : 'Sonido: encendido', run: () => { audio.setMuted(!audio.muted); this.renderMenu(); } },
      { label: state.meta.ambient ? 'Ambiente: encendido' : 'Ambiente: apagado', run: () => { audio.setAmbient(!state.meta.ambient); this.renderMenu(); } },
    ];
    if (this.scale.fullscreen.available) {
      rows.push({
        label: this.scale.isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa',
        run: () => { this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen(); this.closeMenu(); },
      });
    }
    rows.push({ label: 'Volver al inicio', run: () => { this.closeMenu(); this.events.emit('menu', 'select'); } });
    rows.push({ label: 'Reiniciar esta partida', run: () => { this.closeMenu(); this.events.emit('menu', 'restart'); } });
    const total = rows.length * 62;
    const top = H / 2 - total / 2;
    rows.forEach((r, i) => {
      const y = top + i * 62;
      const g = this.add.graphics();
      const draw = (hot: boolean) => {
        g.clear();
        g.fillStyle(hot ? 0xfff3b0 : 0xf6f3ec, 1).fillRoundedRect(60, y, W - 120, 52, 16);
        g.lineStyle(3, 0x111111, 1).strokeRoundedRect(60, y, W - 120, 52, 16);
      };
      draw(false);
      const t = txt(this, W / 2, y + 26, r.label, 17, '#111111', { fontStyle: 'bold' }).setOrigin(0.5);
      const hit = this.add.zone(W / 2, y + 26, W - 120, 52).setInteractive({ useHandCursor: true });
      hit.on('pointerover', () => draw(true));
      hit.on('pointerout', () => draw(false));
      hit.on('pointerdown', (p: Phaser.Input.Pointer) => { this.markUi(p); audio.play('select'); r.run(); });
      this.menuLayer.add([g, t, hit]);
    });
  }
}
