import Display from './Display'

export default class Button extends Display(PIXI.Container) {
  constructor(mark, parent, data) {
    super(mark, parent, data);

    this.interactive = true;
    this.buttonMode = true;
    this.on('pointertap', () => {
      console.log( this.mark.get('scenes'))
      if(this.toScene) this.mark.get('scenes').scene = this.toScene;
    });

    this.mark.add(data.presets, this);
  }
}
