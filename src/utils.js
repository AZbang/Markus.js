export function isSubsetArray(set, subset) {
  for(let i = 0; i < subset.length; i++) {
    let isInclude = false;
    for(let j = 0; j < set.length; j++) {
      if(set[j] == subset[i]) {
        isInclude = true;
        break;
      }
    }
    if(!isInclude) return false;
  }
  return true;
}
