import PIXI from 'pixi.js'

export default class Resources extends PIXI.Loader {
  constructor(markus, props) {
    super();

    for(let key in props) {
      this.add(key, props[key]);
    }
  }
}
