const BasicElement = (superclass=class {}) => class extends superclass {
  constructor(markus, parent, data, arg) {
    console.log(superclass)

    super(arg);

    this.markus = markus;
    this.element = data.element;
    this.tags = data.tags;
    this.id = data.id;
    this.value = data.value;
    this.presets = data.presets;

    this.childList = []
  }

  add(child) {
    this.childList.push(child);
  }
}

export default BasicElement;
