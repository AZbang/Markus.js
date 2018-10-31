import Display from '../mixins/Display';

/**
 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Text
 */
export default class Text extends Display(PIXI.Text) {
  constructor(view, parent, data) {
    super(view, parent, data);

    if(this.value) {
      this.text = this.value;
    }
  }
  get size() {
    return this.style.fontSize;
  }
  set size(v) {
    this.style.fontSize = v;
  }
  get color() {
    return this.style.fill;
  }
  set color(v) {
    this.style.fill = v;
  }
  get font() {
    return this.style.fontFamily;
  }
  set font(v) {
    this.style.fontFamily = v;
  }
}
