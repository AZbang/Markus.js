import Element from '../mixins/Element';

/**
 * Main class for the entire visible tree of elements.
 * @example
 * app
 *  &#64;w 1280
 *  &#64;h 720
 *  &#64;color 0xFFFFFF
 *  &#64;smooth off
 *
 * // activate children presets
 * mark.get('app').init();
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 * @augments PIXI.Application
 */
export default class App extends Element(PIXI.Application) {
  constructor(preset) {
    super(preset, {
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    });

    /**
     * Resolution coef
     * @member {number}
     */
    this.resolution = null;

    this.width = 1920;
    this.height = 1080;

    document.body.appendChild(this.view);
    document.body.style = 'padding: 0; margin: 0; overflow: hidden; background: #000;';
    window.addEventListener('resize', () => this._resize(this));
  }

  /**
   * Renderer backgroundColor
   * @member {number}
   */
  set color(v) {
    this.renderer.backgroundColor = +v;
  }
  get color() {
    return this.renderer.backgroundColor;
  }

  /**
   * Smooth textures in pixi
   * @member {bolleon}
   */
  get smooth() {
    return PIXI.settings.SCALE_MODE !== PIXI.SCALE_MODES.NEAREST;
  }
  set smooth(v) {
    PIXI.settings.SCALE_MODE = v ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
  }

  /**
   * Width game view
   * @member {number}
   */
  set width(v) {
    this._width = v;
    this._resize();
  }
  get width() {
    return this._width;
  }

  /**
   * Height game view
   * @member {number}
   */
  set height(v) {
    this._height = v;
    this._resize();
  }
  get height() {
    return this._height;
  }

  _resize() {
    this.resolution = window.innerWidth/this.width;
    this.renderer.resize(window.innerWidth, this.height*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.height*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }

  /**
   * Initial app elements
   */
  init() {
    this.mark.add(this.presets, this);
  }
}
