export default class App extends PIXI.Application {
  constructor(markus, data) {
    super({
      backgroundColor: data.props.color || 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";

    this.resolution = null;
    this.w = data.props.w || 1920;
    this.h = data.props.h || 700;

    data.presets.length && this.stage.addChild.apply(this.stage, markus.activatePresets(data.presets));
    window.addEventListener('resize', () => this.resize(this));
    this.resize();
  }
  resize() {
    this.resolution = window.innerWidth/this.w;
    this.renderer.resize(window.innerWidth, this.h*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.h*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }
}
