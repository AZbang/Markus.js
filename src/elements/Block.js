import Display from '../mixins/Display';

/**
 * Container with additional logic positioning for children
 * @example
 * block
 *  &#64;inlineItems
 *  &#64;itemsMarginX 10
 *  &#64;itemsMarginX 10
 *  &#64;contentW 300
 *  &#64;contentH 300
 *  &#64;anchorX .5
 *  &#64;anchorY .5
 *    sprite(src=image.png)
 *    sprite(src=image.png)
 *    sprite(src=image.png)

 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Container
 */
export default class Block extends Display(PIXI.Container) {
  constructor(preset) {
    super(preset);

    /**
     * Position items as a inline list.
     * @memberof {markus.elements.Block}
     * @member {booleon}
     */
    this.inlineItems = false;

    /**
     * Indent by x for elements in inline positioning
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.itemsMarginX = 0;

    /**
     * Indent by y for elements in inline positioning
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.itemsMarginY = 0;

    /**
     * anchor by x positioning the block relative to contentW
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.anchorX = 0;

    /**
     * anchor by y positioning the block relative to contentW
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.anchorY = 0;


    this.mark.add(this.presets, this);
    this.addTick(() => this._computedBlock());
  }

  _computedBlock() {
    // computed position with anchor
    this.x = this.x-this.contentW*this.anchorX;
    this.y = this.y-this.contentH*this.anchorY;

    if(!this.inlineItems) {
      return;
    }

    // computed position for inline items
    let x = 0, y = 0;
    let maxh = 0;
    for(let i = 0; i < this.children.length; i++) {
      let el = this.children[i];
      let anchorX = el.anchor ? el.anchor.x : el.anchorX;
      let anchorY = el.anchor ? el.anchor.y : el.anchorY;

      el.x = x+el.width*anchorX;
      x += el.width+this.itemsMarginX;
      maxh = Math.max(maxh, el.height);
      if(x > this.contentW) {
        el.x = el.width*anchorX;
        x = el.width+this.itemsMarginX;
        y += maxh+this.itemsMarginY;
      }
      el.y = y+el.height*anchorY;
    }
  }
}
