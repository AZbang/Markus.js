export default class Resources extends PIXI.loaders.Loader {
  constructor(markus, props) {
    super();

    for(let key in props) {
      this.add(key, props[key]);
    }
  }
}
