import Element from './Element'

export default class Resources extends Element(PIXI.loaders.Loader) {
  constructor(markus, root, data) {
    super(markus, root, data);

    for(let key in data.props) {
      this.add(key, data.props[key]);
    }
  }
}
