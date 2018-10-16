import DisplayElement from './DisplayElement'

export default class Block extends DisplayElement(PIXI.Container) {
  constructor(markus, parent, data) {
    super(markus, parent, data);

    this.inlineItems = data.props.inlineItems || false;
  }
}
