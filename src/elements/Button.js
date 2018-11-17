import Sprite from './Sprite';

/**
 * Sprite with button behavior
 * @example
 * button(src=button.png)
 *  &#64;toScene=scene_id
 *    text | CLICK ME
 *
 * @class
 * @memberof markus.elements
 * @augments markus.elements.Sprite
 */
export default class Button extends Sprite {
  constructor(preset) {
    super(preset);

    /**
     * toggle scene in scenes manager then button call pointertap event
     * @memberof {markus.elements.Button}
     * @member {string}
     */
    this.toScene = null;

    /**
     * texture button in active state
     * @memberof {markus.elements.Button}
     * @member {string}
     */
    this.activeSrc = this.src;

    /**
     * texture button in inactive state
     * @memberof {markus.elements.Button}
     * @member {string}
     */
    this.inactiveSrc = this.src;

    this.enable = true;
    this.on('pointertap', () => {
      if(this.toScene) {
        this.mark.get('scenes').scene = this.toScene;
      }
    });
  }

  /**
   * Toggle interactive state
   * @memberof {markus.elements.Button}
   * @member {booleon}
   */
  set enable(v) {
    this.interactive = v;
    this.buttonMode = v;
    this.src = (v ? this.activeSrc  : this.inactiveSrc) || this.src;
  }
  get enable() {
    return this.interactive;
  }
}
