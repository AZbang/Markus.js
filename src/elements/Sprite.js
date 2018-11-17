import Display from '../mixins/Display';

/**
 * Implementing PIXI.Sprite for markusJS
 * @example
 * sprite(src=image.png)
 *
 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Sprite
 */

export default class Sprite extends Display(PIXI.Sprite) {
  constructor(preset) {
    super(preset, PIXI.Texture.WHITE);

    this.contentW = this.width;
    this.contentH = this.height;
    this.mark.add(this.presets, this);
  }

  /**
   * Sprite texture source
   * @member {string}
   */
  get src() {
    return this._src;
  }
  set src(v) {
    if(v == null) {
      return;
    }

    this._src = v;
    this.texture = PIXI.Texture.fromImage(v);
  }
}
