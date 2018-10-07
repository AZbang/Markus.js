import MarkusParser from './parser'
import * as markusElements from './elements'
import {isSubsetArray} from './utils'

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
      this.activatePresets(this.presets);
      onReady && onReady(this);
    });
  }
  addRoot(elms) {
    if(typeof elms === 'array') this.roots = this.roots.concat(elm);
    else this.roots.push(elms);
  }
  removeRoot(elm) {
    let i = this.root.indexOf(elm);
    if(i != -1) this.root.splice(i, 1);
  }

  mixinDisplayGrahic(el, props) {
    el.width = props.w || el.width;
    el.height = props.h || el.height;

    el.x = props.centerX ? this.get('app').w/2 : (props.x || 0);
    el.y = props.centerY ? this.get('app').h/2 : (props.y || 0);
    el.x += props.marginX || 0;
    el.y += props.marginY || 0;

    el.rotation = props.angle*PIXI.DEG_TO_RAD || 0;

    if(props.scale == null) {
      if(props.scaleX != null) el.scale.x = props.scaleX;
      if(props.scaleY != null) el.scale.y = props.scaleY;
    } else el.scale.set(props.scale, props.scale);

    if(props.anchor == null && el.anchor) {
      el.anchor.x = props.anchorX || 0;
      el.anchor.y = props.anchorY || 0;
    } else el.anchor && el.anchor.set(props.anchor, props.anchor);
  }

  // presets
  activatePreset(preset) {
    let elm = new this.elements[preset.element](this, preset);
    elm.element = preset.element;
    elm.id = preset.id;
    elm.tags = preset.tags;
    return elm;
  }

  activatePresets(presets) {
    let res = [];
    for(let key in presets) {
      res.push(this.activatePreset(presets[key]));
    }
    return res;
  }

  // find objects
  get(queryStr) {
    let q = this.parser.parseQuery(queryStr);
    return this.find(q, this.roots);
  }
  getAll(queryStr) {
    let q = this.parser.parseQuery(queryStr);
    return this.find(q, this.roots, true);
  }
  find(q, elms=[], isAll=false) {
    let res = [];
    for(let i = 0; i < elms.length; i++) {
      let isEl = q.element ? q.element === elms[i].element : true;
      let isId = q.id ? q.id === elms[i].id : true;
      let isTags = isSubsetArray(elms[i].tags, q.tags);

      if(isEl && isId && isTags) {
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
}
