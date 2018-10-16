import DisplayElement from './DisplayElement'

export default class Text extends DisplayElement(PIXI.Text) {
  constructor(markus, parent, data) {
    super(markus, parent, data, data.value);

    this.style.fontSize = data.props.size;
    this.style.fontFamily = data.props.font;
    this.style.fontWeight = data.props.weight || 'normal';
    this.style.fontStyle = data.props.style || 'normal';
    this.style.fill = data.props.color || '#000';
  }
}
