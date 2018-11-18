import Element from './Element';

/**
 * Mixin for additional functionality for all pixi elements
 *
 * @class
 * @name Display
 * @param superclass {Class} Parent class
 * @mixes markus.mixins.Element
 * @memberof markus.mixins
 *
 * @example
 * let containerWithDisplayAndElementMix = new markus.mixins.Display(PIXI.Container);
 * containerWithDisplayAndElementMix({view, parent, ...preset}, argForParentClass);
 */
export default function Display(superclass) {
  return class extends Element(superclass) {
    constructor(preset, arg) {
      super(preset, arg);

      this.app = this.mark.get('app');

      /**
       * The width of the area of allowable positions children of the element
       * @member {number}
       * @memberof markus.mixins.Display
       */
      this.contentW = this.app.width;

      /**
       * The height of the area of allowable positions children of the element
       * @member {number}
       * @memberof markus.mixins.Display
       */
      this.contentH = this.app.height;

      this.addTick(() => this._computedPosition());
    }

    /**
     * Angle in degrees
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set angle(v) {
      this.rotation = v*PIXI.DEG_TO_RAD;
    }
    get angle() {
      return this.rotation*PIXI.RAD_TO_DEG;
    }


    /**
     * Short setter for width
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set w(v) {
      this.width = v;
    }

    /**
     * Short setter for height
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set h(v) {
      this.height = v;
    }

    /**
     * Positioning the element relative to the left edge of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set left(v) {
      this._right = null;
      this._centerX = null;
      this._left = v === true ? 0 : v === false ? null : v;
    }
    get left() {
      return this._left;
    }

    /**
     * Positioning the element relative to the right edge of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set right(v) {
      this._left = null;
      this._centerX = null;
      this._right = v === true ? 0 : v === false ? null : v;
    }
    get right() {
      return this._right;
    }

    /**
     * Positioning the element relative to the horizontal center of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set centerX(v) {
      this._left = null;
      this._right = null;
      this._centerX = v === true ? 0 : v === false ? null : v;
    }
    get centerX() {
      return this._centerX;
    }

    /**
     * Positioning the element relative to the horizontal and vertical center of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    get centerXY() {
      return this._centerX === this._centerY ? this._centerX : null;
    }
    set centerXY(v) {
      this.centerX = v;
      this.centerY = v;
    }


    /**
     * Positioning the element relative to the top edge of the parent
     * @memberof markus.mixins.Display
     * @member {v}
     */
    set top(v) {
      this._bottom = null;
      this._centerY = null;
      this._top = v === true ? 0 : v === false ? null : v;
    }
    get top() {
      return this._top;
    }


    /**
     * Positioning the element relative to the bottom edge of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set bottom(v) {
      this._top = null;
      this._centerY = null;
      this._bottom = v === true ? 0 : v === false ? null : v;
    }
    get bottom() {
      return this._bottom;
    }

    /**
     * Positioning the element relative to the vertical center of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    set centerY(v) {
      this._top = null;
      this._bottom = null;
      this._centerY = v === true ? 0 : v === false ? null : v;
    }
    get centerY() {
      return this._centerY;
    }

    _computedPosition() {
      let w = this.parentElement.contentW || this.app.width;
      let h = this.parentElement.contentH || this.app.height;

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
        this.x = this.x-w*this.parentElement.anchor.x;
        this.y = this.y-h*this.parentElement.anchor.y;
      }
    }
  };
}
