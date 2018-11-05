/**
  * Additional logic for the properties of the element. Plugins are called every time a property is passed to an element.
  *
  * @example
  * function plugin(el, keyProp, allProps) {
  *  if(allProps[keyProp] === 'somevalue') {
  *    // do somethin
  *    return true // if true, the property will no longer be processed by other plugins.
  *  }
  * }
  * @namespace markus.propPlugins
*/


/**
 * Replaces appW to application width and appH to application height.
 * @memberof markus.propPlugins
 * @arg el {Element}
 * @arg key {string}
 * @arg props {Object}
*/
function fullsize(el, key, props) {
  if(props[key] === 'appW') {
    props[key] = el.mark.get('app').width;
  }
  else if(props[key] === 'appH') {
    props[key] = el.mark.get('app').height;
  }
}

/**
 * Print prop "consolelog" value to console. Return true
 * @memberof markus.propPlugins
 * @arg el {Element}
 * @arg key {string}
 * @arg props {Object}
 */
function print(el, key, props) {
  if(key === 'consolelog') {
    window.console.log(props[key]);
    return true;
  }
}

export {
  fullsize, print
};
