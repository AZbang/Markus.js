export default class Sprite extends PIXI.Sprite {
  constructor(markus, data) {
    super(data.props.texture ? PIXI.Texture.fromImage(data.props.texture) : PIXI.Texture.WHITE);
    markus.mixinDisplayGrahic(this, data.props);
  }
}
