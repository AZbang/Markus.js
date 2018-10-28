import Display from './Display'

export default class Block extends Display(PIXI.Container) {
  constructor(markus, parent, data) {
    super(markus, parent, data);

    this.defaultProps({
      inlineItems: false,
      itemsMarginX: 0,
      itemsMarginY: 0,
      anchorX: 0,
      anchorY: 0
    });

    this.mark.add(data.presets, this);
    this.addTick(() => this._computedBlock());
  }
  _computedBlock() {
    this.x = this.x-this.contentW*this.anchorX;
    this.y = this.y-this.contentH*this.anchorY;

    if(!this.inlineItems) return;
    let x = 0, y = 0;
    let maxh = 0;
    let maxmy = 0;

    for(let i = 0; i < this.children.length; i++) {
      let el = this.children[i];
      let anchorX = el.anchor ? el.anchor.x : el.anchorX;
      let anchorY = el.anchor ? el.anchor.y : el.anchorY;

      el.x = x+el.width*anchorX;
      x += el.width+this.itemsMarginX;
      maxh = Math.max(maxh, el.height);
      if(x > this.contentW) {
        el.x = el.width*anchorX;
        x = el.width+this.itemsMarginX;
        y += maxh+this.itemsMarginY;
        maxh = maxmy = 0;
      }
      el.y = y+el.height*anchorY;
    }
  }
}
