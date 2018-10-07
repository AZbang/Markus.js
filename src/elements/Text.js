export default class Text extends PIXI.Text {
  constructor(markus, data) {
    super(data.value);

    this.style.fontSize = data.props.size;
    this.style.fontFamily = data.props.font;
    this.style.fontWeight = data.props.weight || 'normal';
    this.style.fontStyle = data.props.style || 'normal';
    this.style.fill = data.props.color || '#000';

    markus.mixinDisplayGrahic(this, data.props);
  }
}
