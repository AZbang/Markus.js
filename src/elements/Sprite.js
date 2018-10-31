import Display from '../mixins/Display';

/**
 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Sprite
 */
export default class Sprite extends Display(PIXI.Sprite) {
  constructor(mark, parent, data) {
    super(mark, parent, data, PIXI.Texture.WHITE);
    this.contentH = this.height;
    this.contentW = this.width;
    this.mark.add(data.presets, this);
  }
  get src() {
    return this._src;
  }
  set src(v) {
    this._src = v;
    this.texture = PIXI.Texture.fromImage(v);
  }
}
