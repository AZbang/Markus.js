import Element from './Element';

export default function Display(superclass) {
  return class extends Element(superclass) {
    constructor(view, parent, data, arg) {
      super(view, parent, data, arg);

      let app = this.mark.get('app');
      this.defaultProps({
        x: 400, y: 400,
        contentW: app.width,
        contentH: app.height,
        marginX: 0, marginY: 0
      });
      this.addTick(() => this._computedPosition());
    }

    set angle(v) {
      this.rotation = v*PIXI.DEG_TO_RAD;
    }
    get angle() {
      return this.rotation*PIXI.RAD_TO_DEG;
    }
    set w(v) {
      this.width = v;
    }
    set h(v) {
      this.height = v;
    }
    set left(v) {
      this._right = null;
      this._centerX = null;
      this._left = v === true ? 0 : v === false ? null : v;
    }
    get left() {
      return this._left;
    }

    set right(v) {
      this._left = null;
      this._centerX = null;
      this._right = v === true ? 0 : v === false ? null : v;
    }
    get right() {
      return this._right;
    }

    set centerX(v) {
      this._left = null;
      this._right = null;
      this._centerX = v === true ? 0 : v === false ? null : v;
    }
    get centerX() {
      return this._centerX;
    }
    get centerXY() {
      return this._centerX === this._centerY ? this._centerX : null;
    }
    set centerXY(v) {
      this.centerX = v;
      this.centerY = v;
    }

    set top(v) {
      this._bottom = null;
      this._centerY = null;
      this._top = v === true ? 0 : v === false ? null : v;
    }
    get top() {
      return this._top;
    }

    set bottom(v) {
      this._top = null;
      this._centerY = null;
      this._bottom = v === true ? 0 : v === false ? null : v;
    }
    get bottom() {
      return this._bottom;
    }

    set centerY(v) {
      this._top = null;
      this._bottom = null;
      this._centerY = v === true ? 0 : v === false ? null : v;
    }
    get centerY() {
      return this._centerY;
    }

    _computedPosition() {
      let w = this.parentElement.contentW || this.mark.get('app').width;
      let h = this.parentElement.contentH || this.mark.get('app').height;

      if(this.left != null) {
        this.x = this.left;
      }
      else if(this.centerX != null) {
        this.x = w/2+this.centerX;
      }
      else if(this.right != null) {
        this.x = w-this.right;
      }

      if(this.top != null) {
        this.y = this.top;
      }
      else if(this.centerY != null) {
        this.y = h/2+this.centerY;
      }
      else if(this.bottom != null) {
        this.y = h-this.bottom;
      }

      if(this.parentElement.anchor) {
        this.x -= w*this.parentElement.anchor.x;
        this.y -= h*this.parentElement.anchor.y;
      }
    }
  };
}
