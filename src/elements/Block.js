export default class Block extends PIXI.Container {
  constructor(markus, data) {
    super();

    markus.mixinDisplayGrahic(this, data.props);
    data.presets.length && this.addChild.apply(this, markus.activatePresets(data.presets));
  }
}
