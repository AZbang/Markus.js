import Element from '../mixins/Element';

/**
 * Scenes Manager for MarkusJS. Children of this element are separate scenes that can be switched.
 * @example
 * scenes(scene = A)
 *   block(id=A)
 *     text | SCENE A
 *   block(id=B)
 *     text | SCENE B
 *
 * mark.get('scenes').scene = 'B';
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 * @augments PIXI.Container
 */
export default class Scenes extends Element(PIXI.Container) {
  constructor(preset) {
    super(preset);

    /**
     * Scenes presets
     * @member {Preset[]}
     */
    this.scenes = this.presets;
  }

  /**
   * Editable prop. Current scene id
   * @member {string}
   */
  set scene(id) {
    for(let i = 0; i < this.scenes.length; i++) {
      if(this.scenes[i].id === id) {
        this._scene && this.mark.remove(this._scene, this);
        this._scene = this.mark.add(this.scenes[i], this);
      }
    }
  }
  get scene() {
    return this._scene;
  }
}
