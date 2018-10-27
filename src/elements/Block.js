import Display from './Display'

export default class Block extends Display(PIXI.Container) {
  constructor(markus, parent, data) {
    super(markus, parent, data);

    this.defaultProps({
      inlineItems: false
    });

    this.mark.add(data.presets, this);
  }
}
