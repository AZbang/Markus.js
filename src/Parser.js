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
    /**
     * Method of loading markfile.
     * @member {string}
     */
    this.loadType = loadType;
  }

  /**
   * Parse markfile to AST presets
   * @param filepath {string} file path to markfile
   * @returns {Promise} Return promise with ast presets
   *
   * @example
   * await parser.parseMarkfile(['./mark.view');
   * > [{type="elementNode", element: 'app', props: {...}, presets: [...]}]
   */
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

  /**
   * Loaded markfiles from array pathes
   * @param pathes {string[]} Patches to markfiles
   * @returns {Promise}
   *
   * @example
   * await parser.imports(['./mark.view', './resources.mark']);
   * > [{name: 'mark.view', path: './mark.view', data: '...'}, {...}]
   */
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

  /**
   * Generates AST from presets based on type and depth properties of a preset.
   * @param presets {Preset[]} List presets
   * @returns {Array} AST presets
   *
   * @example
   * parser.generateTree([
   *   {type: 'elementNode', depth: 0, element: 'app'},
   *   {type: 'elementNode', depth: 1, element: 'text'},
   *   {type: 'propNode', depth: 2, name: 'text', value=''}
   *   {type: 'valueNode', depth: 3, value='TEXT NODE'}
   * ])
   *
   * > {type: 'elementNode', depth: 0, element: 'app', presets: [{
   *     type: 'elementNode', depth: 1, element: 'text', props: {
   *       text: 'TEXT NODE'
   *     }}
   *   }]
   * }
   */
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

  /**
   * Parse marklang lines array to presets. Calls parser.parsePreset (line [i])
   * @param lines {string[]} Strings with marklang markup
   * @returns {Preset[]}
  */
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

  /**
   * Parse marklang string to preset
   * @param line {string} String with marklang markup
   * @returns {Preset}
   *
   * @example
   * parser.parsePreset('    text.tag#id(obj.visible = yes) | VALUE')
   * > {
   *   type: 'elementNode',
   *   depth: 2
   *   element: 'text',
   *   id: 'id',
   *   tags: ['tag'],
   *   props: {obj: {visible: true}},
   *   value: 'VALUE'
   * }
   *
   * parser.parsePreset('    | VALUE TEXT')
   * > {
   *   depth: 2,
   *   type: 'valueNode',
   *   value: 'VALUE TEXT'
   * }
   *
   * parser.parsePreset('  @prop .3324')
   * > {
   *   depth: 1,
   *   attrType: 'only'
   *   type: 'propNode',
   *   name: 'prop',
   *   value: 0.3324
   * }
   *
   * parser.parsePreset('  $prop .3324')
   * > {
   *   depth: 1,
   *   attrType: 'multiple'
   *   type: 'propNode',
   *   name: 'prop',
   *   value: 0.3324
   * }
   */
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


  /**
   * Convert value from props with support js types
   * @param value {string}
   * @return {any} Parsed value
   *
   * @example
   * parser.parseValue('no'|'off'|'false');
   * > false
   * parser.parseValue('yes'|'on'|'true');
   * > true
   * parser.parseValue('.5'|'+34'|'-34'|'3.32432');
   * > Number
   * parser.parseValue('anystring');
   * > String
   */
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


  /**
   * Removes comment from markline
   * @param line {string} line with marklang markup
   * @returns {string} markline without comment
   *
   * @example
   * removeComment('elm.tag // some comment')
   * > 'elm.tag'
   */
  removeComment(line) {
    return line.replace(/\/\/.+/, '');
  }

  /**
   * Finds all import requests in the file from the `import path` construction
   * @param data {string[]} lines array with marklang markup
   * @returns {string[]} imports data
   *
   * @example
   * parser.getImports([
   *   'import resources.mark',
   *   'app(w=1920, h=900)',
   *   ' import scenes.mark'
   * ].join('\n'));
   * > ['resources.mark', 'styles.mark']
   */
  getImports(data) {
    return (data.match(/import .+/g) || []).map((v) => v.split(' ')[1]);
  }

  /**
   * Getes comment from markline
   * @param line {string} line with marklang markup
   * @returns {string} Comment from markline
   *
   * @example
   * getComment('elm.tag // some comment')
   * > // some comment
   */
  getComment(line) {
    return (line.match(/\/\/.+/)  || [''])[0];
  }

  /**
   * Finds the depth of the entry element. Calculated by the number of tabs at the beginning of the line.
   * @param line {string} line with marklang markup
   * @returns {number} depth
   *
   * @example
   * parser.getDepth("\t\t\t\t")
   * > 4
   */
  getDepth(line) {
    return (line.match(/^[\t ]+/) || [''])[0].length/2;
  }

  /**
   * Parse query selector to object
   * @param query {string} Query selector in marklang markup
   * @returns {Object} Query selector in object
   *
   * @example
   * parser.parseQuery('element.tag.tag2#id');
   * > {element: 'element', tags: ['tag', 'tag2'], id: 'id'}
   */
  parseQuery(query) {
    let tags = (query.match(/\.\w+/g) || []).map((tag) => tag.slice(1));
    let id = (query.match(/\#\w+/) || [''])[0].slice(1);
    let element = (query.match(/^\w+/) || [])[0];
    return {element, id, tags};
  }

  /**
   * Get element name
   * @param line {string} line with marklang markup
   * @returns {string} element name from markline
   *
   * @example
   * parser.getElement("sprite.tag#id(prop=data)")
   * > "sprite"
   */
  getElement(line) {
    return (line.match(/^[\t ]*(\w+)/) || [])[1];
  }

  /**
   * Extracts all element tags from .tag_name construction
   * @param line {string} line with marklang markup
   * @returns {string[]} element tags from markline
   *
   * @example
   * parser.getTags("el.tag1#id.tag2.tag3")
   * > ["tag1", "tag2", "tag3"]
   */
  getTags(line) {
    return (line.replace(/\(.+\)/, '').match(/\.\w+/g) || []).map((tag) => tag.slice(1));
  }

  /**
   * Extracts the element id from the `#id_name` construction
   * @param line {string} line with marklang markup
   * @returns {string} element id from markline
   *
   * @example
   * parser.getId("el.tag1#cat.tag2.tag3")
   * > "cat"
   */
  getId(line) {
    return (line.replace(/\(.+\)/, '').match(/#\w+/) || [''])[0].slice(1);
  }

  /**
   * Extract text value from the `| .+` construction
   * @param line {string} line with marklang markup
   * @returns {string} element value from markline
   *
   * @example
   * parser.getValue("| SOME VALUE ");
   * > "SOME VALUE "
   */
  getValue(line) {
    return (line.match(/\| *(.+)/) || [])[1] || '';
  }

  /**
   * Retrieves an element property from a `@prop value` and `$prop value` structure
   * @param line {string} line with marklang markup
   * @returns {string[]} attr from markline. [attrType, attrNane, attrValue]
   *
   * @example
   * parser.getAttr("@attr on")
   * > ['only', "attr", true]
   * parser.getAttr("$attr off")
   * > ['multiple', "attr", false]
   */
  getAttr(line) {
    let prop = line.match(/^[\t ]*([\@\$])(\w+)(\s(.+))?/);
    if(!prop) {
      return;
    }

    let type = prop[1] === '@' ? 'only' : 'multiple';
    return [type, prop[2], prop[4] != null ? this.parseValue(prop[4]) : true];
  }

  /**
   * Retrieves all element properties from the structure (prop = data, ...)
   * @param line {string} line with marklang markup
   * @returns {Object} element attrs from markline
   *
   * @example
   * parser.getInlineAttrs("el(texture=cat.png, font= Bebas Neue, visible = off, some.point.x = .4)")
   * > {texture: "cat.png", font="Bebas Neue", visible: false, some: {point: {x: .4}}}
   */
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
