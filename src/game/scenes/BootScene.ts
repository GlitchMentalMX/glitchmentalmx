import Phaser from 'phaser';
import { PARTS } from '../art/characters';
import { CHARACTERS, CHARACTER_LIST } from '../data/characters';
import { buildCharacterTextures, buildCommonTextures } from '../engine/Actor';
import { fitCamera, txt } from '../core/gfx';
import { W, H, type CharId } from '../core/config';
import { IMAGE_SETS, loadedImages } from '../core/images';

/** Genera todas las texturas de personajes de una vez y pasa a la selección. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    for (const [id, set] of Object.entries(IMAGE_SETS)) {
      for (const [k, url] of Object.entries(set)) this.load.image(`${id}_${k}`, url);
    }
    // Si alguna pieza falla, el personaje usa su dibujo de respaldo por código.
    this.load.on('loaderror', () => undefined);
  }

  create(): void {
    fitCamera(this);
    this.cameras.main.setBackgroundColor('#0b0b10');
    txt(this, W / 2, H / 2, 'Cargando...', 18, '#8d89a0').setOrigin(0.5);
    buildCommonTextures(this);
    for (const [id, set] of Object.entries(IMAGE_SETS)) {
      let all = true;
      for (const [k, url] of Object.entries(set)) {
        const key = `${id}_${k}`;
        if (this.textures.exists(key)) loadedImages.set(url, this.textures.get(key).getSourceImage() as HTMLImageElement);
        else all = false;
      }
      if (!all) {
        const def = CHARACTERS[id as CharId];
        def.parts = PARTS[`${id}Drawn` as 'donDrawn' | 'glitchmanDrawn'];
        def.pose = undefined;
      }
    }
    for (const c of CHARACTER_LIST) buildCharacterTextures(this, c);
    this.time.delayedCall(50, () => this.scene.start('Select'));
  }
}
