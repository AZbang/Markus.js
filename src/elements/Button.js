import Container from './Block'

export default class Button extends Container {
  constructor(mark, parent, data) {
    super(mark, parent, data);

    this.interactive = true;
    this.buttonMode = true;
    this.on('pointertap', () => {
      if(this.toScene) this.mark.get('scenes').scene = this.toScene;
    });

    this.mark.add(data.presets, this);
  }
}
