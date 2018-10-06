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
    let id = this.getId(line);

    return {element, props, tags, id, depth, presets: []};
  }
  getDepth(line) {
    let chars = line.split('');
    let depth = 0;

    for(let i = 0; i < chars.length; i++) {
      if(chars[i] !== ' ') return depth/2;
      depth++;
    }
  }
  getElement(line) {
    return (line.match(/\w+/) || [])[0];
  }
  getTags(line) {
    return line.replace(/\(.+\)/, '').match(/\.\w+/g) || [];
  }
  getId(line) {
    return (line.replace(/\(.+\)/, '').match(/#\w+/) || [])[0] || '';
  }
  getProps(line) {
    let res = {};
    let props = line.replace(/ /g, '').match(/(\w+)=([\w\.]+)/g);
    if(props != null) {
      for(let key in props) {
        let prop = props[key].split('=');
        res[prop[0]] = prop[1];
      }
    }

    return res;
  }
}
