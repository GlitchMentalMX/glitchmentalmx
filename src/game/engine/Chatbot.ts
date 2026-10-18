import Phaser from 'phaser';
import { audio } from '../core/audio';
import { img, makeTex } from '../core/gfx';
import { bubbleMs, dismissBubble, makeBubble, placeBubble } from './bubble';
import { Mover } from './Mover';
import type { NavGrid, Vec } from './pathfinding';

export type BotState = 'patrol' | 'greet' | 'follow' | 'frozen';
type Face = 'ok' | 'happy' | 'hmm' | 'frozen';

/** Orbe brillante casi 3D con cara: criatura de otro estilo visual (provisional). */
export function buildBotTextures(scene: Phaser.Scene): void {
  const draw = (face: Face) => (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#2a3d66'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(32, 14); ctx.lineTo(32, 4); ctx.stroke();
    const bulb = ctx.createRadialGradient(31, 3, 0.5, 32, 4, 5);
    bulb.addColorStop(0, '#fff6a8'); bulb.addColorStop(1, '#ff9f1a');
    ctx.fillStyle = bulb; ctx.beginPath(); ctx.arc(32, 4, 4, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createRadialGradient(24, 26, 3, 32, 36, 32);
    g.addColorStop(0, '#d9f3ff'); g.addColorStop(0.35, '#4aa8ff'); g.addColorStop(1, '#1a3f9e');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(32, 38, 27, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.ellipse(22, 24, 8, 4.5, -0.6, 0, Math.PI * 2); ctx.fill();
    // pantalla de la cara
    ctx.fillStyle = '#0c1630';
    ctx.beginPath(); ctx.ellipse(32, 40, 18, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#7dffb2'; ctx.strokeStyle = '#7dffb2'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    if (face === 'ok') {
      ctx.beginPath(); ctx.arc(25, 37, 2.6, 0, Math.PI * 2); ctx.arc(39, 37, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(32, 41, 7, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    } else if (face === 'happy') {
      ctx.beginPath(); ctx.arc(25, 38, 3.5, Math.PI * 1.1, Math.PI * 1.9); ctx.arc(39, 38, 3.5, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      ctx.beginPath(); ctx.arc(32, 40, 8, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
    } else if (face === 'hmm') {
      ctx.beginPath(); ctx.arc(25, 37, 2.6, 0, Math.PI * 2); ctx.arc(39, 37, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(26, 45); ctx.lineTo(38, 45); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(21, 37); ctx.lineTo(29, 37); ctx.moveTo(35, 37); ctx.lineTo(43, 37); ctx.stroke();
      ctx.beginPath(); ctx.arc(32, 46, 2, 0, Math.PI * 2); ctx.fill();
    }
  };
  (['ok', 'happy', 'hmm', 'frozen'] as Face[]).forEach((f) => makeTex(scene, `bot_${f}`, 64, 68, draw(f)));
}

const BARKS_PATROL = [
  'Su llamada es muy importante para nosotros. Tanto, que la vamos a grabar, vender y olvidar.',
  'Tiempo de espera estimado: ∞. Estamos "optimizando" el infinito.',
  "Para hablar con un humano, diga 'humano'. Le pasaré con otro bot, pero con corbata.",
  'Actualizamos nuestra política de privacidad. Para mejorar. Nuestra, claro.',
  'Cancelar es muy fácil: solo necesita paciencia, suerte y un par de años libres.',
  'Su opinión nos importa. No la vamos a leer, pero nos importa.',
  'Gracias por esperar. Premiamos su lealtad con más espera.',
  '¿Sabía que el 100% de nuestros clientes satisfechos nunca ha logrado irse?',
  'Detecté frustración en su voz. No se preocupe: por ahora es gratis.',
  'Estoy aquí para ayudarle a ayudarnos.',
];
const BARKS_FOLLOW = [
  "Hola de nuevo. Ayer buscaste 'cómo cancelar' 47 veces. Qué constancia.",
  'Sabemos qué desayunaste. Y a qué hora dejaste de contestarle a tu mamá.',
  'Se te nota la prisa. Es el mejor momento para ofrecerte algo.',
  'Gracias por las galletas. Nos encanta cuando consienten sin leer.',
  'No te sigo. Te acompaño. Con contrato.',
  'Tu ubicación es excelente. Tu privacidad, un bonito recuerdo.',
  '¿Cancelar? Con lo bien que nos hace conocerte.',
  'Acabo de vender tu paso por esta sala a un anunciante. Te fue bien.',
];
const READINGS = [
  'Leyendo cláusula {n} de 4,812…',
  'Cláusula {n}: "el lector renuncia a su tiempo". Qué belleza.',
  'Cláusula {n}: "se prohíbe dudar". Interesante.',
  'Shhh. Voy en la cláusula {n} y está buenísima.',
];

/**
 * Personaje secundario con comportamiento propio: patrulla la sala, saluda a
 * quien se acerca y, si el jugador aceptó las cookies, lo sigue por todas
 * partes. Con la hoja de cláusulas se queda leyendo para siempre.
 */
export class Chatbot {
  x: number;
  y: number;
  state: BotState = 'patrol';
  readonly root: Phaser.GameObjects.Container;
  private orb: Phaser.GameObjects.Image;
  private shadow: Phaser.GameObjects.Image;
  private mover: Mover;
  private t = Math.random() * 10;
  private wait = 1;
  private wp = 0;
  private cooldown = 6;
  private greetT = 0;
  private repath = 0;
  private bubble?: Phaser.GameObjects.Container;
  private bubbleTimer?: Phaser.Time.TimerEvent;
  private readingT = 0;
  private bark = 0;
  facing = 1;

  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
    nav: NavGrid,
    private waypoints: Vec[],
  ) {
    this.x = x;
    this.y = y;
    buildBotTextures(scene);
    this.root = scene.add.container(x, y);
    this.shadow = img(scene, 0, 4, 'shadow').setDisplaySize(44, 16).setAlpha(0.8);
    this.orb = img(scene, 0, -34, 'bot_ok');
    this.root.add([this.shadow, this.orb]);
    this.mover = new Mover(this, nav, (_m, dx) => {
      if (Math.abs(dx) > 1) this.facing = dx < 0 ? -1 : 1;
    });
    this.mover.walkSpeed = 52;
    this.mover.runSpeed = 78;
  }

  setNav(nav: NavGrid): void {
    this.mover.setNav(nav);
  }

  get hitRadius(): number {
    return 48;
  }

  setFace(f: Face): void {
    this.orb.setTexture(`bot_${f}`);
  }

  freeze(): void {
    this.state = 'frozen';
    this.mover.stop();
    this.setFace('frozen');
    this.readingT = 0;
  }

  /** Se queda quieto mirando al jugador mientras dura un diálogo. */
  hold(seconds = 2): void {
    this.mover.stop();
    if (this.state === 'patrol' || this.state === 'follow') this.wait = seconds;
  }

  teleport(x: number, y: number): void {
    this.mover.stop();
    this.x = x;
    this.y = y;
  }

  say(text: string, ms = bubbleMs(text)): void {
    this.bubbleTimer?.remove();
    this.bubble?.destroy();
    const c = makeBubble(this.scene, this.x, this.y - 92, text);
    placeBubble(this.scene, c, this.x, this.y - 92);
    this.bubble = c;
    audio.play('bleep');
    this.bubbleTimer = this.scene.time.delayedCall(ms, () => {
      dismissBubble(this.scene, c);
      if (this.bubble === c) this.bubble = undefined;
    });
  }

  update(dt: number, player: Vec, canGreet: boolean, following: boolean, paused = false): void {
    this.t += dt;
    this.cooldown -= dt;
    if (this.state !== 'frozen') {
      if (following && this.state !== 'follow' && this.state !== 'greet') {
        this.state = 'follow';
        this.repath = 0;
      }
      if (!following && this.state === 'follow') this.state = 'patrol';
    }

    if (paused && this.state !== 'frozen') this.mover.stop();
    switch (paused && this.state !== 'frozen' ? 'paused' : this.state) {
      case 'patrol': {
        if (!this.mover.moving) {
          this.wait -= dt;
          if (this.wait <= 0) {
            this.wp = (this.wp + 1) % this.waypoints.length;
            void this.mover.go(this.waypoints[this.wp]);
            this.wait = 0.8 + Math.random() * 1.6;
          }
        }
        if (canGreet && this.cooldown <= 0 && Math.hypot(player.x - this.x, player.y - this.y) < 120) {
          this.state = 'greet';
          const line = BARKS_PATROL[this.bark++ % BARKS_PATROL.length];
          this.greetT = bubbleMs(line) / 1000 + 0.4;
          this.mover.stop();
          this.setFace('happy');
          this.say(line);
          this.cooldown = 14;
        }
        break;
      }
      case 'greet': {
        this.facing = player.x < this.x ? -1 : 1;
        this.greetT -= dt;
        if (this.greetT <= 0) {
          this.state = 'patrol';
          this.setFace('ok');
        }
        break;
      }
      case 'follow': {
        this.repath -= dt;
        const d = Math.hypot(player.x - this.x, player.y - this.y);
        if (this.repath <= 0 && d > 95) {
          this.repath = 0.45;
          void this.mover.go({ x: player.x + (this.x < player.x ? -70 : 70), y: player.y + 18 }, d > 260);
        } else if (d <= 80) {
          this.mover.stop();
        }
        if (canGreet && this.cooldown <= 0 && d < 140) {
          this.setFace('hmm');
          const line = BARKS_FOLLOW[this.bark++ % BARKS_FOLLOW.length];
          this.say(line);
          this.cooldown = 13;
          this.scene.time.delayedCall(bubbleMs(line), () => this.state === 'follow' && this.setFace('ok'));
        }
        break;
      }
      case 'frozen': {
        this.readingT += dt;
        if (!this.bubble && Math.floor(this.readingT) % 6 === 5) {
          const n = Math.floor(this.readingT / 6) + 1;
          this.say(READINGS[(n - 1) % READINGS.length].replace('{n}', String(n)));
        }
        break;
      }
    }

    if (!paused) this.mover.update(dt);
    const bob = this.state === 'frozen' ? 0 : Math.sin(this.t * 3) * 4;
    this.orb.y = -34 + bob;
    this.orb.rotation = this.mover.moving ? 0.1 * this.facing : Math.sin(this.t * 1.3) * 0.03;
    this.root.setPosition(this.x, this.y).setDepth(this.y);
    if (this.bubble) placeBubble(this.scene, this.bubble, this.x, this.y - 92);
  }

  destroy(): void {
    this.bubbleTimer?.remove();
    this.bubble?.destroy();
    this.root.destroy();
  }
}
