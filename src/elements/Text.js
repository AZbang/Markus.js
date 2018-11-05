import Display from '../mixins/Display';

/**
 * Implementing PIXI.Text for MarkusJS.
 * @example
 * text | SOME TEXT VALUE
 *   &#64;size 100
 *   &#64;font Bebas Neue
 *   &#64;color #fff
 *
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

  /**
   * Size text
   * @member {number}
  */
  get size() {
    return this.style.fontSize;
  }
  set size(v) {
    this.style.fontSize = v;
  }

  /**
   * Fill color text
   * @member {string}
   */
  get color() {
    return this.style.fill;
  }
  set color(v) {
    this.style.fill = v;
  }

  /**
   * Font family
   * @member {string}
   */
  get font() {
    return this.style.fontFamily;
  }
  set font(v) {
    this.style.fontFamily = v;
  }
}
