import Phaser from 'phaser';
import { PARTS } from '../art/characters';
import { CHARACTERS, CHARACTER_LIST } from '../data/characters';
import { buildCharacterTextures, buildCommonTextures } from '../engine/Actor';
import { fitCamera, txt } from '../core/gfx';
import { W, H } from '../core/config';
import { GLITCHMAN_PIECES, loadedImages } from '../core/images';

/** Genera todas las texturas de personajes de una vez y pasa a la selección. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    for (const [k, url] of Object.entries(GLITCHMAN_PIECES)) this.load.image(`glitchman_${k}`, url);
    // Si alguna pieza falla, Glitchman usa su dibujo de respaldo por código.
    this.load.on('loaderror', () => undefined);
  }

  create(): void {
    fitCamera(this);
    this.cameras.main.setBackgroundColor('#0b0b10');
    txt(this, W / 2, H / 2, 'Cargando...', 18, '#8d89a0').setOrigin(0.5);
    buildCommonTextures(this);
    let all = true;
    for (const [k, url] of Object.entries(GLITCHMAN_PIECES)) {
      const key = `glitchman_${k}`;
      if (this.textures.exists(key)) loadedImages.set(url, this.textures.get(key).getSourceImage() as HTMLImageElement);
      else all = false;
    }
    if (!all) CHARACTERS.glitchman.parts = PARTS.glitchmanDrawn;
    for (const c of CHARACTER_LIST) buildCharacterTextures(this, c);
    this.time.delayedCall(50, () => this.scene.start('Select'));
  }
}
