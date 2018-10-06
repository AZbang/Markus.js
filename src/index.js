import PIXI from 'pixi.js'
import MarkusParser from './parser'
import markusElements from './elements'

export default class Markus {
  constructor(filepath, elements={}) {
    this.filepath = filepath;

    this.elements = Object.assign(markusElements, elements);
    this.presets = [];
    this.roots = [];
  }
  load(onReady) {
    PIXI.loader.add(this.filepath).load((data) => {
      this.presets = new MarkusParser(data);
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
    for(let preset of presets) {
      res.push(this.activatePreset(preset));
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
