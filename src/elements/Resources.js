export default class Resources extends PIXI.loaders.Loader {
  constructor(markus, data) {
    super();
    markus.addRoot(this);

    for(let key in data.props) {
      this.add(key, data.props[key]);
    }
  }
}
