import Element from './Element';


export default class Mixins extends Element() {
  constructor(mark, root, data) {
    super(mark, root, data);
    this.mixins = data.presets;
  }
  merge(elm, props) {
    for(let i = 0; i < this.mixins.length; i++) {
      if(this.mark.isSelectorOfElement(this.mixins[i], elm)) {
        for(let key in this.mixins[i].props) {
          if(Array.isArray(props[key])) {
            props[key] = props[key].concat(this.mixins[i].props[key]);
          }
          else {
            props[key] = this.mixins[i].props[key];
          }
        }
      }
    }
    return props;
  }
  set(selector, props) {
    this.mixins[selector] = props;
  }
}
