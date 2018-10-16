import MarkusParser from './parser'
import * as markusElements from './elements'
import {isSubsetArray} from './utils'

export class Markus {
  constructor(elements={}) {
    this.parser = new MarkusParser({loadType: 'browser'});
    this.elements = Object.assign(markusElements, elements);
    this.presets = [];
    this.childList = [];

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add((dt) => this.updateElements(dt));
  }

  updateElements(dt, elms=this.childList) {
    for(let i = 0; i < elms.length; i++) {
      elms[i].update && elms[i].update(dt);
      this.updateElements(dt, elms[i].childList);
    }
  }

  add(filepath) {
    return new Promise((resolve) => {
      this.parser.parseMarkfile(filepath).then((tree) => {
        this.presets = tree;
        this.activatePresets(this, this.presets);
        resolve(this);
      })
    })
  }

  createElement(parent, str) {
    let preset = this.parser.parsePreset(str);
    return this.activatePreset(parent, parent);
  }

  // presets
  activatePreset(root, preset) {
    if(preset.type !== 'elementNode') throw Error('Preset cannot be activate. His type is not elementNode');
    if(!this.elements[preset.element]) throw Error('Element "' + preset.element + '" is not defined');

    this.get('styles') && Object.assign(preset.props, this.get('styles').get(preset));
    root.childList.push(new this.elements[preset.element](this, root, preset));
  }

  activatePresets(parent, presets) {
    let res = [];
    for(let key in presets) {
      res.push(this.activatePreset(parent, presets[key]));
    }
    return res;
  }

  addRoot(elms) {
    if(typeof elms === 'array') this.childList = this.childList.concat(elm);
    else this.childList.push(elms);
  }
  removeRoot(elm) {
    let i = this.childList.indexOf(elm);
    if(i != -1) this.childList.splice(i, 1);
  }

  // find objects
  get(selector) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, this.childList);
  }
  getAll(selector) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, this.childList, true);
  }
  find(q, elms=[], isAll=false) {
    let res = [];
    for(let i = 0; i < elms.length; i++) {
      if(this.isSelectorOfElement(q, elms[i])) {
        if(isAll) res.push(elms[i]);
        else return elms[i];
      }

      if(elms[i].children || elms[i].stage) {
        let find = this.find(q, elms[i].children || elms[i].stage.children, isAll);
        if(!isAll && find) return find;
        else res = res.concat(find);
      }
    }
    return isAll ? res : null;
  }
  isSelectorOfElement(q, elm) {
    let isEl = q.element ? q.element === elm.element : true;
    let isId = q.id ? q.id === elm.id : true;
    let isTags = isSubsetArray(elm.tags, q.tags);

    return isEl && isId && isTags;
  }
}
