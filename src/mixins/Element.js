// import {propPlugins} from '../main.js';

/**
 * Mixin for additional functionality for all markus elements
 * @class Element
 * @param superclass {Class} Parent class
 * @memberof markus.mixins
 *
 * @example
 * let containerWithElementMix = new markus.mixins.Display(PIXI.Container);
 * containerWithElementMix(view, parent, preset, argForParentClass);
 */
export default function Element(superclass=class{}) {
  return class extends superclass {
    constructor(view, parent, preset, arg) {
      super(arg);

      /**
       * Root view class
       * @memberof markus.mixins.Element
       * @member {markus.View}
       */
      this.mark = view;

      /**
       * Element name
       * @memberof markus.mixins.Element
       * @member {string}
       */
      this.element = preset.element;

      /**
       * Element id
       * @memberof markus.mixins.Element
       * @member {string}
       */
      this.id = preset.id;

      /**
       * Element tags
       * @memberof markus.mixins.Element
       * @member {string[]}
       */
      this.tags = preset.tags;

      /**
       * Parent node
       * @memberof markus.mixins.Element
       * @member {Element}
       */
      this.parentElement = parent;

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


      // set props
      this.mark.get('mixins') && this.mark.get('mixins').merge(this, preset.props);
      this.updateProps(preset.props);

      // add to parent node
      parent && parent.childList.push(this);
      if(this instanceof PIXI.DisplayObject) {
        if(parent instanceof PIXI.DisplayObject) {
          parent.addChild(this);
        }
        else {
          parent.stage.addChild(this);
        }
      }
    }


    /**
     * Set props to element
     * @memberof markus.mixins.Element
     * @param props {Object} Props object
     */
    updateProps(props) {
      for(let key in props) {
        // call custom prop plugins
        // for(let plug in propPlugins) {
        //   if(this.propPlugins[plug](this, key, props)) {
        //     continue propsCycle;
        //   }
        // }

        // parse events prop
        if(key === 'on' && typeof props[key] === 'object') {
          for(let i = 0; i < props[key].length; i++) {
            this.on(props[key][i].value, () => this.updateProps(props[key][i]));
          }
          return true;
        }

        // parse object prop and points
        else if(typeof this[key] === 'object' && this[key] != null) {
          if(typeof props[key] === 'object') {
            Object.assign(this[key], props[key]);
          }
          else if(this[key].set) {
            this[key].set(props[key]);
          }
          if(props[key + 'X']) {
            this[key].x = props[key + 'X'];
          }
          if(props[key + 'Y']) {
            this[key].y = props[key + 'Y'];
          }
        }
        else {
          this[key] = props[key];
        }
      }
    }

    /**
     * Set standard property values if they do not value
     * @memberof markus.mixins.Element
     * @param props {Object} Props obect
     */
    defaultProps(props) {
      for(let key in props) {
        if(this[key] === undefined) {
          this.updateProps({[key]: props[key]});
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
