export default class App extends PIXI.Application {
  constructor(markus, data) {
    super({
      backgroundColor: data.props.color || 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";

    this.markus = markus;
    this.presets = data.presets;
    this.markus.addRoot(this);

    this.resolution = null;
    this.w = data.props.w || 1280;
    this.h = data.props.h || 720;

    window.addEventListener('resize', () => this.resize(this));
    this.resize();
  }
  startRender() {
    this.presets.length && this.stage.addChild.apply(this.stage, this.markus.activatePresets(this.presets));
  }
  resize() {
    this.resolution = window.innerWidth/this.w;
    this.renderer.resize(window.innerWidth, this.h*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.h*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }
}
