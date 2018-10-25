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

      this.updateProps(preset.props);

      parent && parent.childList.push(this);
      if(this instanceof PIXI.DisplayObject) {
        if(parent instanceof PIXI.DisplayObject) parent.addChild(this);
        else parent.stage.addChild(this);
      }
    }

    updateProps(props) {
      this.mark.get('styles') && Object.assign(props, this.mark.get('styles').get(this));
      for(let key in props) {
        if(typeof this[key] === 'object') {
          if(typeof props[key] === 'object') Object.assign(this[key], props[key]);
          else if(this[key].set) this[key].set(props[key]);
          if(props[key + 'X']) this[key].x = props[key + 'X'];
          if(props[key + 'Y']) this[key].y = props[key + 'Y'];
        } else this[key] = props[key];
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
  }
}
