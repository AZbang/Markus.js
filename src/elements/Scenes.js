import Element from './Element'

export default class Scenes extends Element(PIXI.Container) {
  constructor(view, parent, data) {
    super(view, parent, data);
  }
  set scene(id) {
    for(let i = 0; i < this.presets.length; i++) {
      if(this.presets[i].id === id) {
        this._scene && this.mark.remove(this._scene, this);
        this._scene = this.mark.add(this.presets[i], this);
      }
    }
  }
  get scene() {
    return this._scene;
  }
}
