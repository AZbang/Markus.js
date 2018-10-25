import Element from './Element'


export default class Styles extends Element() {
  constructor(markus, root, data) {
    super(markus, root, data)
    this.styles = data.presets;
  }
  get(elm) {
    let props = {};
    for(let i = 0; i < this.styles.length; i++) {
      if(this.mark.isSelectorOfElement(this.styles[i], elm))
        Object.assign(props, this.styles[i].props);
    }
    return props;
  }
  set(selector, props) {
    this.styles[selector] = props;
  }
}
