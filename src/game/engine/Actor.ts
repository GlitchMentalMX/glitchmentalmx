import Phaser from 'phaser';
import { S } from '../core/config';
import { audio } from '../core/audio';
import { img, makeTex } from '../core/gfx';
import { dismissBubble, makeBubble } from './bubble';
import type { CharacterDef, PartRole } from './types';

export type Mode = 'idle' | 'walk' | 'run';
export type ReactKind = 'surprise' | 'happy' | 'think' | 'signature';

/** Crea (una sola vez) las texturas de un personaje a partir de su definición. */
export function buildCharacterTextures(scene: Phaser.Scene, def: CharacterDef): void {
  for (const p of def.parts) makeTex(scene, p.key, p.w, p.h, p.draw, p.pixel);
  if (def.pose) makeTex(scene, def.pose.key, def.pose.w, def.pose.h, def.pose.draw, def.pose.pixel);
}

export function buildCommonTextures(scene: Phaser.Scene): void {
  makeTex(scene, 'shadow', 70, 26, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(0,0,0,0.5)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save();
    ctx.translate(0, h / 2);
    ctx.scale(1, h / w);
    ctx.translate(0, -h / 2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

interface ActorOpts {
  scale?: number;
  /** Silueta negra aplanada: la "sombra" que se independiza. */
  shade?: boolean;
  shadow?: boolean;
}

/**
 * Un personaje animado. Todo el movimiento (idle, caminar, correr, rebotes,
 * reacciones) sale de esta clase, que solo lee la definición del personaje:
 * los cinco jugables y la sombra independizada comparten exactamente el
 * mismo código.
 */
export class Actor extends Phaser.GameObjects.Container {
  readonly def: CharacterDef;
  mode: Mode = 'idle';
  facing = 1;
  readonly isShade: boolean;

  private fx: Phaser.GameObjects.Container;
  private rig: Phaser.GameObjects.Container;
  private shadowImg: Phaser.GameObjects.Image;
  private parts: Partial<Record<PartRole, Phaser.GameObjects.Image>> = {};
  private base = new Map<Phaser.GameObjects.Image, { x: number; y: number }>();
  private phase = Math.random() * 6;
  private idleT = Math.random() * 10;
  private reactUntil = 0;
  private glitchIn = 1.2;
  private glitchBurst = 0;
  private bubble?: Phaser.GameObjects.Container;
  private bubbleTimer?: Phaser.Time.TimerEvent;
  private busyFx = false;
  private poseImg?: Phaser.GameObjects.Image;
  private poseTimer?: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, def: CharacterDef, opts: ActorOpts = {}) {
    super(scene, x, y);
    this.def = def;
    this.isShade = !!opts.shade;
    buildCharacterTextures(scene, def);

    this.shadowImg = img(scene, 0, 2, 'shadow').setDisplaySize(62, 22);
    if (opts.shadow === false || this.isShade) this.shadowImg.setVisible(false);
    this.add(this.shadowImg);

    this.fx = scene.add.container(0, 0);
    this.rig = scene.add.container(0, 0);
    this.fx.add(this.rig);
    this.add(this.fx);

    const order: PartRole[] = ['legL', 'legR', 'body', 'extra', 'head', 'hat'];
    for (const role of order) {
      const spec = def.parts.find((p) => p.role === role);
      if (!spec) continue;
      const im = img(scene, spec.x, spec.y, spec.key, spec.px, spec.py);
      if (this.isShade) im.setTint(0x000000);
      this.parts[role] = im;
      this.base.set(im, { x: spec.x, y: spec.y });
      this.rig.add(im);
    }
    if (def.pose) {
      const ps = def.pose;
      this.poseImg = img(scene, ps.x, ps.y, ps.key, ps.px, ps.py).setVisible(false);
      if (this.isShade) this.poseImg.setTint(0x000000);
      this.fx.add(this.poseImg);
    }
    if (this.isShade) {
      this.rig.setAlpha(0.88);
      this.fx.setScale(1, 0.82);
    }
    if (opts.scale) this.setScale(opts.scale);
    scene.add.existing(this);
  }

  setShadowVisible(v: boolean): this {
    this.shadowImg.setVisible(v && !this.isShade);
    return this;
  }

  face(dx: number): void {
    if (Math.abs(dx) > 1) this.facing = dx < 0 ? -1 : 1;
  }

  tick(dt: number): void {
    const g = this.def.gait;
    const moving = this.mode !== 'idle';
    this.idleT += dt;
    if (moving) this.phase += dt * (this.mode === 'run' ? g.runHz : g.walkHz) * Math.PI * 2;
    const k = this.mode === 'run' ? 1.35 : 1;
    let s = Math.sin(this.phase);
    if (g.stepped) s = Math.round(s * g.stepped) / g.stepped;
    const s2 = Math.sin(this.phase * 2);
    const wob = g.noise ? Math.sin(this.phase * 0.37 + 1.3) * g.noise : 0;
    const P = this.parts;
    const b = (im: Phaser.GameObjects.Image) => this.base.get(im)!;

    this.rig.scaleX = this.facing;
    if (this.poseImg?.visible) this.poseImg.scaleX = this.facing / S;
    this.rig.y = moving ? -Math.abs(s) * g.bob * k : Math.sin(this.idleT * 2) * 0.7;

    if (P.body) {
      const bo = b(P.body);
      const lean = moving && g.lean ? g.lean * (this.mode === 'run' ? 1.4 : 0.5) : 0;
      P.body.rotation = moving ? s * g.sway * k * (1 + wob) + lean : Math.sin(this.idleT * 1.1) * 0.015;
      P.body.scaleY = (1 / S) * (1 + (moving ? s2 * g.squash : Math.sin(this.idleT * 2) * g.breath));
      P.body.y = bo.y;
    }
    for (const [role, sign] of [['legL', 1], ['legR', -1]] as const) {
      const leg = P[role];
      if (!leg) continue;
      const lo = b(leg);
      leg.y = lo.y - (moving ? Math.max(0, s * sign) * g.step * k : 0);
      leg.rotation = moving ? s * sign * (g.legRot ?? 0.28) * (g.stepped ? 0 : 1) : 0;
    }
    if (P.head) {
      const ho = b(P.head);
      const lag = Math.abs(Math.sin(this.phase - 0.7));
      const dy = moving ? -lag * g.bob * 0.5 : Math.sin(this.idleT * 1.7) * 0.5;
      P.head.y = ho.y + dy;
      P.head.rotation = moving && P.body ? -P.body.rotation * 0.7 : Math.sin(this.idleT * 0.8) * 0.045;
      const reacting = this.scene.time.now < this.reactUntil && this.parts.head;
      const key = reacting ? this.def.parts.find((p) => p.role === 'headReact')?.key : this.def.parts.find((p) => p.role === 'head')?.key;
      if (key && P.head.texture.key !== key) P.head.setTexture(key);
      if (P.hat) {
        const hb = b(P.hat);
        P.hat.y = hb.y + dy;
        P.hat.rotation = P.head.rotation;
      }
    }
    if (P.extra && !this.busyFx) {
      P.extra.rotation = moving ? -s * 0.32 * k : Math.sin(this.idleT * 0.9) * 0.03;
    }

    if (g.jitter || this.glitchBurst > 0) this.tickGlitch(dt, !!g.jitter);
    if (this.bubble) this.bubble.setPosition(this.x, this.y - (this.def.topY + 24) * this.scaleY);
  }

  private tickGlitch(dt: number, auto: boolean): void {
    if (auto && this.glitchBurst <= 0) {
      this.glitchIn -= dt;
      if (this.glitchIn <= 0) {
        this.glitchBurst = 0.14;
        this.glitchIn = 0.9 + Math.random() * 1.8;
      }
    }
    if (this.glitchBurst > 0) {
      this.glitchBurst -= dt;
      for (const im of this.base.keys()) {
        const bs = this.base.get(im)!;
        im.x = bs.x + (Math.random() - 0.5) * 11;
        im.setAlpha(Math.random() > 0.25 ? 1 : 0.35);
        if (!this.isShade) im.setTint(Math.random() > 0.5 ? 0x00ffff : 0xff3df2);
      }
      if (this.glitchBurst <= 0) this.resetGlitch();
    }
  }

  private resetGlitch(): void {
    for (const im of this.base.keys()) {
      im.x = this.base.get(im)!.x;
      im.setAlpha(1);
      if (this.isShade) im.setTint(0x000000);
      else im.clearTint();
    }
  }

  // ---------- Reacciones ----------

  private hop(h: number, ms = 140): void {
    this.scene.tweens.add({ targets: this.fx, y: -h, duration: ms, yoyo: true, ease: 'Quad.easeOut' });
  }

  private swapHead(ms: number): void {
    this.reactUntil = this.scene.time.now + ms;
  }

  react(kind: ReactKind): void {
    if (kind === 'signature') return this.signature();
    if (kind === 'surprise') {
      this.swapHead(1000);
      this.hop(16);
      this.say('!', 1000);
    } else if (kind === 'happy') {
      this.swapHead(1100);
      this.hop(10, 110);
      this.scene.time.delayedCall(240, () => this.hop(10, 110));
      this.say('♪', 1000);
    } else {
      this.swapHead(900);
      this.say('…', 1200);
    }
  }

  /** Reacción característica de cada personaje: expresión + animación propia. */
  signature(): void {
    if (this.busyFx) return;
    this.busyFx = true;
    const sc = this.scene;
    const done = (ms: number) => sc.time.delayedCall(ms, () => (this.busyFx = false));
    this.swapHead(1500);
    this.say(this.def.signatureLine, 2400);
    if (this.poseImg) this.showPose(1700);
    switch (this.def.signature) {
      case 'cane': {
        const cane = this.parts.extra;
        if (cane) {
          sc.tweens.add({ targets: cane, rotation: -1.1, duration: 220, yoyo: true, repeat: 2, hold: 120, onYoyo: () => audio.play('tap') });
        } else {
          for (let i = 0; i < 3; i++) sc.time.delayedCall(260 + i * 300, () => audio.play('tap'));
        }
        done(1300);
        break;
      }
      case 'chew': {
        const head = this.parts.head;
        if (head) sc.tweens.add({ targets: head, scaleY: head.scaleY * 0.88, duration: 110, yoyo: true, repeat: 7 });
        audio.play('crunch');
        sc.time.delayedCall(500, () => audio.play('crunch'));
        done(1500);
        break;
      }
      case 'pose': {
        sc.tweens.add({ targets: this.fx, scaleX: 1.22, scaleY: 1.22, angle: -6, duration: 220, yoyo: true, hold: 700, ease: 'Back.easeOut' });
        audio.play('select');
        done(1500);
        break;
      }
      case 'glitch': {
        this.glitchBurst = 0.9;
        audio.play('glitch');
        sc.tweens.add({ targets: this.fx, x: { from: -8, to: 8 }, duration: 55, yoyo: true, repeat: 8 });
        sc.time.delayedCall(900, () => (this.fx.x = 0));
        done(1300);
        break;
      }
      case 'hop': {
        this.hop(34, 170);
        audio.play('coin');
        sc.time.delayedCall(360, () => {
          this.hop(34, 170);
          audio.play('coin');
        });
        done(1000);
        break;
      }
    }
  }

  /** Muestra la pose de cuerpo completo (si el personaje la tiene) en lugar del rig. */
  private showPose(ms: number): void {
    const p = this.poseImg;
    if (!p) return;
    this.poseTimer?.remove();
    this.rig.setVisible(false);
    p.setVisible(true).setAlpha(1);
    this.poseTimer = this.scene.time.delayedCall(ms, () => {
      p.setVisible(false);
      this.rig.setVisible(true);
    });
  }

  say(text: string, ms = 2200): void {
    this.bubbleTimer?.remove();
    this.bubble?.destroy();
    const sc = this.scene;
    const c = makeBubble(sc, this.x, this.y - (this.def.topY + 24) * this.scaleY, text);
    this.bubble = c;
    this.bubbleTimer = sc.time.delayedCall(ms, () => {
      dismissBubble(sc, c);
      if (this.bubble === c) this.bubble = undefined;
    });
  }

  destroy(fromScene?: boolean): void {
    this.poseTimer?.remove();
    this.bubbleTimer?.remove();
    this.bubble?.destroy();
    super.destroy(fromScene);
  }
}
