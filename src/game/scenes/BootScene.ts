import Phaser from 'phaser';
import { CHARACTER_LIST } from '../data/characters';
import { buildCharacterTextures, buildCommonTextures } from '../engine/Actor';
import { fitCamera, txt } from '../core/gfx';
import { W, H } from '../core/config';
import { GLITCHMAN_HEAD, loadedImages } from '../core/images';

/** Genera todas las texturas de personajes de una vez y pasa a la selección. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    this.load.image(GLITCHMAN_HEAD, '/juego/glitchman-head.webp');
    // Si la imagen falla, el personaje usa su dibujo de respaldo.
    this.load.on('loaderror', () => undefined);
  }

  create(): void {
    if (this.textures.exists(GLITCHMAN_HEAD)) loadedImages.set(GLITCHMAN_HEAD, this.textures.get(GLITCHMAN_HEAD).getSourceImage() as HTMLImageElement);
    fitCamera(this);
    this.cameras.main.setBackgroundColor('#0b0b10');
    txt(this, W / 2, H / 2, 'Cargando...', 18, '#8d89a0').setOrigin(0.5);
    buildCommonTextures(this);
    for (const c of CHARACTER_LIST) buildCharacterTextures(this, c);
    this.time.delayedCall(50, () => this.scene.start('Select'));
  }
}
