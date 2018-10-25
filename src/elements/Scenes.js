import Element from './Element'

export default class Scenes extends Element(PIXI.Container) {
  constructor(view, parent, data) {
    super(view, parent, data);
  }
}
