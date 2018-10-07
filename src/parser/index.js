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
            presets[j].presets.push(presets[i]);
            break;
          }
        }
      } else tree.push(presets[i]);
    }
    return tree;
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
    let element = this.getElement(line);
    if(element == null) return;

    let depth = this.getDepth(line);
    let props = this.getProps(line);
    let tags = this.getTags(line);
    let value = this.getValue(line);
    let id = this.getId(line);

    return {element, value, props, tags, id, depth, presets: []};
  }
  getDepth(line) {
    let chars = line.split('');
    let depth = 0;

    for(let i = 0; i < chars.length; i++) {
      if(chars[i] !== ' ') return depth/2;
      depth++;
    }
  }
  parseQuery(query) {
    let tags = (query.match(/\.\w+/) || []).map((tag) => tag.slice(1));
    let id = (query.match(/\#\w+/) || [''])[0].slice(1);
    let element = (query.match(/^\w+/) || [])[0];
    return {element, id, tags}
  }
  getElement(line) {
    return (line.match(/\w+/) || [])[0];
  }
  getTags(line) {
    return (line.replace(/\(.+\)/, '').match(/\.\w+/g) || []).map((tag) => tag.slice(1));
  }
  getId(line) {
    return (line.replace(/\(.+\)/, '').match(/#\w+/) || [''])[0].slice(1);
  }
  getValue(line) {
    return line.replace(/\(.+\)/, '').replace(/\w+/, '').replace(/ +/, '');
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
