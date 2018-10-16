import BasicElement from './BasicElement'

export default class App extends BasicElement(PIXI.Application) {
  constructor(markus, root, data) {
    super(markus, root, data, {
      backgroundColor: data.props.color || 0x000000,
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    });

    document.body.appendChild(this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";

    if(!data.props.smooth) PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.width = data.props.w || 1280;
    this.height = data.props.h || 720;
    this.resolution = null;

    this.childList = this.stage.children;

    window.addEventListener('resize', () => this.resize(this));
    this.resize();

  }
  startRender() {
    this.markus.activatePresets(this, this.presets);
  }
  resize() {
    this.resolution = window.innerWidth/this.width;
    this.renderer.resize(window.innerWidth, this.height*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.height*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }
}
