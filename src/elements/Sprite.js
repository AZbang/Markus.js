import Display from './Display'

export default class Sprite extends Display(PIXI.Sprite) {
  constructor(mark, parent, data) {
    super(mark, parent, data, PIXI.Texture.WHITE);
  }
  get src() {
    return this._src;
  }
  set src(v) {
    this._src = v;
    this.texture = PIXI.Texture.fromImage(v);
  }
}
