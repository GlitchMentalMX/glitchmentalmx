import Phaser from 'phaser';
import type { CharId, EndingId } from './config';
import { clearProgress, loadMeta, loadProgress, saveMeta, saveProgress, type FlagValue, type Meta } from './save';

/**
 * Estado único de la partida (personaje, banderas, inventario) más la meta
 * persistente (finales vistos, sonido). Las escenas y los guiones leen y
 * escriben aquí; cada cambio relevante se guarda en el momento.
 */
class GameState extends Phaser.Events.EventEmitter {
  characterId: CharId | null = null;
  sceneId = 'sala-de-espera';
  x = 0;
  y = 0;
  flags: Record<string, FlagValue> = {};
  inventory: string[] = [];
  /** Segundos jugados en esta partida. */
  playSeconds = 0;
  meta: Meta = loadMeta();
  /** Tras un final la partida queda cerrada: nada debe volver a escribirla. */
  private closed = false;

  hasSave(): boolean {
    return loadProgress() !== null;
  }

  /** Restaura la partida guardada. Devuelve false si no hay ninguna válida. */
  continueGame(): boolean {
    const p = loadProgress();
    if (!p) return false;
    this.closed = false;
    this.characterId = p.characterId;
    this.sceneId = p.sceneId;
    this.x = p.x;
    this.y = p.y;
    this.flags = p.flags ?? {};
    this.inventory = p.inventory ?? [];
    this.playSeconds = p.t ?? 0;
    return true;
  }

  newGame(characterId: CharId): void {
    this.closed = false;
    this.characterId = characterId;
    this.sceneId = 'sala-de-espera';
    this.x = 0;
    this.y = 0;
    this.flags = {};
    this.inventory = [];
    this.playSeconds = 0;
    this.meta.lastCharacter = characterId;
    saveMeta(this.meta);
    this.persist();
  }

  savedCharacter(): CharId | null {
    return loadProgress()?.characterId ?? null;
  }

  persist(): void {
    if (!this.characterId || this.closed) return;
    saveProgress({
      v: 1,
      characterId: this.characterId,
      sceneId: this.sceneId,
      x: Math.round(this.x),
      y: Math.round(this.y),
      flags: this.flags,
      inventory: this.inventory,
      t: Math.round(this.playSeconds),
    });
  }

  flag<T extends FlagValue = FlagValue>(key: string): T | undefined {
    return this.flags[key] as T | undefined;
  }

  is(key: string): boolean {
    return this.flags[key] === true;
  }

  set(key: string, value: FlagValue = true): void {
    this.flags[key] = value;
    this.emit('flag', key, value);
    this.persist();
  }

  has(item: string): boolean {
    return this.inventory.includes(item);
  }

  give(item: string): void {
    if (this.has(item)) return;
    this.inventory.push(item);
    this.emit('inventory');
    this.persist();
  }

  take(item: string): void {
    this.inventory = this.inventory.filter((i) => i !== item);
    this.emit('inventory');
    this.persist();
  }

  /** Registra un final y cierra la partida en curso (los finales vistos se conservan). */
  finish(ending: EndingId): void {
    this.closed = true;
    if (!this.meta.endings.includes(ending)) this.meta.endings.push(ending);
    saveMeta(this.meta);
    clearProgress();
  }

  setAudioPrefs(patch: Partial<Pick<Meta, 'muted' | 'ambient'>>): void {
    Object.assign(this.meta, patch);
    saveMeta(this.meta);
  }
}

export const state = new GameState();
