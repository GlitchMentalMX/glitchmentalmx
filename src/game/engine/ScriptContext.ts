import type { CharId, EndingId } from '../core/config';
import { audio, type SfxName } from '../core/audio';
import { state } from '../core/state';
import { CHARACTERS } from '../data/characters';
import { ITEMS } from '../data/items';
import { SECRETS } from '../data/secrets';
import type { UIScene, Speaker } from '../scenes/UIScene';
import type { WorldScene } from '../scenes/WorldScene';
import type { ReactKind } from './Actor';
import type { LineKey } from './types';
import type { Vec } from './pathfinding';

/** Texto fijo o variantes por personaje: el motor elige la que corresponde. */
export type Line = string | ({ default: string } & Partial<Record<CharId, string>>);

const BOT: Speaker = { name: 'Asistente Amabilísimo', color: '#4aa8ff' };
const SHADE: Speaker = { name: 'Tu sombra', color: '#9aa0b4' };
const DEFAULT_COLOR = '#f6f3ec';

/**
 * Lo que un guion puede hacer. Las interacciones del juego son funciones
 * async que reciben un ScriptContext y usan await: se leen de arriba abajo
 * como una conversación, y añadir una escena nueva no requiere tocar el motor.
 */
export class ScriptContext {
  constructor(
    readonly world: WorldScene,
    readonly ui: UIScene,
  ) {}

  get state() {
    return state;
  }

  get charId(): CharId {
    return state.characterId as CharId;
  }

  get char() {
    return CHARACTERS[this.charId];
  }

  resolve(line: Line): string {
    return typeof line === 'string' ? line : line[this.charId] ?? line.default;
  }

  private speaker(who: string): Speaker {
    if (who === 'player') return { name: this.char.name, color: this.char.accent };
    if (who === 'bot') return BOT;
    if (who === 'shade') return SHADE;
    return { name: who, color: DEFAULT_COLOR };
  }

  /** `who`: 'player' | 'bot' | 'shade' | cualquier nombre (máquinas, carteles). */
  async say(who: string, line: Line): Promise<void> {
    if (who === 'bot') this.world.bot?.hold();
    await this.ui.say(this.speaker(who), this.resolve(line));
  }

  async ask(who: string, line: Line, options: string[]): Promise<number> {
    if (who === 'bot') this.world.bot?.hold();
    return this.ui.ask(this.speaker(who), this.resolve(line), options);
  }

  /** El jugador comenta algo con la frase propia de su personaje. */
  async sayChar(key: LineKey): Promise<void> {
    await this.ui.say(this.speaker('player'), this.char.lines[key]);
  }

  /** ¿Juega con este personaje? Las rutas exclusivas se activan con esto. */
  isChar(id: CharId): boolean {
    return this.charId === id;
  }

  /** Marca un secreto del personaje; la primera vez avisa con un aviso en pantalla. */
  discover(secretId: string): void {
    const list = SECRETS[this.charId];
    const idx = list.findIndex((s) => s.id === secretId);
    if (state.discover(secretId) && idx >= 0) {
      const n = state.secretsOf(this.charId).length;
      audio.play('coin');
      this.ui.toast(`Secreto de ${this.char.name}: ${list[idx].name} (${n}/${list.length})`);
    }
  }

  flag<T extends boolean | number | string = boolean | number | string>(key: string): T | undefined {
    return state.flag<T>(key);
  }
  is(key: string): boolean {
    return state.is(key);
  }
  set(key: string, v: boolean | number | string = true): void {
    state.set(key, v);
  }
  has(item: string): boolean {
    return state.has(item);
  }

  give(item: string): void {
    state.give(item);
    audio.play('pick');
    this.ui.toast(`Obtuviste: ${ITEMS[item]?.name ?? item}`);
  }

  take(item: string): void {
    state.take(item);
  }

  sfx(name: SfxName): void {
    audio.play(name);
  }

  wait(ms: number): Promise<void> {
    return new Promise((r) => this.world.time.delayedCall(ms, r));
  }

  react(kind: ReactKind): void {
    this.world.player.react(kind);
  }

  shake(ms = 300, amp = 0.006): void {
    this.world.cameras.main.shake(ms, amp);
  }

  flash(ms = 200, r = 255, g = 255, b = 255): void {
    this.world.cameras.main.flash(ms, r, g, b);
  }

  /** Oscurece, ejecuta `mid` (a oscuras) y vuelve a la imagen. */
  async fade(mid: () => void | Promise<void>, ms = 300): Promise<void> {
    const cam = this.world.cameras.main;
    await new Promise<void>((r) => {
      cam.once('camerafadeoutcomplete', () => r());
      cam.fadeOut(ms, 0, 0, 0);
    });
    await mid();
    await new Promise<void>((r) => {
      cam.once('camerafadeincomplete', () => r());
      cam.fadeIn(ms, 0, 0, 0);
    });
  }

  /** El jugador camina a un punto (p. ej. dentro de una puerta). */
  walk(to: Vec, run = false): Promise<boolean> {
    return this.world.playerMover.go(to, run);
  }

  async end(id: EndingId): Promise<void> {
    await this.world.finish(id);
  }
}
