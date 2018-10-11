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
    let element, depth = 0, id = '', value = '', props = {}, tags = [];

    // element name
    line = line.replace(/\w+/, (elm) => {
      element = elm;
      return '';
    });
    if(element == null) return;

    // depth
    line = line.replace(/^[\t ]+/, (idents) => {
      depth = idents.length/2 || 0;
      return '';
    });

    // attributes
    line = line.replace(/\((.+)\)/, (find, attrsStr) => {
      let attrs = attrsStr.split(/\,\s+?/);
      for(let i = 0; i < attrs.length; i++) {
        let prop = attrs[i].split('=');
        props[prop[0]] = prop[1] != null ? parseValue(prop[1]) : true;
      }
      return '';
    });

    // value
    line = line.replace(/\|\s+?(.+)/, (find, val) => {
      value = val;
      return '';
    });

    // id
    line = line.replace(/#\w+/, (_id) => {
      id = _id;
      return '';
    });

    // tags
    tags = line.replace(/\s/g, '').split('.').slice(1);

    return {element, value, props, tags, id, depth, presets: []};
  }
  parseQuery(query) {
    query = query.replace(/\s/g, '');

    let tags = query.split('.').slice(1);
    let id = (query.match(/\#\w+/) || [''])[0].slice(1);
    let element = (query.match(/^\w+/) || [])[0];
    return {element, id, tags}
  }
}
