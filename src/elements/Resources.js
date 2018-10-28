import Element from './Element'

export default class Resources extends Element(PIXI.loaders.Loader) {
  constructor(markus, root, data) {
    // A small "trick" that the superclass Element didn't parse the preset properties directly to the Store class
    let props = data.props;
    data.props = {};
    super(markus, root, data);

    for(let key in props) {
      this.add(key, props[key]);
    }
  }
}
