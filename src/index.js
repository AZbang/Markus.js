import MarkusParser from './parser'
import * as markusElements from './elements'

export default class Markus {
  constructor(filepath, elements={}) {
    this.filepath = filepath;
    this.filename = filepath.split('/').slice(-1)[0];
    this.lines = [];

    this.parser = new MarkusParser(this);
    this.elements = Object.assign(markusElements, elements);
    this.flatPresets = [];
    this.presets = [];
    this.roots = [];
  }
  load(onReady) {
    PIXI.loader.add(this.filepath).load((loader, res) => {
      this.lines = res[this.filename].data.split('\n');
      this.flatPresets = this.parser.parsePresets(this.lines);
      this.presets = this.parser.generateTree(this.flatPresets);
      this.roots.push(this.activatePresets(this.presets));
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
