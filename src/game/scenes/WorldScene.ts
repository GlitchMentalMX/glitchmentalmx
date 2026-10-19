import Phaser from 'phaser';
import { H, PLAYER_RADIUS, W, type EndingId } from '../core/config';
import { audio } from '../core/audio';
import { fitCamera, img, makeTex, txt } from '../core/gfx';
import { state } from '../core/state';
import { track } from '../core/track';
import { CHARACTERS } from '../data/characters';
import { SCENES } from '../data/scenes';
import { Actor, buildCommonTextures } from '../engine/Actor';
import { Chatbot } from '../engine/Chatbot';
import { Mover } from '../engine/Mover';
import { NavGrid, type Rect, type Vec } from '../engine/pathfinding';
import { ScriptContext } from '../engine/ScriptContext';
import type { UIScene } from './UIScene';

/** Algo con lo que el jugador puede interactuar: puertas, objetos, personajes. */
export interface Target {
  id: string;
  label: string;
  hit: (x: number, y: number) => boolean;
  approach: () => Vec;
  anchor: () => Vec;
  active: () => boolean;
  run: (c: ScriptContext) => Promise<void>;
}

export interface SceneDef {
  id: string;
  title: string;
  /** Objetivo corto, siempre visible en pantalla. */
  objective: string;
  spawn: Vec;
  /** Construye fondo, props, bloqueos, objetivos y personajes de la escena. */
  build: (w: WorldScene) => void;
  /** Se ejecuta al comenzar una partida nueva en esta escena. */
  intro?: (c: ScriptContext) => Promise<void>;
  inspect?: (c: ScriptContext, itemId: string) => Promise<void>;
  /** Reaplica el estado guardado (planta movida, sombra suelta, bot congelado...). */
  restore?: (w: WorldScene) => void;
}

interface Marker {
  t: Target;
  dot: Phaser.GameObjects.Image;
  label: Phaser.GameObjects.Text;
}

export class WorldScene extends Phaser.Scene {
  def!: SceneDef;
  player!: Actor;
  playerMover!: Mover;
  shade?: Actor;
  shadeMover?: Mover;
  bot?: Chatbot;
  nav!: NavGrid;
  ui!: UIScene;
  /** Objetos con nombre que los guiones animan (puertas, planta, papel...). */
  objs: Record<string, Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform> = {};
  scripting = false;

  private blockers = new Map<string, Rect>();
  private targets: Target[] = [];
  private markers: Marker[] = [];
  private trackers: Phaser.GameObjects.Image[] = [];
  private tapRing!: Phaser.GameObjects.Graphics;
  private lastTap = { t: 0, x: -999, y: -999 };
  private hover: Target | null = null;
  private saveT = 0;
  private clock = 0;
  private ready = false;
  private ending = false;
  private uiReady!: Promise<UIScene>;

  constructor() {
    super('World');
  }

  // ---------- API para los datos de escena ----------

  addBlocker(id: string, r: Rect): void {
    this.blockers.set(id, r);
  }

  removeBlocker(id: string): void {
    this.blockers.delete(id);
    if (this.nav) this.rebuildNav();
  }

  addTarget(t: Target): void {
    this.targets.push(t);
    const dot = img(this, 0, 0, 'hotdot').setDepth(4000).setAlpha(0);
    const label = txt(this, 0, 0, t.label, 16, '#ffffff', {
      fontStyle: 'bold',
      backgroundColor: '#14121ccc',
      padding: { x: 9, y: 5 },
    }).setOrigin(0.5, 1).setDepth(4001).setAlpha(0);
    this.markers.push({ t, dot, label });
    this.tweens.add({ targets: dot, scale: { from: 0.42, to: 0.58 }, duration: 700, yoyo: true, repeat: -1 });
  }

  spawnBot(waypoints: Vec[]): Chatbot {
    this.bot = new Chatbot(this, waypoints[0].x, waypoints[0].y, this.nav, waypoints);
    return this.bot;
  }

  addTrackers(key: string, n: number): void {
    if (this.trackers.length) return;
    for (let i = 0; i < n; i++) {
      this.trackers.push(img(this, this.player.x, this.player.y, key).setAlpha(0.95));
    }
  }

  /** Quita las galletas que siguen al jugador (el capibara se las come). */
  clearTrackers(): void {
    for (const t of this.trackers) {
      this.tweens.add({ targets: t, alpha: 0, scale: 0, duration: 300, onComplete: () => t.destroy() });
    }
    this.trackers = [];
  }

  rebuildNav(): void {
    this.nav = new NavGrid(W, H);
    this.nav.blockBorders(26);
    for (const r of this.blockers.values()) this.nav.block(r, PLAYER_RADIUS);
    this.playerMover?.setNav(this.nav);
    this.shadeMover?.setNav(this.nav);
    this.bot?.setNav(this.nav);
  }

