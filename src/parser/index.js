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
              presets[j].value = presets[i].value + (presets[j].value ? '\n' + presets[j].value : '');
            }

            else if(presets[j].type === 'elementNode') {
              presets[j].presets.unshift(presets[i]);
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
    let element = this.getElement(line);
    let depth = this.getDepth(line);
    let tags = this.getTags(line);
    let value = this.getValue(line);
    let id = this.getId(line);
    let props = [];

    if(element == null) {
      if(tags.length || id) element = 'block';
      else if(value) type = 'valueNode';
      else return;
    }

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
