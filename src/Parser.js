/**
 * Marklang Parser
 * @example
 * const parser = new markus.Parser();
 * await parser.parseMarkfile('mark.view');
 * > [{type="elementNode", element: 'app', props: {...}, presets: [...]}]
 * @class
 * @memberof markus
 * @param [loadType=ajax] {string} Method of loading markfile
 */
export default class Parser {
  constructor(loadType='ajax') {
    this.loadType = loadType;
  }

  parseMarkfile(filepath) {
    return new Promise((resolve) => {
      this.imports([filepath]).then((data) => {
        let entry = data[0].data;
        let imports = this.getImports(entry);

        this.imports(imports).then((files) => {
          for(let i = 0; i < files.length; i++) {
            if(this.getImports(files[i].data).length) {
              throw Error('Imports are possible only in the entry file.');
            }
            entry = entry.replace('import ' + files[i].path, files[i].data);
          }

          let presets = this.parsePresets(entry.split('\n'));
          resolve(this.generateTree(presets));
        });
      });
    });
  }

  imports(pathes) {
    let files = [];
    for(let i = 0; i < pathes.length; i++) {
      if(this.loadType === 'ajax') {
        files.push(fetch(pathes[i])
          .then((res) => {
            if(res.status === 404) {
              throw Error('Markus module "' + pathes[i] + '" is not found');
            }
            return res.text();
          }).then((data) => {
            return {name: pathes[i].split('/').slice(-1)[0], path: pathes[i], data};
          })
        );
      }
    }
    return Promise.all(files);
  }

  generateTree(presets) {
    let tree = [];
    for(let i = presets.length-1; i >= 0; i--) {
      if(presets[i].depth !== 0) {
        for(let j = i-1; j >= 0; j--) {
          if(presets[j].depth < presets[i].depth) {
            let parent = presets[j];
            let child = presets[i];

            if(child.type === 'valueNode') {
              if(parent.type === 'elementNode') {
                parent.value = child.value + (parent.value ? '\n' + parent.value : '');
              }
              else if(parent.type === 'propNode') {
                if(parent.value === true) {
                  parent.value = '';
                }
                parent.value = child.value + (parent.value ? '\n' + parent.value : '');
              }
              else {
                throw Error('valueNode cannot be a child of a ' + parent.type);
              }
            }

            if(child.type === 'propNode') {
              if(parent.type === 'propNode') {
                if(typeof parent.value !== 'object') {
                  parent.value = {value: parent.value};
                }
                Object.assign(parent.value, {[child.name]: child.value});
              }
              else if(parent.type === 'elementNode') {
                if(child.attrType === 'only') {
                  Object.assign(parent.props, {[child.name]: child.value});
                }
                else if(child.attrType === 'multiple') {
                  if(parent.props[child.name]) {
                    parent.props[child.name].push(child.value);
                  }
                  else {
                    parent.props[child.name] = [child.value];
                  }
                }
              }
              else {
                throw Error('propNode cannot be a child of a ' + parent.type);
              }
            }
            else if(child.type === 'elementNode') {
              if(parent.type === 'elementNode') {
                parent.presets.unshift(child);
              }
              else {
                throw Error('elementNode cannot be a child of a ' + parent.type);
              }
            }
            break;
          }
        }
      }
      else {
        tree.push(presets[i]);
      }
    }
    return tree;
  }
  parsePresets(lines) {
    let presets = [];
    for(let i = 0; i < lines.length; i++) {
      let preset = this.parsePreset(lines[i]);
      if(preset != null) {
        presets.push(preset);
      }
    }
    return presets;
  }
  parsePreset(line) {
    line = this.removeComment(line);

    let type = 'elementNode';
    let depth = this.getDepth(line);

    // if line is attr node
    let attr = this.getAttr(line);
    if(attr) {
      type = 'propNode';
      return {type, depth, name: attr[1], value: attr[2], attrType: attr[0]};
    }

    // else line is element, empty or value node
    let element = this.getElement(line);
    let tags = this.getTags(line);
    let value = this.getValue(line);
    let id = this.getId(line);
    let props = [];

    // if element is undefined, then line is block or value node
    if(element == null) {
      if(tags.length || id) {
        element = '';
      }
      else if(value) {
        type = 'valueNode';
      }
      else {
        return;
      }
    }

    // if line is elementNode, then parse props
    if(type !== 'valueNode') {
      props = this.getInlineAttrs(line);
    }

    return {type, element, value, props, tags, id, depth, presets: []};
  }
  parseValue(value) {
    if(value === 'on' || value === 'yes' || value === 'true') {
      return true;
    }
    else if(value === 'off' || value === 'no' || value === 'false') {
      return false;
    }
    else if(/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) {
      return Number(value);
    }
    return value;
  }
  removeComment(line) {
    return line.replace(/\/\/.+/, '');
  }
  getImports(data) {
    return (data.match(/import .+/g) || []).map((v) => v.split(' ')[1]);
  }
  getComment(line) {
    return (line.match(/\/\/.+/)  || [''])[0];
  }
  getDepth(line) {
    return (line.match(/^[\t ]+/) || [''])[0].length/2;
  }
  parseQuery(query) {
    let tags = (query.match(/\.\w+/g) || []).map((tag) => tag.slice(1));
    let id = (query.match(/\#\w+/) || [''])[0].slice(1);
    let element = (query.match(/^\w+/) || [])[0];
    return {element, id, tags};
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
    let prop = line.match(/^[\t ]*([\@\$])(\w+)(\s(.+))?/);
    if(!prop) {
      return;
    }

    let type = prop[1] === '@' ? 'only' : 'multiple';
    return [type, prop[2], prop[4] != null ? this.parseValue(prop[4]) : true];
  }
  getInlineAttrs(line) {
    let res = {};
    let find = line.match(/\((.+)\)/g);
    if(find == null) {
      return {};
    }

    let props = find[0].split(/,\s+/);
    for(let key in props) {
      let prop = props[key].replace('(', '').replace(')', '').split('=');
      let keys = prop[0].split('.');
      let _prop = res;
      for(let i = 0; i < keys.length; i++) {
        if(keys[i+1]) {
          _prop = _prop[keys[i]] = {};
        }
        else {
          _prop[keys[i]] = prop[1] != null ? this.parseValue(prop[1]) : true;
        }
      }
    }
    return res;
  }
}
