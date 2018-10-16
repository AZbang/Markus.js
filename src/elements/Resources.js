import BasicElement from './BasicElement'

export default class Resources extends BasicElement(PIXI.loaders.Loader) {
  constructor(markus, root, data) {
    super(markus, root, data);

    for(let key in data.props) {
      this.add(key, data.props[key]);
    }
  }
}
