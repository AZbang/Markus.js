export default class Block extends PIXI.Container {
  constructor(markus, props, presets) {
    super();

    this.addChild.apply(this, markus.activatePresets(presets));
  }
}
