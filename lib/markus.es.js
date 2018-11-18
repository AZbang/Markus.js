/*!
 * markusjs - v0.2.0
 * Compiled Sun, 18 Nov 2018 20:16:00 UTC
 *
 * Writed by Andrey Zhevlakov <azbangwtf@ya.ru>
 * markusjs is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
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
var Parser = function Parser(loadType) {
  if ( loadType === void 0 ) loadType='ajax';

  /**
   * Method of loading markfile.
   * @member {string}
   */
  this.loadType = loadType;
};

/**
 * Parse markfile to AST presets
 * @param filepath {string} file path to markfile
 * @returns {Promise} Return promise with ast presets
 *
 * @example
 * await parser.parseMarkfile(['./mark.view');
 * > [{type="elementNode", element: 'app', props: {...}, presets: [...]}]
 */
Parser.prototype.parseMarkfile = function parseMarkfile (filepath) {
    var this$1 = this;

  return new Promise(function (resolve) {
    this$1.imports([filepath]).then(function (data) {
      var entry = data[0].data;
      var imports = this$1.getImports(entry);

      this$1.imports(imports).then(function (files) {
        for(var i = 0; i < files.length; i++) {
          if(this$1.getImports(files[i].data).length) {
            throw Error('Imports are possible only in the entry file.');
          }
          entry = entry.replace('import ' + files[i].path, files[i].data);
        }

        var presets = this$1.parsePresets(entry.split('\n'));
        resolve(this$1.generateTree(presets));
      });
    });
  });
};

/**
 * Loaded markfiles from array pathes
 * @param pathes {string[]} Patches to markfiles
 * @returns {Promise}
 *
 * @example
 * await parser.imports(['./mark.view', './resources.mark']);
 * > [{name: 'mark.view', path: './mark.view', data: '...'}, {...}]
 */
Parser.prototype.imports = function imports (pathes) {
    var this$1 = this;

  var files = [];
  var loop = function ( i ) {
    if(this$1.loadType === 'ajax') {
      files.push(fetch(pathes[i])
        .then(function (res) {
          if(res.status === 404) {
            throw Error('Markus module "' + pathes[i] + '" is not found');
          }
          return res.text();
        }).then(function (data) {
          return {name: pathes[i].split('/').slice(-1)[0], path: pathes[i], data: data};
        })
      );
    }
  };

    for(var i = 0; i < pathes.length; i++) loop( i );
  return Promise.all(files);
};

/**
 * Generates AST from presets based on type and depth properties of a preset.
 * @param presets {Preset[]} List presets
 * @returns {Array} AST presets
 *
 * @example
 * parser.generateTree([
 * {type: 'elementNode', depth: 0, element: 'app'},
 * {type: 'elementNode', depth: 1, element: 'text'},
 * {type: 'propNode', depth: 2, name: 'text', value=''}
 * {type: 'valueNode', depth: 3, value='TEXT NODE'}
 * ])
 *
 * > {type: 'elementNode', depth: 0, element: 'app', presets: [{
 *   type: 'elementNode', depth: 1, element: 'text', props: {
 *     text: 'TEXT NODE'
 *   }}
 * }]
 * }
 */
