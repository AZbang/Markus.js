export function parseValue(value) {
  if(/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value))
    return Number(value);
  return value;
}

export function isSubsetArray(set, subset) {
  for(let i = 0; i < subset.length; i++) {
    let isInclude = false;
    for(let j = 0; j < set.length; j++) {
      if(subset[i] === set[i]) {
        isInclude = true;
        break;
      }
    }
    if(!isInclude) return false;
  }
  return true;
}
