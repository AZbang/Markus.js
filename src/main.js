import * as elms from './elements/index';
import * as mixins from './mixins/index';
import * as plugs from './propPlugins';
import * as utils from './utils';
/**
 * @namespace markus
 */

/**
 * All elements
 * @memberof markus
 * @member {Element[]}
 * @static
 */
const elements = elms;

/**
 * Custom elements props plugins
 * @memberof markus
 * @member {Element[]}
 * @static
 */
const propPlugins = plugs;

/**
 * Add new elements
 * @static
 * @memberof markus
 * @param elms {Element[]} Your custom elements to be used in the markfile
 */
function registerElements(elms) {
  Object.assign(elements, elms);
}

/**
 * Add new prop plugins
 * @memberof markus
 * @static
 * @param plugs {Object[]} Your custom elements to be used in the markfile
 */
function registerPropPlugins(plugs) {
  Object.assign(propPlugins, plugs);
}

export {
  elements,
  propPlugins,
  mixins,
  utils,
  registerElements,
  registerPropPlugins
};
