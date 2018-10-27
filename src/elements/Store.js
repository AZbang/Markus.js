import Element from './Element'

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
  set(name, val) {
    localStorage.setItem(name, JSON.stringify(val));
  }
  get(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}
