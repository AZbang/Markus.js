import Element from './Element'

export default class App extends Element(PIXI.Application) {
  constructor(view, parent, data) {
    super(view, parent, data, {
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    });

    document.body.appendChild(this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";

    this.resolution = null;

    window.addEventListener('resize', () => this.resize(this));
    this.resize();
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
