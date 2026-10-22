import Phaser from 'phaser';
import { ENDING_IDS, H, W, type EndingId } from '../core/config';
import { audio } from '../core/audio';
import { fitCamera, hexNum, txt, viewRect } from '../core/gfx';
import { state } from '../core/state';
import { track } from '../core/track';
import { CHARACTERS } from '../data/characters';
import { ENDINGS, formatPlayTime } from '../data/endings';
import { SECRETS } from '../data/secrets';
import { Actor } from '../engine/Actor';

/** Botones del desenlace (alto 52, separación 58): Compartir / Jugar de nuevo / Elegir otro. */
const BTN_H = 52;
const BTN_STEP = 58;
const BTN_TOP = H - 64 - 2 * BTN_STEP - BTN_H / 2;
const CP_EXTRA = BTN_STEP;
const GAME_URL = 'https://glitchmental.com/juego/';

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
    audio.playMusic('menu');
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
      if (this.endingId === 'retenido') this.add.text(W / 2, 372, 'PREMIUM™', { fontFamily: 'system-ui', fontSize: '22px', color: '#2a1650', backgroundColor: '#ffd23f', padding: { x: 14, y: 6 }, resolution: 2 }).setOrigin(0.5).setAngle(-6);
    }

    // Las consecuencias aparecen una a una.
    // Secretos del personaje: el motivo para volver a jugar con él o con otro.
    const secrets = SECRETS[char.id];
    const found = state.secretsOf(char.id);
    const dots = secrets.map((s) => (found.includes(s.id) ? '●' : '○')).join('');
    const secretLines = [`Secretos de ${char.name}: ${dots} (${found.length} de ${secrets.length})`];
    const fresh = secrets.filter((s) => state.runSecrets.includes(s.id)).map((s) => s.name);
    if (fresh.length) secretLines.push(`Descubriste ahora: ${fresh.join(', ')}.`);
    const missing = secrets.find((s) => !found.includes(s.id));
    secretLines.push(missing ? `Pista: ${missing.hint}` : '¡Los descubriste todos! Prueba con otro personaje: cada uno guarda los suyos.');
    const lines = [...def.lines(), def.closing, '', ...secretLines];
    const hasCheckpoint = char.id === 'heroe' && !!state.checkpoint;
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
      while (body.height > BTN_TOP - (hasCheckpoint ? CP_EXTRA : 0) - 12 - 404 && parseInt(String(body.style.fontSize), 10) > 13) {
        body.setFontSize(parseInt(String(body.style.fontSize), 10) - 1);
      }
      audio.play('tap');
      this.time.delayedCall(shown >= lines.length ? 500 : 1700, showNext);
    };
    this.time.delayedCall(1100, showNext);
  }

  private buildButtons(): void {
    const mk = (y: number, label: string, fill: number, onTap: () => void, onRelease = false) => {
      const g = this.add.graphics();
      g.fillStyle(fill, 1).fillRoundedRect(W / 2 - 190, y - BTN_H / 2, 380, BTN_H, 18);
      g.lineStyle(3, 0x111111, 1).strokeRoundedRect(W / 2 - 190, y - BTN_H / 2, 380, BTN_H, 18);
      txt(this, W / 2, y, label, 18, '#111111', { fontStyle: 'bold' }).setOrigin(0.5);
      const z = this.add.zone(W / 2, y, 380, BTN_H).setInteractive({ useHandCursor: true });
      // Compartir va al soltar: el navegador solo permite abrir "compartir" dentro de un gesto completo del usuario.
      z.on(onRelease ? 'pointerup' : 'pointerdown', () => {
        audio.play('select');
        onTap();
      });
    };
    const found = state.meta.endings.filter((e) => ENDING_IDS.includes(e)).length;
    const yOther = H - 64;
    const yAgain = yOther - BTN_STEP;
    const yShare = yAgain - BTN_STEP;
    if (state.characterId === 'heroe' && state.checkpoint) {
      mk(yShare - CP_EXTRA, 'Cargar checkpoint (¡Cartucho puede!)', 0xffd23f, () => {
        state.discover('cartucho-checkpoint');
        state.loadCheckpoint();
        this.scene.start('World');
      });
    }
    mk(yShare, 'Compartir mi final', 0xff7ab8, () => void this.share(), true);
    mk(yAgain, 'Jugar de nuevo con el mismo personaje', hexNum(ENDINGS[this.endingId].accent), () => {
      if (state.characterId) state.newGame(state.characterId);
      this.scene.start('World');
    });
    mk(yOther, 'Elegir otro personaje', 0xf6f3ec, () => this.scene.start('Select'));
    txt(this, W / 2, H - 22, `Finales descubiertos: ${found} de ${ENDING_IDS.length}`, 13, this.endingId === 'baja' ? '#445' : '#c9c5d4').setOrigin(0.5);
  }

  /** Texto para compartir: el final, el tiempo real y el personaje. Sin datos personales. */
  private shareText(): string {
    const t = formatPlayTime(state.playSeconds);
    const who = CHARACTERS[state.characterId ?? 'don'].name;
    const line: Record<EndingId, string> = {
      retenido: `Intenté cancelar mi suscripción y terminé retenido: ${t} para fracasar. 🫠`,
      baja: `Logré cancelar mi suscripción* en ${t}. (*Ellos se quedaron con mis datos.)`,
      turno: 'Esperé tanto que por fin me atendió un humano. 🪑',
    };
    return `${line[this.endingId]} Jugué como ${who}.`;
  }

  private async share(): Promise<void> {
    const text = this.shareText();
    track('juego_compartir');
    track(`juego_compartir_${this.endingId}`);
    const nav = navigator as Navigator & { share?: (d: { title?: string; text?: string; url?: string }) => Promise<void> };
    if (typeof nav.share === 'function') {
      try {
        await nav.share({ title: 'Pulsa para Empeorar', text, url: GAME_URL });
        return;
      } catch (e) {
        if ((e as Error)?.name === 'AbortError') return; // la persona cerró el menú de compartir
      }
    }
    const full = `${text} Pulsa para Empeorar 👉 ${GAME_URL}`;
    let copied = false;
    try {
      await navigator.clipboard.writeText(full);
      copied = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = full;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        copied = document.execCommand('copy');
        ta.remove();
      } catch {
        copied = false;
      }
    }
    this.toast(copied ? 'Copiado. Pégalo donde quieras.' : 'No se pudo copiar. Comparte: glitchmental.com/juego');
  }

  private toast(msg: string): void {
    const v = viewRect(this);
    const t = txt(this, W / 2, v.y0 + 44, msg, 17, '#111111', { fontStyle: 'bold', backgroundColor: '#ffd23f', padding: { x: 16, y: 10 } }).setOrigin(0.5).setDepth(100);
    this.tweens.add({ targets: t, alpha: 0, delay: 1800, duration: 500, onComplete: () => t.destroy() });
  }

  update(_t: number, delta: number): void {
    const dt = Math.min(delta / 1000, 0.05);
    this.actor.tick(dt);
  }
}