Parser.prototype.generateTree = function generateTree (presets) {
    var obj, obj$1, obj$2, obj$3, obj$4;

  var tree = [];
  for(var i = presets.length-1; i >= 0; i--) {
    if(presets[i].depth !== 0) {
      for(var j = i-1; j >= 0; j--) {
        if(presets[j].depth < presets[i].depth) {
          var parent = presets[j];
          var child = presets[i];

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
          else if(child.type === 'propNode') {
            if(parent.type === 'propNode') {
              if(typeof parent.value === 'string') {
                parent.directory = parent.value;
                parent.value = ( obj$1 = {}, obj$1[parent.value] = ( obj = {}, obj[child.name] = child.value, obj), obj$1);
              }
              else if(parent.directory) {
                Object.assign(parent.value[parent.directory], ( obj$2 = {}, obj$2[child.name] = child.value, obj$2));
              }
              else if(typeof parent.value === 'object' && parent.value != null) {
                Object.assign(parent.value, ( obj$3 = {}, obj$3[child.name] = child.value, obj$3));
              }
              else {
                parent.value = ( obj$4 = {value: parent.value}, obj$4[child.name] = child.value, obj$4);
              }
            }
            else if(parent.type === 'elementNode') {
              if(Array.isArray(parent.props[child.name])) {
                parent.props[child.name].push(child.value);
              }
              else if(typeof parent.props[child.name] === 'object') {
                Object.assign(parent.props[child.name], child.value);
              }
              else if(parent.props[child.name]) {
                parent.props[child.name] = [parent.props[child.name], child.value];
              }
              else {
                parent.props[child.name] = child.value;
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
};

/**
 * Parse marklang lines array to presets. Calls parser.parsePreset (line [i])
 * @param lines {string[]} Strings with marklang markup
 * @returns {Preset[]}
*/
Parser.prototype.parsePresets = function parsePresets (lines) {
  var presets = [];
  for(var i = 0; i < lines.length; i++) {
    var preset = this.parsePreset(lines[i]);
    if(preset != null) {
      presets.push(preset);
    }
  }
  return presets;
};

/**
 * Parse marklang string to preset
 * @param line {string} String with marklang markup
 * @returns {Preset}
 *
 * @example
 * parser.parsePreset('  text.tag#id(obj.visible = yes) | VALUE')
 * > {
 * type: 'elementNode',
 * depth: 2
 * element: 'text',
 * id: 'id',
 * tags: ['tag'],
 * props: {obj: {visible: true}},
 * value: 'VALUE'
 * }
 *
 * parser.parsePreset('  | VALUE TEXT')
 * > {
 * depth: 2,
 * type: 'valueNode',
 * value: 'VALUE TEXT'
 * }
 *
 * parser.parsePreset('@prop .3324')
 * > {
 * depth: 1,
 * type: 'propNode',
 * typeAttr: 'prop',
 * name: 'prop',
 * value: 0.3324
 * }
 *
 * parser.parsePreset('@move(10, 30)')
 * > {
 * depth: 1,
 * type: 'propNode',
 * typeAttr: 'method',
 * name: 'move',
 * args: [10, 30]
 * }
 */
Parser.prototype.parsePreset = function parsePreset (line) {
  line = this.removeComment(line);

  var type = 'elementNode';
  var depth = this.getDepth(line);

  // if line is attr node
  var attr = this.getAttr(line);
  if(attr) {
    return {type: 'propNode', depth: depth, name: attr[1], value: attr[2], typeAttr: attr[0]};
  }

  // else line is element, empty or value node
  var element = this.getElement(line);
  var tags = this.getTags(line);
  var value = this.getValue(line);
  var id = this.getId(line);
  var props = [];

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

  return {type: type, element: element, value: value, props: props, tags: tags, id: id, depth: depth, presets: []};
};


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
Parser.prototype.parseValue = function parseValue (value) {
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
};


/**
 * Removes comment from markline
 * @param line {string} line with marklang markup
 * @returns {string} markline without comment
 *
 * @example
 * removeComment('elm.tag // some comment')
 * > 'elm.tag'
 */
Parser.prototype.removeComment = function removeComment (line) {
  return line.replace(/\/\/.+/, '');
};

/**
 * Finds all import requests in the file from the `import path` construction
 * @param data {string[]} lines array with marklang markup
 * @returns {string[]} imports data
 *
 * @example
 * parser.getImports([
 * 'import resources.mark',
 * 'app(w=1920, h=900)',
 * ' import scenes.mark'
 * ].join('\n'));
 * > ['resources.mark', 'styles.mark']
 */
Parser.prototype.getImports = function getImports (data) {
  return (data.match(/import .+/g) || []).map(function (v) { return v.split(' ')[1]; });
};

/**
 * Getes comment from markline
 * @param line {string} line with marklang markup
 * @returns {string} Comment from markline
 *
 * @example
 * getComment('elm.tag // some comment')
 * > // some comment
 */
Parser.prototype.getComment = function getComment (line) {
  return (line.match(/\/\/.+/)|| [''])[0];
};

/**
 * Finds the depth of the entry element. Calculated by the number of tabs at the beginning of the line.
 * @param line {string} line with marklang markup
 * @returns {number} depth
 *
 * @example
 * parser.getDepth("\t\t\t\t")
 * > 4
 */
Parser.prototype.getDepth = function getDepth (line) {
  return (line.match(/^[\t ]+/) || [''])[0].length/2;
};

/**
 * Parse query selector to object
 * @param query {string} Query selector in marklang markup
 * @returns {Object} Query selector in object
 *
 * @example
 * parser.parseQuery('element.tag.tag2#id');
 * > {element: 'element', tags: ['tag', 'tag2'], id: 'id'}
 */
Parser.prototype.parseQuery = function parseQuery (query) {
  var tags = (query.match(/\.\w+/g) || []).map(function (tag) { return tag.slice(1); });
  var id = (query.match(/\#\w+/) || [''])[0].slice(1);
  var element = (query.match(/^\w+/) || [])[0];
  return {element: element, id: id, tags: tags};
};

/**
 * Get element name
 * @param line {string} line with marklang markup
 * @returns {string} element name from markline
 *
 * @example
 * parser.getElement("sprite.tag#id(prop=data)")
 * > "sprite"
 */
Parser.prototype.getElement = function getElement (line) {
  return (line.match(/^[\t ]*(\w+)/) || [])[1];
};

/**
 * Extracts all element tags from .tag_name construction
 * @param line {string} line with marklang markup
 * @returns {string[]} element tags from markline
 *
 * @example
 * parser.getTags("el.tag1#id.tag2.tag3")
 * > ["tag1", "tag2", "tag3"]
 */
Parser.prototype.getTags = function getTags (line) {
  return (line.replace(/\(.+\)/, '').match(/\.\w+/g) || []).map(function (tag) { return tag.slice(1); });
};

/**
 * Extracts the element id from the `#id_name` construction
 * @param line {string} line with marklang markup
 * @returns {string} element id from markline
 *
 * @example
 * parser.getId("el.tag1#cat.tag2.tag3")
 * > "cat"
 */
Parser.prototype.getId = function getId (line) {
  return (line.replace(/\(.+\)/, '').match(/#\w+/) || [''])[0].slice(1);
};

/**
 * Extract text value from the `| .+` construction
 * @param line {string} line with marklang markup
 * @returns {string} element value from markline
 *
 * @example
 * parser.getValue("| SOME VALUE ");
 * > "SOME VALUE "
 */
Parser.prototype.getValue = function getValue (line) {
  return (line.match(/\| *(.+)/) || [])[1] || '';
};

/**
 * Retrieves an element property from a `@prop value` and `$prop value` structure
 * @param line {string} line with marklang markup
 * @returns {string[]} attr from markline. [attrType, attrNane, attrValue]
 *
 * @example
 * parser.getAttr("@prop on")
 * > ['propNode', "prop", true]
 *
 * parser.getAttr("@func(on, 20, text)")
 * > ['propNode', "attr", [true, 20, 'text']]
 */
Parser.prototype.getAttr = function getAttr (line) {
    var this$1 = this;

  var func = line.match(/^[\t ]*\@(\w+)\((.+)?\)/);
  if(func) {
    var args = func[2] != null ? func[2].split(/,\s+/).map(function (v) { return this$1.parseValue(v); }) : [];
    return ['method', func[1], function() {
      this[func[1]].apply(this, args);
    }];
  }

  var prop = line.match(/^[\t ]*\@(\w+)(\s(.+))?/);
  if(prop) {
    return ['prop', prop[1], prop[3] != null ? this.parseValue(prop[3]) : true];
  }
};

/**
 * Retrieves all element properties from the structure (prop = data, ...)
 * @param line {string} line with marklang markup
 * @returns {Object} element attrs from markline
 *
 * @example
 * parser.getInlineAttrs("el(texture=cat.png, font= Bebas Neue, visible = off, some.point.x = .4)")
 * > {texture: "cat.png", font="Bebas Neue", visible: false, some: {point: {x: .4}}}
 */
Parser.prototype.getInlineAttrs = function getInlineAttrs (line) {
  var res = {};
  var find = line.match(/\((.+)\)/g);
  if(find == null) {
    return {};
  }

  var props = find[0].split(/,\s+/);
  for(var key in props) {
    var prop = props[key].replace('(', '').replace(')', '').split('=');
    var keys = prop[0].split('.');
    var _prop = res;
    for(var i = 0; i < keys.length; i++) {
      if(keys[i+1]) {
        _prop = _prop[keys[i]] = {};
      }
      else {
        _prop[keys[i]] = prop[1] != null ? this.parseValue(prop[1]) : true;
      }
    }
  }
  return res;
};

// import {propPlugins} from '../main.js';

/**
 * Mixin for additional functionality for all markus elements
 * @class Element
 * @param superclass {Class} Parent class
 * @memberof markus.mixins
 *
 * @example
 * let containerWithElementMix = new markus.mixins.Display(PIXI.Container);
 * containerWithElementMix({view, parent, ...preset}, argForParentClass);
 */
function Element(superclass) {
  if ( superclass === void 0 ) superclass=/*@__PURE__*/(function () {
  function anonymous () {}

  return anonymous;
}());

  return /*@__PURE__*/(function (superclass) {
    function anonymous(preset, arg) {
      superclass.call(this, arg);

      /**
       * Root view class
       * @memberof markus.mixins.Element
       * @member {markus.View}
       */
      this.mark = preset.view;

      /**
       * Element name
       * @readonly
       * @memberof markus.mixins.Element
       * @member {string}
       */
      this.element = preset.element;

      /**
       * Presets list
       * @memberof markus.mixins.Element
       * @member {markus.View}
       */
      this.presets = preset.presets;

      /**
       * Element id
       * @readonly
       * @memberof markus.mixins.Element
       * @member {string}
       */
      this.id = preset.id;

      /**
       * Element tags
       * @memberof markus.mixins.Element
       * @member {string[]}
       */
      this.tags = preset.tags.slice(0);

      /**
       * Parent node
       * @memberof markus.mixins.Element
       * @member {Element}
       */
      this.parentElement = preset.parent || preset.view;

      /**
       * Childs list
       * @memberof markus.mixins.Element
       * @member {Element[]}
       */
      this.childList = [];

      /**
       * Аrray of functions called every tick
       * @memberof markus.mixins.Element
       * @member {function[]}
       */
      this.ticks = [];

      /**
       * Element properties from markus markup
       * @readonly
       * @memberof markus.mixins.Element
       * @member {function[]}
       */
      this.props = preset.props;

      this._bindToParentNode();
    }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;

    anonymous.prototype._bindToParentNode = function _bindToParentNode () {
      this.parentElement.childList.push(this);
      if(this instanceof PIXI.DisplayObject) {
        if(this.parentElement instanceof PIXI.DisplayObject) {
          this.parentElement.addChild(this);
        }
        else {
          this.parentElement.stage.addChild(this);
        }
      }
    };

    /**
     * Add tag to tags list and app mixin props
     * @memberof markus.mixins.Element
     * @param props {string} tagName
     */
    anonymous.prototype.addTag = function addTag (tag) {
      if(this.tags.indexOf(tag) === -1) {
        this.tags.push(tag);
      }
    };

    /**
     * Remove tag from tags list and reuse mixins props
     * @memberof markus.mixins.Element
     * @param props {string} tagName
     */
    anonymous.prototype.removeTag = function removeTag (tag) {
      var index = this.tags.indexOf(tag);
      if(index !== -1) {
        this.tags.splice(index, 1);
      }
    };

    /**
     * Set props to element
     * @memberof markus.mixins.Element
     * @param props {Object} Props object
     */
    anonymous.prototype.setProps = function setProps (props) {
      var this$1 = this;

      var loop = function ( key ) {
        // call custom prop plugins
        // for(let plug in propPlugins) {
        //   if(propPlugins[plug](this, key, props)) {
        //     continue propsEach;
        //   }
        // }
        //
        //

        if(typeof props[key] === 'function') {
          props[key].call(this$1);
        }

        // parse events prop
        else if(key === 'on' && typeof props[key] === 'object') {
          var loop$1 = function ( event ) {
            this$1.on(event, function () {
              this$1.setProps(props[key][event]);
            });
          };

          for(var event in props[key]) loop$1( event );
        }

        else if(Array.isArray(this$1[key])) {
          this$1[key] = this$1[key].concat(props[key]);
        }

        else if(typeof this$1[key] === 'object' && this$1[key] != null && this$1[key].set) {
          if(typeof props[key] === 'object') {
            this$1[key].x = props[key].x;
            this$1[key].y = props[key].y;
          }
          else {
            this$1[key].set(props[key]);
          }
        }

        else if(typeof this$1[key] === 'object' && this$1[key] != null && typeof props[key] === 'object') {
          Object.assign(this$1[key], props[key]);
        }

        else {
          this$1[key] = props[key];
        }
      };

      for(var key in props) loop( key );
    };

    /**
     * Add function to ticks array
     * @memberof markus.mixins.Element
     * @param cb {funciton} Every tick is called
     */
    anonymous.prototype.addTick = function addTick (cb) {
      this.ticks.push(cb);
    };

    /**
     * Main tick method. Each tick is called in view.updateElements
     * @memberof markus.mixins.Element
     * @private
     */
    anonymous.prototype.tick = function tick (dt) {
      for(var i = 0; i < this.ticks.length; i++) {
        this.ticks[i](dt);
      }
    };

    return anonymous;
  }(superclass));
}

/**
 * Main class for the entire visible tree of elements.
 * @example
 * app
 *  &#64;w 1280
 *  &#64;h 720
 *  &#64;color 0xFFFFFF
 *  &#64;smooth off
 *
 * // activate children presets
 * mark.get('app').init();
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 * @augments PIXI.Application
 */
var App = /*@__PURE__*/(function (superclass) {
  function App(preset) {
    var this$1 = this;

    superclass.call(this, preset, {
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    });

    /**
     * Resolution coef
     * @member {number}
     */
    this.resolution = null;

    this.width = 1920;
    this.height = 1080;

    document.body.appendChild(this.view);
    document.body.style = 'padding: 0; margin: 0; overflow: hidden; background: #000;';
    window.addEventListener('resize', function () { return this$1._resize(this$1); });
  }

  if ( superclass ) App.__proto__ = superclass;
  App.prototype = Object.create( superclass && superclass.prototype );
  App.prototype.constructor = App;

  var prototypeAccessors = { color: { configurable: true },smooth: { configurable: true },width: { configurable: true },height: { configurable: true } };

  /**
   * Renderer backgroundColor
   * @member {number}
   */
  prototypeAccessors.color.set = function (v) {
    this.renderer.backgroundColor = +v;
  };
  prototypeAccessors.color.get = function () {
    return this.renderer.backgroundColor;
  };

  /**
   * Smooth textures in pixi
   * @member {bolleon}
   */
  prototypeAccessors.smooth.get = function () {
    return PIXI.settings.SCALE_MODE !== PIXI.SCALE_MODES.NEAREST;
  };
  prototypeAccessors.smooth.set = function (v) {
    PIXI.settings.SCALE_MODE = v ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
  };

  /**
   * Width game view
   * @member {number}
   */
  prototypeAccessors.width.set = function (v) {
    this._width = v;
    this._resize();
  };
  prototypeAccessors.width.get = function () {
    return this._width;
  };

  /**
   * Height game view
   * @member {number}
   */
  prototypeAccessors.height.set = function (v) {
    this._height = v;
    this._resize();
  };
  prototypeAccessors.height.get = function () {
    return this._height;
  };

  App.prototype._resize = function _resize () {
    this.resolution = window.innerWidth/this.width;
    this.renderer.resize(window.innerWidth, this.height*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.height*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  };

  /**
   * Initial app elements
   */
  App.prototype.init = function init () {
    this.mark.add(this.presets, this);
  };

  Object.defineProperties( App.prototype, prototypeAccessors );

  return App;
}(Element(PIXI.Application)));

/**
 * Implementing resource-loader for markusJS. Item properties are a resource for loading.
 * @example
 * resources
 *   &#64;level level.json
 *   &#64;sprites sprites.json
 *   &#64;bg bg.png
 *
 * mark.get('resources').load(() => {
 *   mark.get('app').init();
 * });
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 * @augments PIXI.loaders.Loader
 */
var Resources = /*@__PURE__*/(function (superclass) {
  function Resources(preset) {
    superclass.call(this, preset);

    for(var key in this.props) {
      this.add(key, this.props[key]);
    }
    this.props = {};
  }

  if ( superclass ) Resources.__proto__ = superclass;
  Resources.prototype = Object.create( superclass && superclass.prototype );
  Resources.prototype.constructor = Resources;

  return Resources;
}(Element(PIXI.loaders.Loader)));

/**
 * Class store all mixin properties of elements
 * @example
 * mixins
 *  .label
 *    &#64;size 120
 *
 *  sprite.quad
 *    &#64;width 100
 *    &#64;height 100
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 */
var Mixins = /*@__PURE__*/(function (superclass) {
  function Mixins(preset) {
    superclass.call(this, preset);

    /**
     * Mixins array.
     * @member {Object[]}
     */
    this.mixins = this.presets;
  }

  if ( superclass ) Mixins.__proto__ = superclass;
  Mixins.prototype = Object.create( superclass && superclass.prototype );
  Mixins.prototype.constructor = Mixins;

  /**
   * Merging mixin with elements props
   * @prop elm {Element} Element for merge
   * @prop [props={}] {Object} Element props
   * @returns {Object} merged elm props with mixin props
   */
  Mixins.prototype.merge = function merge (elm, props) {
    if ( props === void 0 ) props={};

    var parseProps = {};
    for(var i = 0; i < this.mixins.length; i++) {
      if(this.mark.isSelectorOfElement(this.mixins[i], elm)) {
        for(var key in this.mixins[i].props) {
          if(Array.isArray(props[key])) {
            parseProps[key] = props[key].concat(this.mixins[i].props[key]);
          }
          else {
            parseProps[key] = this.mixins[i].props[key];
          }
        }
      }
    }
    return Object.assign({}, props, parseProps);
  };

  /**
   * Set mixin to store
   * @prop selector {string} Mixin selector
   * @prop props {Object} Mixin props
   */
  Mixins.prototype.set = function set (selector, props) {
    this.mixins[selector] = props;
  };

  return Mixins;
}(Element()));

/**
 * Implementing localStorage for MarkusJS. Properties of this element are saved in localStorage
 * @example
 * store
 *   &#64;level 1
 *   &#64;lang ru
 *   &#64;hero Atlant
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 */
var Store = /*@__PURE__*/(function (superclass) {
  function Store(preset) {
    superclass.call(this, preset);

    for(var key in this.props) {
      this.set(key, this.props[key]);
    }
    this.props = {};
  }

  if ( superclass ) Store.__proto__ = superclass;
  Store.prototype = Object.create( superclass && superclass.prototype );
  Store.prototype.constructor = Store;

  /**
   * Get item to localStorage
   * @prop name {string} item name
   * @prop val {any} item value
   */
  Store.prototype.set = function set (name, val) {
    localStorage.setItem(name, JSON.stringify(val));
  };

  /**
   * Get item from localStorage
   * @prop name {string} Item name
   * @returns {any} Item value from localStorage
   */
  Store.prototype.get = function get (name) {
    return JSON.parse(localStorage.getItem(name));
  };

  return Store;
}(Element()));

/**
 * Scenes Manager for MarkusJS. Children of this element are separate scenes that can be switched.
 * @example
 * scenes(scene = A)
 *   block(id=A)
 *     text | SCENE A
 *   block(id=B)
 *     text | SCENE B
 *
 * mark.get('scenes').scene = 'B';
 *
 * @class
 * @mixes markus.mixins.Element
 * @memberof markus.elements
 * @augments PIXI.Container
 */
var Scenes = /*@__PURE__*/(function (superclass) {
  function Scenes(preset) {
    superclass.call(this, preset);

    /**
     * Scenes presets
     * @member {Preset[]}
     */
    this.scenes = this.presets;
  }

  if ( superclass ) Scenes.__proto__ = superclass;
  Scenes.prototype = Object.create( superclass && superclass.prototype );
  Scenes.prototype.constructor = Scenes;

  var prototypeAccessors = { scene: { configurable: true } };

  /**
   * Editable prop. Current scene id
   * @member {string}
   */
  prototypeAccessors.scene.set = function (id) {
    for(var i = 0; i < this.scenes.length; i++) {
      if(this.scenes[i].id === id) {
        this._scene && this.mark.remove(this._scene, this);
        this._scene = this.mark.add(this.scenes[i], this);
      }
    }
  };
  prototypeAccessors.scene.get = function () {
    return this._scene;
  };

  Object.defineProperties( Scenes.prototype, prototypeAccessors );

  return Scenes;
}(Element(PIXI.Container)));

/**
 * Mixin for additional functionality for all pixi elements
 *
 * @class
 * @name Display
 * @param superclass {Class} Parent class
 * @mixes markus.mixins.Element
 * @memberof markus.mixins
 *
 * @example
 * let containerWithDisplayAndElementMix = new markus.mixins.Display(PIXI.Container);
 * containerWithDisplayAndElementMix({view, parent, ...preset}, argForParentClass);
 */
function Display(superclass) {
  return /*@__PURE__*/(function (superclass) {
    function anonymous(preset, arg) {
      var this$1 = this;

      superclass.call(this, preset, arg);

      this.app = this.mark.get('app');

      /**
       * The width of the area of allowable positions children of the element
       * @member {number}
       * @memberof markus.mixins.Display
       */
      this.contentW = this.app.width;

      /**
       * The height of the area of allowable positions children of the element
       * @member {number}
       * @memberof markus.mixins.Display
       */
      this.contentH = this.app.height;

      this.addTick(function () { return this$1._computedPosition(); });
    }

    if ( superclass ) anonymous.__proto__ = superclass;
    anonymous.prototype = Object.create( superclass && superclass.prototype );
    anonymous.prototype.constructor = anonymous;

    var prototypeAccessors = { angle: { configurable: true },w: { configurable: true },h: { configurable: true },left: { configurable: true },right: { configurable: true },centerX: { configurable: true },centerXY: { configurable: true },top: { configurable: true },bottom: { configurable: true },centerY: { configurable: true } };

    /**
     * Angle in degrees
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.angle.set = function (v) {
      this.rotation = v*PIXI.DEG_TO_RAD;
    };
    prototypeAccessors.angle.get = function () {
      return this.rotation*PIXI.RAD_TO_DEG;
    };


    /**
     * Short setter for width
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.w.set = function (v) {
      this.width = v;
    };

    /**
     * Short setter for height
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.h.set = function (v) {
      this.height = v;
    };

    /**
     * Positioning the element relative to the left edge of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.left.set = function (v) {
      this._right = null;
      this._centerX = null;
      this._left = v === true ? 0 : v === false ? null : v;
    };
    prototypeAccessors.left.get = function () {
      return this._left;
    };

    /**
     * Positioning the element relative to the right edge of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.right.set = function (v) {
      this._left = null;
      this._centerX = null;
      this._right = v === true ? 0 : v === false ? null : v;
    };
    prototypeAccessors.right.get = function () {
      return this._right;
    };

    /**
     * Positioning the element relative to the horizontal center of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.centerX.set = function (v) {
      this._left = null;
      this._right = null;
      this._centerX = v === true ? 0 : v === false ? null : v;
    };
    prototypeAccessors.centerX.get = function () {
      return this._centerX;
    };

    /**
     * Positioning the element relative to the horizontal and vertical center of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.centerXY.get = function () {
      return this._centerX === this._centerY ? this._centerX : null;
    };
    prototypeAccessors.centerXY.set = function (v) {
      this.centerX = v;
      this.centerY = v;
    };


    /**
     * Positioning the element relative to the top edge of the parent
     * @memberof markus.mixins.Display
     * @member {v}
     */
    prototypeAccessors.top.set = function (v) {
      this._bottom = null;
      this._centerY = null;
      this._top = v === true ? 0 : v === false ? null : v;
    };
    prototypeAccessors.top.get = function () {
      return this._top;
    };


    /**
     * Positioning the element relative to the bottom edge of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.bottom.set = function (v) {
      this._top = null;
      this._centerY = null;
      this._bottom = v === true ? 0 : v === false ? null : v;
    };
    prototypeAccessors.bottom.get = function () {
      return this._bottom;
    };

    /**
     * Positioning the element relative to the vertical center of the parent
     * @memberof markus.mixins.Display
     * @member {number}
     */
    prototypeAccessors.centerY.set = function (v) {
      this._top = null;
      this._bottom = null;
      this._centerY = v === true ? 0 : v === false ? null : v;
    };
    prototypeAccessors.centerY.get = function () {
      return this._centerY;
    };

    anonymous.prototype._computedPosition = function _computedPosition () {
      var w = this.parentElement.contentW || this.app.width;
      var h = this.parentElement.contentH || this.app.height;

      if(this.left != null) {
        this.x = this.left;
      }
      else if(this.centerX != null) {
        this.x = w/2+this.centerX;
      }
      else if(this.right != null) {
        this.x = w-this.right;
      }

      if(this.top != null) {
        this.y = this.top;
      }
      else if(this.centerY != null) {
        this.y = h/2+this.centerY;
      }
      else if(this.bottom != null) {
        this.y = h-this.bottom;
      }

      if(this.parentElement.anchor) {
        this.x = this.x-w*this.parentElement.anchor.x;
        this.y = this.y-h*this.parentElement.anchor.y;
      }
    };

    Object.defineProperties( anonymous.prototype, prototypeAccessors );

    return anonymous;
  }(Element(superclass)));
}

/**
 * Implementing PIXI.Sprite for markusJS
 * @example
 * sprite(src=image.png)
 *
 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Sprite
 */

var Sprite = /*@__PURE__*/(function (superclass) {
  function Sprite(preset) {
    superclass.call(this, preset, PIXI.Texture.WHITE);

    this.contentW = this.width;
    this.contentH = this.height;
    this.mark.add(this.presets, this);
  }

  if ( superclass ) Sprite.__proto__ = superclass;
  Sprite.prototype = Object.create( superclass && superclass.prototype );
  Sprite.prototype.constructor = Sprite;

  var prototypeAccessors = { src: { configurable: true } };

  /**
   * Sprite texture source
   * @member {string}
   */
  prototypeAccessors.src.get = function () {
    return this._src;
  };
  prototypeAccessors.src.set = function (v) {
    if(v == null) {
      return;
    }

    this._src = v;
    this.texture = PIXI.Texture.fromImage(v);
  };

  Object.defineProperties( Sprite.prototype, prototypeAccessors );

  return Sprite;
}(Display(PIXI.Sprite)));

/**
 * Sprite with button behavior
 * @example
 * button(src=button.png)
 *  &#64;toScene=scene_id
 *    text | CLICK ME
 *
 * @class
 * @memberof markus.elements
 * @augments markus.elements.Sprite
 */
var Button = /*@__PURE__*/(function (Sprite$$1) {
  function Button(preset) {
    var this$1 = this;

    Sprite$$1.call(this, preset);

    /**
     * toggle scene in scenes manager then button call pointertap event
     * @memberof {markus.elements.Button}
     * @member {string}
     */
    this.toScene = null;

    /**
     * texture button in active state
     * @memberof {markus.elements.Button}
     * @member {string}
     */
    this.activeSrc = this.src;

    /**
     * texture button in inactive state
     * @memberof {markus.elements.Button}
     * @member {string}
     */
    this.inactiveSrc = this.src;

    this.enable = true;
    this.on('pointertap', function () {
      if(this$1.toScene) {
        this$1.mark.get('scenes').scene = this$1.toScene;
      }
    });
  }

  if ( Sprite$$1 ) Button.__proto__ = Sprite$$1;
  Button.prototype = Object.create( Sprite$$1 && Sprite$$1.prototype );
  Button.prototype.constructor = Button;

  var prototypeAccessors = { enable: { configurable: true } };

  /**
   * Toggle interactive state
   * @memberof {markus.elements.Button}
   * @member {booleon}
   */
  prototypeAccessors.enable.set = function (v) {
    this.interactive = v;
    this.buttonMode = v;
    this.src = (v ? this.activeSrc  : this.inactiveSrc) || this.src;
  };
  prototypeAccessors.enable.get = function () {
    return this.interactive;
  };

  Object.defineProperties( Button.prototype, prototypeAccessors );

  return Button;
}(Sprite));

/**
 * Container with additional logic positioning for children
 * @example
 * block
 *  &#64;inlineItems
 *  &#64;itemsMarginX 10
 *  &#64;itemsMarginX 10
 *  &#64;contentW 300
 *  &#64;contentH 300
 *  &#64;anchorX .5
 *  &#64;anchorY .5
 *    sprite(src=image.png)
 *    sprite(src=image.png)
 *    sprite(src=image.png)

 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Container
 */
var Block = /*@__PURE__*/(function (superclass) {
  function Block(preset) {
    var this$1 = this;

    superclass.call(this, preset);

    /**
     * Position items as a inline list.
     * @memberof {markus.elements.Block}
     * @member {booleon}
     */
    this.inlineItems = false;

    /**
     * Indent by x for elements in inline positioning
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.itemsMarginX = 0;

    /**
     * Indent by y for elements in inline positioning
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.itemsMarginY = 0;

    /**
     * anchor by x positioning the block relative to contentW
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.anchorX = 0;

    /**
     * anchor by y positioning the block relative to contentW
     * @memberof {markus.elements.Block}
     * @member {number}
     */
    this.anchorY = 0;


    this.mark.add(this.presets, this);
    this.addTick(function () { return this$1._computedBlock(); });
  }

  if ( superclass ) Block.__proto__ = superclass;
  Block.prototype = Object.create( superclass && superclass.prototype );
  Block.prototype.constructor = Block;

  Block.prototype._computedBlock = function _computedBlock () {
    // computed position with anchor
    this.x = this.x-this.contentW*this.anchorX;
    this.y = this.y-this.contentH*this.anchorY;

    if(!this.inlineItems) {
      return;
    }

    // computed position for inline items
    var x = 0, y = 0;
    var maxh = 0;
    for(var i = 0; i < this.children.length; i++) {
      var el = this.children[i];
      var anchorX = el.anchor ? el.anchor.x : el.anchorX;
      var anchorY = el.anchor ? el.anchor.y : el.anchorY;

      el.x = x+el.width*anchorX;
      x += el.width+this.itemsMarginX;
      maxh = Math.max(maxh, el.height);
      if(x > this.contentW) {
        el.x = el.width*anchorX;
        x = el.width+this.itemsMarginX;
        y += maxh+this.itemsMarginY;
      }
      el.y = y+el.height*anchorY;
    }
  };

  return Block;
}(Display(PIXI.Container)));

/**
 * Implementing PIXI.Text for MarkusJS.
 * @example
 * text | SOME TEXT VALUE
 *   &#64;size 100
 *   &#64;font Bebas Neue
 *   &#64;color #fff
 *
 * @class
 * @mixes markus.mixins.Display
 * @memberof markus.elements
 * @augments PIXI.Text
 */
var Text = /*@__PURE__*/(function (superclass) {
  function Text(preset) {
    superclass.call(this, preset, preset.value);
  }

  if ( superclass ) Text.__proto__ = superclass;
  Text.prototype = Object.create( superclass && superclass.prototype );
  Text.prototype.constructor = Text;

  var prototypeAccessors = { size: { configurable: true },color: { configurable: true },font: { configurable: true } };

  /**
   * Size text
   * @member {number}
  */
  prototypeAccessors.size.get = function () {
    return this.style.fontSize;
  };
  prototypeAccessors.size.set = function (v) {
    this.style.fontSize = v;
  };

  /**
   * Fill color text
   * @member {string}
   */
  prototypeAccessors.color.get = function () {
    return this.style.fill;
  };
  prototypeAccessors.color.set = function (v) {
    this.style.fill = v;
  };

  /**
   * Font family
   * @member {string}
   */
  prototypeAccessors.font.get = function () {
    return this.style.fontFamily;
  };
  prototypeAccessors.font.set = function (v) {
    this.style.fontFamily = v;
  };

  Object.defineProperties( Text.prototype, prototypeAccessors );

  return Text;
}(Display(PIXI.Text)));

/**
 * @namespace markus.elements
 */

var elements = ({
  App: App,
  Resources: Resources,
  Mixins: Mixins,
  Store: Store,
  Scenes: Scenes,
  Button: Button,
  Block: Block,
  Sprite: Sprite,
  Text: Text
});

/**
 * @namespace markus.mixins
 */

var index = ({
  Element: Element,
  Display: Display
});

/**
  * Additional logic for the properties of the element. Plugins are called every time a property is passed to an element.
  *
  * @example
  * function plugin(el, keyProp, allProps) {
  *  if(allProps[keyProp] === 'somevalue') {
  *    // do somethin
  *    return true // if true, the property will no longer be processed by other plugins.
  *  }
  * }
  * @namespace markus.propPlugins
*/


/**
 * Replaces appW to application width and appH to application height.
 * @memberof markus.propPlugins
 * @arg el {Element}
 * @arg key {string}
 * @arg props {Object}
*/
function fullsize(el, key, props) {
  if(props[key] === 'appW') {
    props[key] = el.mark.get('app').width;
  }
  else if(props[key] === 'appH') {
    props[key] = el.mark.get('app').height;
  }
}

/**
 * Print prop "consolelog" value to console. Return true
 * @memberof markus.propPlugins
 * @arg el {Element}
 * @arg key {string}
 * @arg props {Object}
 */
function print(el, key, props) {
  if(key === 'consolelog') {
    window.console.log(props[key]);
    return true;
  }
}

var propPlugins = ({
  fullsize: fullsize,
  print: print
});

/**
 * @namespace markus.utils
 */

/**
 * Checks if a subset belongs to a set
 * @memberof markus.utils
 * @param {Array} set - Given set
 * @param {Array} subset - Given subset
 * @returns {booleon}
 * @example
 * // return false
 * isSubsetArray([1, 2, 3, 5], [1, 4])
 */
function isSubsetArray(set, subset) {
  for(var i = 0; i < subset.length; i++) {
    var isInclude = false;
    for(var j = 0; j < set.length; j++) {
      if(set[j] === subset[i]) {
        isInclude = true;
        break;
      }
    }
    if(!isInclude) {
      return false;
    }
  }
  return true;
}

var utils = ({
  isSubsetArray: isSubsetArray
});

/**
 * Add new elements
 * @static
 * @memberof markus
 * @param elms {Element[]} Your custom elements to be used in the markfile
 */
function registerElements(elms) {
  Object.assign(elements, elms);
}

/**
 * Add new prop plugins
 * @memberof markus
 * @static
 * @param plugs {Object[]} Your custom elements to be used in the markfile
 */
function registerPropPlugins(plugs) {
  Object.assign(propPlugins, plugs);
}

/**
 * The root element of the entire tree of objects. Responsible for loading the tree and manipulating the elements.
 * @example
 * const mark = new markus.View('view.mark', () => {
 *   mark.get('resources').load(() => {
 *     mark.get('app').start();
 *   });
 * }, [Player, Bottle, EnemyController]);
 * @class
 * @memberof markus
 * @param [filepath] {string} File path to main markfile
 * @param [onReady] {function} Called when the markfile is loaded and the rendering
 */
var View = function View(filepath, onReady) {
  var this$1 = this;

  /**
   * Root child list which contains all the root elements of the mark file
   * @member {Element[]}
   */
  this.childList = [];

  /**
   * Marklang parser
   * @member {markus.Parser}
   */
  this.parser = new Parser('ajax');
  if(filepath) {
    this.parser.parseMarkfile(filepath).then(function (tree) {
      this$1.add(tree);
      onReady && onReady(this$1);
    });
  }

  /**
   * Main ticker for update all elements. Initially active.
   * @member {PIXI.ticker.Ticker}
   */
  this.ticker = new PIXI.ticker.Ticker();
  this.ticker.add(function (dt) { return this$1.updateElements(dt); });
  this.ticker.start();
};

/**
 * Update all elements in root childList
 * @private
 * @param dt {number} Delta time
 * @param [elms=view.childList] {Array} Array of element
 */
View.prototype.updateElements = function updateElements (dt, elms) {
    if ( elms === void 0 ) elms=this.childList;

  for(var i = 0; i < elms.length; i++) {
    elms[i].tick && elms[i].tick(dt);
    this.updateElements(dt, elms[i].childList);
  }
};


/**
 * Add elements to parent node
 * @param value {(string|string[]|Preset|Preset[])} Elements to be added can be either a string or an array of marklang markup strings, or a Preset or an array of Presets.
 * @param [parent=view] {Element} Parent element
 * @returns {(Element|Element[])} Returns added items
 *
 * @example
 * mark.add('enemy.zombie(level=23)', enemyController);
 * mark.add(['sprite.tag(prop=1)', 'text | SOME TEXT']);
 * mark.add([presetEnemy, presetEnemy], enemyController);
 * mark.add(presetEnemy, enemyController);
 */
View.prototype.add = function add (value, parent) {
    if ( parent === void 0 ) parent=this;

  if(!Array.isArray(value)) {
    return this.addPreset(value, parent);
  }

  var res = [];
  for(var i = 0; i < value.length; i++) {
    var preset = value[i];
    if(typeof preset === 'string') {
      preset = this.parser.parsePreset(preset);
    }
    res.push(this.addPreset(preset, parent));
  }
  return res;
};


/**
 * Add Preset to parent node
 * @param preset {Preset} Preset object
 * @param [parent=view] {Element} Parent element
 * @returns {Element} Returns added element
 */
View.prototype.addPreset = function addPreset (preset, parent) {
    if ( preset === void 0 ) preset={};
    if ( parent === void 0 ) parent=this;

  if(preset.type !== 'elementNode') {
    throw Error('Preset cannot be activate. His type is not elementNode');
  }

  var elementName = preset.element.slice(0, 1).toUpperCase() + preset.element.slice(1);
  var elmCtor = elements[elementName] || elements[preset.element];

  if(!elmCtor) {
    throw Error('Element "' + preset.element + '" is not defined');
  }

  // merge props with mixins
  var props = preset.props;
  if(this.get('mixins')) {
    props = this.get('mixins').merge(preset, preset.props);
  }

  var elm = new elmCtor(Object.assign(preset, {parent: parent, view: this, props: props}));
  elm.setProps(elm.props);
  return elm;
};


/**
 * Remove elements from parent node
 * @param value {(string|string[]|Element|Element[])} Elements to be removed can be either a string or an array of marklang markup selectors strings, or a Element or an array of Elements.
 * @param [parent=view] {Element} Parent element
 * @returns {(Element|Element[])} Returns removed items
 *
 * @example
 * mark.remove('enemy.zombie(level=23)', enemyController);
 * mark.remove([Enemy, Enemy], enemyController);
 * mark.remove(Enemy, enemyController);
 */
View.prototype.remove = function remove (value, parent) {
    if ( parent === void 0 ) parent=this;

  if(!Array.isArray(value)) {
    return this.removeElement(value, value.parentElement);
  }

  var res = [];
  for(var i = 0; i < value.length; i++) {
    var preset = value[i];
    if(typeof preset === 'string') {
      preset = this.get(preset, parent);
    }
    res.push(this.removeElement(preset, preset.parentElement));
  }
  return res;
};

/**
 * Remove Element from parent node
 * @param el {ELement} Element class
 * @param [parent=view] {Element} Parent element
 * @returns {Element} Returns removed element
 */
View.prototype.removeElement = function removeElement (el, parent) {
    if ( parent === void 0 ) parent=this;

  var index$$1 = parent.childList.indexOf(el);
  if(index$$1 !== -1) {
    el.onRemove && el.onRemove();
    parent.childList.splice(index$$1, 1);
    if(el instanceof PIXI.DisplayObject) {
      if(parent instanceof PIXI.DisplayObject) {
        parent.removeChild(el);
      }
      else {
        parent.stage.removeChild(el);
      }
    }
  }
  return el;
};

/**
 * Get element by selector
 * @param selector {ELement} Element selector
 * @param [parent=view] {Element} Parent element for search
 * @returns {Element}
 *
 * @example
 * mark.get('sprite.cat');
 * > Sprite
 *
 * mark.get('sprite.cat.black');
 * > null
 */
View.prototype.get = function get (selector, parent) {
    if ( parent === void 0 ) parent=this;

  var q = this.parser.parseQuery(selector);
  return this.find(q, parent.childList);
};

/**
 * Get elements by selector
 * @param selector {ELement} Elements selector
 * @param [parent=view] {Element} Parent element for search
 * @returns {Element[]}
 *
 * @example
 * mark.getAll('sprite.cat');
 * > [Sprite, Sptite, Sprite]
 *
 * mark.getAll('#cat');
 * > null
 */
View.prototype.getAll = function getAll (selector, parent) {
    if ( parent === void 0 ) parent=this;

  var q = this.parser.parseQuery(selector);
  return this.find(q, parent.childList, true);
};

/**
 * General method for searching items on request
 * @param q {Object} Query object
 * @param q.id {string} Query id
 * @param q.element {string} Query element name
 * @param q.tags {string[]} Query element tags
 * @param elms {Element[]} List Elements
 * @param [isAll=false] {booleon} Do I need to search for all elements by q
 * @returns {(Element[]|Element)}
 *
 * @example
 * mark.find({element: 'sprite', tags: ['cat'], mark.root, true});
 * > [Sprite, Sptite, Sprite]
 */
View.prototype.find = function find (q, elms, isAll) {
    if ( isAll === void 0 ) isAll=false;

  var res = [];
  for(var i = 0; i < elms.length; i++) {
    if(this.isSelectorOfElement(q, elms[i])) {
      if(isAll) {
        res.push(elms[i]);
      }
      else {
        return elms[i];
      }
    }

    // If childList has children and the search is performed globally
    if(elms[i].childList.length) {
      var find = this.find(q, elms[i].childList, isAll);
      if(!isAll && find) {
        return find;
      }
      else {
        res = res.concat(find);
      }
    }
  }
  return isAll ? res : null;
};

/**
 * Checks if the request is suitable for the item
 * @param q {Object} Query object
 * @param q.id {string} Query id
 * @param q.element {string} Query element name
 * @param q.tags {string[]} Query element tags
 * @param elm {Element} Checked Element
 * @returns {booleon}
 */
View.prototype.isSelectorOfElement = function isSelectorOfElement (q, elm) {
  var isEl = q.element ? q.element === elm.element : true;
  var isId = q.id ? q.id === elm.id : true;
  var isTags = isSubsetArray(elm.tags, q.tags);

  return isEl && isId && isTags;
};

/**
 * @namespace markus
 *
*/

export { Parser, View, elements, propPlugins, index as mixins, utils, registerElements, registerPropPlugins };
//# sourceMappingURL=markus.es.js.map
