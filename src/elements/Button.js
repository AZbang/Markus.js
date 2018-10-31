import Sprite from './Sprite';

/**
 * @class
 * @memberof markus.elements
 * @augments markus.elements.Sprite
 */
export default class Button extends Sprite {
  constructor(mark, parent, data) {
    super(mark, parent, data);

    this.interactive = true;
    this.buttonMode = true;
    this.on('pointertap', () => {
      if(this.toScene) {
        this.mark.get('scenes').scene = this.toScene;
      }
    });
  }
}
