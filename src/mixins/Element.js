// import {propPlugins} from '../main.js';

/**
 * @class
 * @name Element
 * @memberof markus.mixins
 */
export default function Element(superclass=class{}) {
  return class extends superclass {
    constructor(view, parent, preset, arg) {
      super(arg);

      this.mark = view;
      this.element = preset.element;
      this.id = preset.id;
      this.tags = preset.tags;
      this.presets = preset.presets;
      this.parentElement = parent;
      this.value = preset.value;

      this.childList = [];
      this.ticks = [];

      this.mark.get('mixins') && this.mark.get('mixins').merge(this, preset.props);
      this.updateProps(preset.props);

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
    defaultProps(props) {
      for(let key in props) {
        if(this[key] === undefined) {
          this.updateProps({[key]: props[key]});
        }
      }
    }
    addTick(cb) {
      this.ticks.push(cb);
    }
    tick(dt) {
      for(let i = 0; i < this.ticks.length; i++) {
        this.ticks[i](dt);
      }
    }
  };
}
