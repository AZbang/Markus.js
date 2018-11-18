// import {propPlugins} from '../main.js';

/**
 * Mixin for additional functionality for all markus elements
 * @class Element
 * @param superclass {Class} Parent class
 * @memberof markus.mixins
 *
 * @example
 * let containerWithElementMix = new markus.mixins.Display(PIXI.Container);
 * containerWithElementMix({view, parent, ...preset}, argForParentClass);
 */
export default function Element(superclass=class{}) {
  return class extends superclass {
    constructor(preset, arg) {
      super(arg);

      /**
       * Root view class
       * @memberof markus.mixins.Element
       * @member {markus.View}
       */
      this.mark = preset.view;

      /**
       * Element name
       * @readonly
       * @memberof markus.mixins.Element
       * @member {string}
       */
      this.element = preset.element;

      /**
       * Presets list
       * @memberof markus.mixins.Element
       * @member {markus.View}
       */
      this.presets = preset.presets;

      /**
       * Element id
       * @readonly
       * @memberof markus.mixins.Element
       * @member {string}
       */
      this.id = preset.id;

      /**
       * Element tags
       * @memberof markus.mixins.Element
       * @member {string[]}
       */
      this.tags = preset.tags.slice(0);

      /**
       * Parent node
       * @memberof markus.mixins.Element
       * @member {Element}
       */
      this.parentElement = preset.parent || preset.view;

      /**
       * Childs list
       * @memberof markus.mixins.Element
       * @member {Element[]}
       */
      this.childList = [];

      /**
       * Аrray of functions called every tick
       * @memberof markus.mixins.Element
       * @member {function[]}
       */
      this.ticks = [];

      /**
       * Element properties from markus markup
       * @readonly
       * @memberof markus.mixins.Element
       * @member {function[]}
       */
      this.props = preset.props;

      this._bindToParentNode();
    }

    _bindToParentNode() {
      this.parentElement.childList.push(this);
      if(this instanceof PIXI.DisplayObject) {
        if(this.parentElement instanceof PIXI.DisplayObject) {
          this.parentElement.addChild(this);
        }
        else {
          this.parentElement.stage.addChild(this);
        }
      }
    }

    /**
     * Add tag to tags list and app mixin props
     * @memberof markus.mixins.Element
     * @param props {string} tagName
     */
    addTag(tag) {
      if(this.tags.indexOf(tag) === -1) {
        this.tags.push(tag);
      }
    }

    /**
     * Remove tag from tags list and reuse mixins props
     * @memberof markus.mixins.Element
     * @param props {string} tagName
     */
    removeTag(tag) {
      let index = this.tags.indexOf(tag);
      if(index !== -1) {
        this.tags.splice(index, 1);
      }
    }

    /**
     * Set props to element
     * @memberof markus.mixins.Element
     * @param props {Object} Props object
     */
    setProps(props) {
      for(let key in props) {
        // call custom prop plugins
        // for(let plug in propPlugins) {
        //   if(propPlugins[plug](this, key, props)) {
        //     continue propsEach;
        //   }
        // }
        //
        //

        if(typeof props[key] === 'function') {
          props[key].call(this);
        }

        // parse events prop
        else if(key === 'on' && typeof props[key] === 'object') {
          for(let event in props[key]) {
            this.on(event, () => {
              this.setProps(props[key][event]);
            });
          }
        }

        else if(Array.isArray(this[key])) {
          this[key] = this[key].concat(props[key]);
        }

        else if(typeof this[key] === 'object' && this[key] != null && this[key].set) {
          if(typeof props[key] === 'object') {
            this[key].x = props[key].x;
            this[key].y = props[key].y;
          }
          else {
            this[key].set(props[key]);
          }
        }

        else if(typeof this[key] === 'object' && this[key] != null && typeof props[key] === 'object') {
          Object.assign(this[key], props[key]);
        }

        else {
          this[key] = props[key];
        }
      }
    }

    /**
     * Add function to ticks array
     * @memberof markus.mixins.Element
     * @param cb {funciton} Every tick is called
     */
    addTick(cb) {
      this.ticks.push(cb);
    }

    /**
     * Main tick method. Each tick is called in view.updateElements
     * @memberof markus.mixins.Element
     * @private
     */
    tick(dt) {
      for(let i = 0; i < this.ticks.length; i++) {
        this.ticks[i](dt);
      }
    }
  };
}
