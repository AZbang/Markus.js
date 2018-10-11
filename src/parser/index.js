// The first version of the parser based on RegExp. In the future, needs a faster solution.
// 0.1.0v
import {parseValue} from '../utils'

export default class MarkusParser {
  constructor(markus) {
    this.markus = markus;
  }
  generateTree(presets) {
    let tree = [];
    for(let i = presets.length-1; i >= 0; i--) {
      if(presets[i].depth !== 0) {
        for(let j = i-1; j >= 0; j--) {
          if(presets[j].depth < presets[i].depth) {

            if(presets[i].type === 'valueNode') {
              if(presets[j].type === 'elementNode')
                presets[j].value = presets[i].value + (presets[j].value ? '\n' + presets[j].value : '');
              else if(presets[j].type === 'propNode') {
                if(presets[j].value === true) presets[j].value = '';
                presets[j].value = presets[i].value + (presets[j].value ? '\n' + presets[j].value : '');
              } else throw Error('valueNode cannot be a child of a ' + presets[j].type);
            }

            if(presets[i].type === 'propNode') {
              if(presets[j].type === 'propNode') {
                if(typeof presets[i].value !== 'object') presets[i].value = {value: presets[i].value};
                Object.assign(presets[j].value, {[presets[i].name]: presets[i].value})
              } else if(presets[j].type === 'elementNode') {
                Object.assign(presets[j].props, {[presets[i].name]: presets[i].value})
              } else throw Error('propNode cannot be a child of a ' + presets[j].type);
            }

            else if(presets[i].type === 'elementNode') {
              if(presets[j].type === 'elementNode') presets[j].presets.unshift(presets[i]);
              else throw Error('elementNode cannot be a child of a ' + presets[j].type);
            }

            break;
          }
        }
      } else tree.push(presets[i]);
    }
    return   tree;
  }
  parsePresets(lines) {
    let presets = [];
    for(let i = 0; i < lines.length; i++) {
      let preset = this.parseLine(lines[i]);
      if(preset != null) presets.push(preset);
    }
    return presets;
  }
  parseLine(line) {
    let type = 'elementNode';
    let depth = this.getDepth(line);

    // if line is attr node
    let attr = this.getAttr(line);
    if(attr) {
      type = 'propNode';
      return {type, depth, name: attr[0], value: attr[1]}
    }

    // else line is element, empty or value node
    let element = this.getElement(line);
    let tags = this.getTags(line);
    let value = this.getValue(line);
    let id = this.getId(line);
    let props = [];

    // if element is undefined, then line is block or value node
    if(element == null) {
      if(tags.length || id) element = 'block';
      else if(value) type = 'valueNode';
      else return;
    }

    // if line is elementNode, then parse props
    if(type !== 'valueNode') {
      props = this.getProps(line);
    }

    return {type, element, value, props, tags, id, depth, presets: []};
  }
  getDepth(line) {
    return (line.match(/^[\t ]+/) || [''])[0].length/2;
  }
  parseQuery(query) {
    let tags = (query.match(/\.\w+/g) || []).map((tag) => tag.slice(1));
    let id = (query.match(/\#\w+/) || [''])[0].slice(1);
    let element = (query.match(/^\w+/) || [])[0];
    return {element, id, tags}
  }
  getElement(line) {
    return (line.match(/^[\t ]*(\w+)/) || [])[1];
  }
  getTags(line) {
    return (line.replace(/\(.+\)/, '').match(/\.\w+/g) || []).map((tag) => tag.slice(1));
  }
  getId(line) {
    return (line.replace(/\(.+\)/, '').match(/#\w+/) || [''])[0].slice(1);
  }
  getValue(line) {
    return (line.match(/\| *(.+)/) || [])[1] || '';
  }
  getAttr(line) {
    let prop = line.match(/^[\t ]*@(\w+)(\s(.+))?/);
    if(prop) return [prop[1], prop[3] != null ? parseValue(prop[3]) : true]
  }
  getProps(line) {
    let res = {};
    let find = line.match(/\((.+)\)/g);
    if(find == null) return {};

    let props = find[0].split(/,\s+/);
    for(let key in props) {
      let prop = props[key].replace('(', '').replace(')', '').split('=');
      res[prop[0]] = prop[1] != null ? parseValue(prop[1]) : true;
    }
    return res;
  }
}
