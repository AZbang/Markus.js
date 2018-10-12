import MarkusParser from './parser'
import * as markusElements from './elements'
import {isSubsetArray} from './utils'

export default class Markus {
  constructor(filepath, elements={}) {
    this.filepath = filepath;
    this.lines = [];
    this.loadType = 'browser';

    this.parser = new MarkusParser(this);
    this.elements = Object.assign(markusElements, elements);
    this.flatPresets = [];
    this.presets = [];
    this.roots = [];
  }
  load(onReady) {
    this.loadFile(this.filepath).then((file) => {
      let data = file.data;
      let imports = data.match(/import .+/g);

      if(imports) {
        let files = [];
        for(let i = 0; i < imports.length; i++) {
          files.push(this.loadFile(imports[i].split(' ')[1]));
        }

        Promise.all(files).then(values => {
          for(let i = 0; i < values.length; i++) {
            data = data.replace('import ' + values[i].path, values[i].data);
          }
          this.parseFile(data);
          onReady && onReady(this);
        }, reason => {
          throw Error(reason);
        });
      } else {
        this.parseFile(data);
        onReady && onReady(this);
      }
    });
  }
  parseFile(data) {
    this.lines = data.split('\n');
    this.flatPresets = this.parser.parsePresets(this.lines);
    this.presets = this.parser.generateTree(this.flatPresets);
    this.activatePresets(this.presets);
  }
  loadFile(path) {
    if(this.loadType === 'browser') {
      return fetch(path).then((res) => {
        if(res.status === 404) throw Error('Markus module "' + path + '" is not found');
        return res.text()
      }).then((data) => {
        return {name: path.split('/').slice(-1)[0], path, data}
      });
    }
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
    if(preset.type !== 'elementNode') throw Error('Preset cannot be activate. His type is not elementNode');

    this.get('styles') && Object.assign(preset.props, this.get('styles').get(preset));
    let elm = new this.elements[preset.element || 'block'](this, preset);
    elm.element = preset.element || 'block';
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
  get(selector) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, this.roots);
  }
  getAll(selector) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, this.roots, true);
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
