import Element from '../mixins/Element';

/**
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 * @augments PIXI.Application
 */
export default class App extends Element(PIXI.Application) {
  constructor(view, parent, data) {
    super(view, parent, data, {
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    });

    this.defaultProps({
      smooth: true,
      width: 1920,
      height: 1080
    });

    document.body.appendChild(this.view);
    document.body.style = 'padding: 0; margin: 0; overflow: hidden; background: #000;';

    this.resolution = null;

    window.addEventListener('resize', () => this.resize(this));
  }

  // properties
  get color() {
    return this.renderer.backgroundColor;
  }
  set color(v) {
    this.renderer.backgroundColor = +v;
  }
  get smooth() {
    return PIXI.settings.SCALE_MODE !== PIXI.SCALE_MODES.NEAREST;
  }
  set smooth(v) {
    PIXI.settings.SCALE_MODE = v ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
  }
  set width(v) {
    this._width = v;
    this.resize();
  }
  get width() {
    return this._width;
  }
  set height(v) {
    this._height = v;
    this.resize();
  }
  get height() {
    return this._height;
  }

  init() {
    this.mark.add(this.presets, this);
  }
  resize() {
    this.resolution = window.innerWidth/this.width;
    this.renderer.resize(window.innerWidth, this.height*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.height*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }
}
