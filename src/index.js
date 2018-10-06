import MarkusParser from './parser'
import * as markusElements from './elements'

export default class Markus {
  constructor(filepath, elements={}) {
    this.filepath = filepath;
    this.filename = filepath.split('/').slice(-1)[0];

    this.elements = Object.assign(markusElements, elements);
    this.presets = [];
    this.roots = [];
  }
  load(onReady) {
    PIXI.loader.add(this.filepath).load((loader, res) => {
      this.presets = new MarkusParser(res[this.filename].data);
      // this.roots.push(this.activatePresets(this.presets));
      onReady && onReady(this);
    });
  }

  // presets
  activatePreset(preset) {
    return new this.elements[preset.element](this, preset);
  }

  activatePresets(presets) {
    let res = [];
    for(let key in presets) {
      res.push(this.activatePreset(presets[key]));
    }
    return res;
  }

  // find objects
  getPreset(query, presets=this.presets) {

  }
  getPresets(query, presets=this.presets) {

  }
  getElement(query, elements=this.view) {

  }
  getElements(query, elements=this.view) {

  }
}
