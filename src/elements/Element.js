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
        if(parent instanceof PIXI.DisplayObject) parent.addChild(this);
        else parent.stage.addChild(this);
      }
    }

    updateProps(props) {
      for(let key in props) {
        let out = this.mark.propPlugin(this, key, props);
        if(!out) this[key] = props[key];
      }
    }
    defaultProps(props) {
      for(let key in props) {
        if(this[key] === undefined)
          this.updateProps({[key]: props[key]});
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
