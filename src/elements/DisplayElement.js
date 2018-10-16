import BasicElement from './BasicElement'

const DisplayElement = (pixiClass) => class extends BasicElement(pixiClass) {
  constructor(markus, parent, data, arg) {
    super(markus, parent, data, arg);

    // Computed thisement Position
    if(props.centerX != null) this.x = parent.width/2;
    else if(props.left != null) this.x = props.left;
    else if(props.right != null) this.x = parent.width-props.right;
    else this.x = props.x || 0;

    if(props.centerY != null) this.y = parent.height/2;
    else if(props.top != null) this.y = props.top;
    else if(props.bottom != null) this.y = parent.height-props.bottom;
    else this.y = props.y || 0;

    this.x += props.marginX || 0;
    this.y += props.marginY || 0;

    // Computed thisement transform
    this.width = props.w || this.width;
    this.height = props.h || this.height;
    this.angle = props.angle || 0;

    if(props.scale == null) {
      if(props.scaleX != null) this.scale.x = props.scaleX;
      if(props.scaleY != null) this.scale.y = props.scaleY;
    } else this.scale.set(props.scale, props.scale);

    if(props.anchor == null && this.anchor) {
      this.anchor.x = props.anchorX || 0;
      this.anchor.y = props.anchorY || 0;
    } else this.anchor && this.anchor.set(props.anchor, props.anchor);

    markus.activatePresets(this, data.presets);
  }
  set angle(deg) {
    if(typeof deg != 'number') return;
    this.rotation = deg*PIXI.DEG_TO_RAD;
  }
}

export default DisplayElement;
