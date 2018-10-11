export default class Styles {
  constructor(markus, data) {
    this.markus = markus;
    this.markus.addRoot(this);
    this.styles = data.presets;
  }
  get(elm) {
    let props = {};
    for(let i = 0; i < this.styles.length; i++) {
      if(this.markus.isSelectorOfElement(this.styles[i], elm))
        Object.assign(props, this.styles[i].props);
    }
    return props;
  }
}
