import Parser from './Parser'
import * as elements from './elements'
import {isSubsetArray} from './utils'
import * as propPlugins from './propPlugins'

export default class View {
  constructor(filepath, onReady, customElms={}, customPropPlugins={}) {
    this.elements = elements;
    this.registerElements(customElms);
    this.propPlugins = propPlugins;
    this.registerPropPlugins(customPropPlugins);

    this.childList = [];

    this.parser = new Parser({loadType: 'ajax'});
    this.parser.parseMarkfile(filepath).then(tree => {

      this.add(tree);
      onReady && onReady(this);
    });

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(dt => this.updateElements(dt));
    this.ticker.start();
  }

  registerElements(elms) {
    Object.assign(this.elements, elms);
  }
  registerPropPlugins(plugs) {
    Object.assign(this.propPlugins, plugs);
  }
  propPlugin(el, key, props) {
    let out = false;
    for(let plug in this.propPlugins) {
      out = !out ? this.propPlugins[plug](el, key, props) : true;
    }
    return out;
  }

  updateElements(dt, elms=this.childList) {
    for(let i = 0; i < elms.length; i++) {
      elms[i].tick && elms[i].tick(dt);
      this.updateElements(dt, elms[i].childList);
    }
  }

  // add element
  add(value, parent=this) {
    let res = []
    if(typeof value === 'string') value = this.parser.parsePreset(value);
    if(!Array.isArray(value)) return this.addPreset(value, parent);
    for(let i = 0; i < value.length; i++) {
      res.push(this.addPreset(value[i], parent));
    }
    return res;
  }
  addPreset(preset, parent=this) {
    if(preset.type !== 'elementNode') throw Error('Preset cannot be activate. His type is not elementNode');
    if(!this.elements[preset.element]) throw Error('Element "' + preset.element + '" is not defined');
    return new this.elements[preset.element](this, parent, preset);
  }

  // remove element
  remove(value, parent=this) {
    if(typeof value === 'string') value = this.get(value, parent);
    if(!Array.isArray(value)) value = [value];
    for(let i = 0; i < value.length; i++) {
      this.removeElement(value[i], value[i].parentElement);
    }
  }
  removeElement(el, parent=this) {
    let index = parent.childList.indexOf(el);
    if(index !== -1) {
      el.onRemove && el.onRemove();
      parent.childList.splice(index, 1);
      if(el instanceof PIXI.DisplayObject) {
        if(parent instanceof PIXI.DisplayObject) parent.removeChild(el);
        else parent.stage.removeChild(el);
      }
    }
  }

  // find element
  get(selector, parent=this) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, parent.childList);
  }
  getAll(selector, parent=this) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, parent.childList, true);
  }
  find(q, elms=[], isAll=false) {
    let res = [];
    for(let i = 0; i < elms.length; i++) {
      if(this.isSelectorOfElement(q, elms[i])) {
        if(isAll) res.push(elms[i]);
        else return elms[i];
      }

      if(elms[i].childList.length) {
        let find = this.find(q, elms[i].childList, isAll);
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
