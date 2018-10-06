export default class Block extends PIXI.Container {
  constructor(markus, data) {
    super();

    data.presets.length && this.addChild.apply(this, markus.activatePresets(data.presets));
  }
}