  // ---------- Ciclo de vida ----------

  create(): void {
    this.ready = false;
    this.ending = false;
    this.scripting = false;
    this.blockers.clear();
    this.targets = [];
    this.markers = [];
    this.trackers = [];
    this.objs = {};
    this.bot = undefined;
    this.shade = undefined;
    this.shadeMover = undefined;
    this.hover = null;
    fitCamera(this);
    this.cameras.main.setBackgroundColor('#0b0b10');
    buildCommonTextures(this);
    makeTex(this, 'hotdot', 24, 24, (ctx) => {
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(12, 12, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#111'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(12, 12, 2.6, 0, Math.PI * 2); ctx.fill();
    });

    this.def = SCENES[state.sceneId] ?? SCENES['sala-de-espera'];
    this.nav = new NavGrid(W, H);
    this.def.build(this);
    this.rebuildNav();

    const hasPos = state.x !== 0 || state.y !== 0;
    const start = this.nav.nearestWalkable(hasPos ? { x: state.x, y: state.y } : this.def.spawn);
    const charDef = CHARACTERS[state.characterId ?? 'don'];
    this.player = new Actor(this, start.x, start.y, charDef);
    this.playerMover = new Mover(this.player, this.nav, (m, dx) => {
      this.player.mode = m;
      this.player.face(dx);
    }, () => audio.play('step'));
    if (state.is('sombraFuera')) this.player.setShadowVisible(false);
    this.def.restore?.(this);

    this.tapRing = this.add.graphics().setDepth(3);

    // Capa de interfaz en paralelo.
    // El oyente de 'ui-ready' se registra ANTES de lanzar la UI: si se
    // registrara después, un lanzamiento inmediato (al reiniciar la escena)
    // emitiría el evento antes de que nadie lo escuche y el mundo quedaría
    // esperando para siempre.
    const prev = this.scene.get('UI') as UIScene;
    prev.ready = false;
    this.scene.stop('UI');
    this.uiReady = new Promise<UIScene>((resolve) => prev.events.once('ui-ready', () => resolve(prev)));
    this.scene.launch('UI');
    this.scene.bringToTop('UI');

    this.input.on('pointerdown', this.onPointerDown, this);
    this.input.on('pointermove', this.onPointerMove, this);
    this.events.once('shutdown', () => {
      this.input.off('pointerdown', this.onPointerDown, this);
      this.input.off('pointermove', this.onPointerMove, this);
      this.ui?.events.off('item');
      this.ui?.events.off('menu');
    });

    void this.begin();
  }

  private async begin(): Promise<void> {
    const ui = await this.uiReady;
    this.ui = ui;
    ui.setObjective(this.def.objective);
    ui.events.on('item', (id: string) => void this.runScript((c) => this.def.inspect?.(c, id) ?? Promise.resolve()));
    ui.events.on('menu', (a: string) => void this.onMenu(a));
    this.ready = true;
    if (!state.is('intro')) {
      state.set('intro');
      await this.runScript(async (c) => this.def.intro?.(c));
    }
  }

  async runScript(fn: (c: ScriptContext) => Promise<void>): Promise<void> {
    if (this.scripting || !this.ui) return;
    this.scripting = true;
    try {
      await fn(new ScriptContext(this, this.ui));
    } finally {
      this.scripting = false;
      this.savePosition();
    }
  }

  private savePosition(): void {
    state.x = this.player.x;
    state.y = this.player.y;
    state.persist();
  }

  private async onMenu(action: string): Promise<void> {
    if (action === 'select') {
      this.savePosition();
      this.scene.stop('UI');
      this.scene.start('Select');
      return;
    }
    if (action === 'restart') {
      const i = await this.ui.ask({ name: 'Reiniciar', color: '#ff6b6b' }, 'Se borrará el progreso de esta partida. ¿Seguro?', ['Sí, reiniciar', 'No, seguir']);
      if (i === 0 && state.characterId) {
        state.newGame(state.characterId);
        this.scene.restart();
      }
    }
  }

  async finish(id: EndingId): Promise<void> {
    this.scripting = true;
    this.ending = true;
    this.playerMover.stop();
    track('juego_final', { final: id, personaje: state.characterId ?? '' });
    state.finish(id);
    audio.play(id === 'baja' ? 'win' : 'lose');
    await new Promise<void>((r) => {
      this.cameras.main.once('camerafadeoutcomplete', () => r());
      this.cameras.main.fadeOut(800, 255, 255, 255);
    });
    this.scene.stop('UI');
    this.scene.start('Ending', { id });
  }

  // ---------- Entrada ----------

  private onPointerDown(p: Phaser.Input.Pointer): void {
    audio.unlock();
    const ev = p.event as { __ui?: boolean; shiftKey?: boolean } | undefined;
    const x = p.worldX;
    const y = p.worldY;
    const shift = !!ev?.shiftKey;
    queueMicrotask(() => {
      if (ev?.__ui) return;
      this.handleTap(x, y, shift);
    });
  }

  private onPointerMove(p: Phaser.Input.Pointer): void {
    if (!this.ready || this.scripting) return;
    const t = this.pickTarget(p.worldX, p.worldY);
    this.hover = t;
    this.game.canvas.style.cursor = t ? 'pointer' : 'default';
  }

  private pickTarget(x: number, y: number): Target | null {
    let best: Target | null = null;
    let bd = Infinity;
    for (const t of this.targets) {
      if (!t.active() || !t.hit(x, y)) continue;
      const a = t.anchor();
      const d = Math.hypot(a.x - x, a.y - y);
      if (d < bd) {
        bd = d;
        best = t;
      }
    }
    return best;
  }

  private handleTap(x: number, y: number, shift: boolean): void {
    if (!this.ready || this.scripting || this.ui.blocking) return;
    this.ui.hideHint();
    const now = this.time.now;
    const dbl = now - this.lastTap.t < 330 && Math.hypot(x - this.lastTap.x, y - this.lastTap.y) < 70;
    this.lastTap = { t: now, x, y };
    const run = dbl || shift;
    const t = this.pickTarget(x, y);
    if (t) {
      void this.goInteract(t, run);
      return;
    }
    const dest = this.nav.nearestWalkable({ x, y });
    this.ring(dest.x, dest.y, 0xffffff);
    audio.play('tap');
    void this.playerMover.go(dest, run ? true : 'auto');
  }

  private async goInteract(t: Target, run: boolean): Promise<void> {
    const ap = t.approach();
    this.ring(ap.x, ap.y, 0xffd23f);
    audio.play('tap');
    const arrived = await this.playerMover.go(ap, run ? true : 'auto');
    if (!arrived) return;
    const a = t.anchor();
    this.player.face(a.x - this.player.x);
    await this.runScript((c) => t.run(c));
  }

  private ring(x: number, y: number, color: number): void {
    this.tapRing.clear();
    this.tapRing.lineStyle(3, color, 1).strokeCircle(0, 0, 14);
    this.tapRing.setPosition(x, y).setAlpha(1).setScale(0.4);
    this.tweens.killTweensOf(this.tapRing);
    this.tweens.add({ targets: this.tapRing, scale: 1.2, alpha: 0, duration: 520, ease: 'Quad.easeOut' });
  }

  // ---------- Bucle ----------

  update(_t: number, delta: number): void {
    if (!this.ready) return;
    const dt = Math.min(delta / 1000, 0.05);
    this.clock += dt;
    if (!this.ending) state.playSeconds += dt;
    this.playerMover.update(dt);
    this.shadeMover?.update(dt);
    this.player.tick(dt);
    this.player.setDepth(this.player.y);
    if (this.shade) {
      if (!this.shadeMover?.moving) this.shade.face(this.player.x - this.shade.x);
      this.shade.tick(dt);
      this.shade.setDepth(this.shade.y);
    }

    if (this.bot) {
      const free = !this.scripting && !this.ui.blocking;
      const following = state.flag('cookies') === 'aceptadas' && !state.is('botCongelado') && !state.is('botEsquivado') && !state.is('rastreoComido');
      this.bot.update(dt, this.player, free, following, !free);
      const d = Math.hypot(this.bot.x - this.player.x, this.bot.y - this.player.y);
      if (d < 38 && d > 0.1) {
        this.bot.x += ((this.bot.x - this.player.x) / d) * (38 - d);
        this.bot.y += ((this.bot.y - this.player.y) / d) * (38 - d);
      }
    }

    this.trackers.forEach((tr, i) => {
      const a = this.clock * 2.2 + i * 2.1;
      const tx = this.player.x + Math.cos(a) * 42;
      const ty = this.player.y - 40 + Math.sin(a) * 18;
      tr.x += (tx - tr.x) * Math.min(1, dt * 4);
      tr.y += (ty - tr.y) * Math.min(1, dt * 4);
      tr.setDepth(this.player.y + 1);
    });

    for (const m of this.markers) {
      const on = m.t.active() && !this.scripting && !this.ui.blocking;
      const a = m.t.anchor();
      const near = Math.hypot(a.x - this.player.x, a.y - this.player.y) < 190 || this.hover === m.t;
      m.dot.setPosition(a.x, a.y - 8);
      m.label.setPosition(a.x, a.y - 26);
      m.dot.setAlpha(Phaser.Math.Linear(m.dot.alpha, on ? 0.75 : 0, 0.2));
      m.label.setAlpha(Phaser.Math.Linear(m.label.alpha, on && near ? 1 : 0, 0.2));
    }

    this.saveT += dt;
    if (this.saveT > 1.5 && !this.playerMover.moving) {
      this.saveT = 0;
      this.savePosition();
    }
  }
}
