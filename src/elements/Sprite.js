import DisplayElement from './DisplayElement'

export default class Sprite extends DisplayElement(PIXI.Sprite) {
  constructor(markus, parent, data) {
    super(markus, parent, data, data.props.texture ? PIXI.Texture.fromImage(data.props.texture) : PIXI.Texture.WHITE);

    
  }
}
