import Element from '../mixins/Element';

/**
 * Implementing localStorage for MarkusJS. Properties of this element are saved in localStorage
 * @example
 * store
 *   &#64;level 1
 *   &#64;lang ru
 *   &#64;hero Atlant
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 */
export default class Store extends Element() {
  constructor(mark, parent, data) {
    // A small "trick" that the superclass Element didn't parse the preset properties directly to the Store class
    let props = data.props;
    data.props = {};
    super(mark, parent, data);

    for(let key in props) {
      this.set(key, props[key]);
    }
  }

  /**
   * Get item to localStorage
   * @prop name {string} item name
   * @prop val {any} item value
   */
  set(name, val) {
    localStorage.setItem(name, JSON.stringify(val));
  }

  /**
   * Get item from localStorage
   * @prop name {string} Item name
   * @returns {any} Item value from localStorage
   */
  get(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}
