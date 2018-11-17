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
  constructor(preset) {
    super(preset);

    /**
     * Mixins array.
     * @member {Object[]}
     */
    this.mixins = this.presets;
  }

  /**
   * Merging mixin with elements props
   * @prop elm {Element} Element for merge
   * @prop [props={}] {Object} Element props
   * @returns {Object} merged elm props with mixin props
   */
  merge(elm, props={}) {
    let parseProps = {};
    for(let i = 0; i < this.mixins.length; i++) {
      if(this.mark.isSelectorOfElement(this.mixins[i], elm)) {
        for(let key in this.mixins[i].props) {
          if(Array.isArray(props[key])) {
            parseProps[key] = props[key].concat(this.mixins[i].props[key]);
          }
          else {
            parseProps[key] = this.mixins[i].props[key];
          }
        }
      }
    }
    return Object.assign({}, props, parseProps);
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
