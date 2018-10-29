export function fullsize(el, key, props) {
  if(props[key] === 'appW') props[key] = el.mark.get('app').width;
  else if(props[key] === 'appH') props[key] = el.mark.get('app').height;
}

export function print(el, key, props) {
  if(key === 'consolelog') {
    console.log(props[key]);
    return true;
  }
}

export function propEvent(el, key, props) {
  if(key === 'on' && typeof props[key] === 'object') {
    console.log(props[key])

    for(let i = 0; i < props[key].length; i++) {
      console.log(props[key][i])
      el.on(props[key][i].value, () => el.updateProps(props[key][i]));
    }
    return true;
  }
}

export function propTween(el, key, props) {
  if(key === 'tween') {
    // add tween props
    return true;
  }
}

export function propObject(el, key, props) {
  if(typeof el[key] === 'object' && el[key] != null) {
    if(typeof props[key] === 'object') Object.assign(el[key], props[key]);
    else if(el[key].set) el[key].set(props[key]);
    if(props[key + 'X']) el[key].x = props[key + 'X'];
    if(props[key + 'Y']) el[key].y = props[key + 'Y'];
    return true;
  }
}
