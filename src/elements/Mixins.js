import Element from '../mixins/Element';

/**
 * Class store all mixin properties of elements
 * @example
 * mixins
 *  .label
 *    &#64;size 120
 *
 *  sprite.quad
 *    &#64;width 100
 *    &#64;height 100
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 */
export default class Mixins extends Element() {
  constructor(mark, root, data) {
    super(mark, root, data);

    /**
     * Mixins array
     * @member {Object[]}
     */
    this.mixins = data.presets;
  }

  /**
   * Merging mixin with elements props
   * @prop elm {Element} Element for merge
   * @prop [props={}] {Object} Element props
   * @returns {Object} merged elm props with mixin props
   */
  merge(elm, props={}) {
    for(let i = 0; i < this.mixins.length; i++) {
      if(this.mark.isSelectorOfElement(this.mixins[i], elm)) {
        for(let key in this.mixins[i].props) {
          if(Array.isArray(props[key])) {
            props[key] = props[key].concat(this.mixins[i].props[key]);
          }
          else {
            props[key] = this.mixins[i].props[key];
          }
        }
      }
    }
    return props;
  }

  /**
   * Set mixin to store
   * @prop selector {string} Mixin selector
   * @prop props {Object} Mixin props
   */
  set(selector, props) {
    this.mixins[selector] = props;
  }
}
