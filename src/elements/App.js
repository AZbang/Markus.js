export default class App extends PIXI.Application {
  constructor(markus, props, presets) {
    super({
      backgroundColor: props.color || 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(this.view);

    this.resolution = null;
    this.w = props.w || 1920;
    this.h = props.h || 700;

    this.stage.addChild.apply(this.stage, markus.activatePresets(presets));
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
