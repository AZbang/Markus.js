/**
 * @namespace markus.utils
 */

/**
 * Checks if a subset belongs to a set
 * @memberof markus.utils
 * @param {Array} set - Given set
 * @param {Array} subset - Given subset
 * @returns {booleon}
 * @example
 * // return false
 * isSubsetArray([1, 2, 3, 5], [1, 4])
 */
export function isSubsetArray(set, subset) {
  for(let i = 0; i < subset.length; i++) {
    let isInclude = false;
    for(let j = 0; j < set.length; j++) {
      if(set[j] === subset[i]) {
        isInclude = true;
        break;
      }
    }
    if(!isInclude) {
      return false;
    }
  }
  return true;
}
