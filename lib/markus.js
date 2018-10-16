(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/elements/App.js":
/*!*****************************!*\
  !*** ./src/elements/App.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _BasicElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicElement */ "./src/elements/BasicElement.js");


class App extends Object(_BasicElement__WEBPACK_IMPORTED_MODULE_0__["default"])(PIXI.Application) {
  constructor(markus, root, data) {
    super(markus, root, data, {
      backgroundColor: data.props.color || 0x000000,
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    });

    document.body.appendChild(this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";

    if(!data.props.smooth) PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.width = data.props.w || 1280;
    this.height = data.props.h || 720;
    this.resolution = null;

    this.childList = this.stage.children;

    window.addEventListener('resize', () => this.resize(this));
    this.resize();

  }
  startRender() {
    this.markus.activatePresets(this, this.presets);
  }
  resize() {
    this.resolution = window.innerWidth/this.width;
    this.renderer.resize(window.innerWidth, this.height*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.height*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }
}


/***/ }),

/***/ "./src/elements/BasicElement.js":
/*!**************************************!*\
  !*** ./src/elements/BasicElement.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const BasicElement = (superclass=class {}) => class extends superclass {
  constructor(markus, parent, data, arg) {
    console.log(superclass)

    super(arg);

    this.markus = markus;
    this.element = data.element;
    this.tags = data.tags;
    this.id = data.id;
    this.value = data.value;
    this.presets = data.presets;

    this.childList = []
  }

  add(child) {
    this.childList.push(child);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BasicElement);


/***/ }),

/***/ "./src/elements/Block.js":
/*!*******************************!*\
  !*** ./src/elements/Block.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Block; });
/* harmony import */ var _DisplayElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayElement */ "./src/elements/DisplayElement.js");


class Block extends Object(_DisplayElement__WEBPACK_IMPORTED_MODULE_0__["default"])(PIXI.Container) {
  constructor(markus, parent, data) {
    super(markus, parent, data);

    this.inlineItems = data.props.inlineItems || false;
  }
}


/***/ }),

/***/ "./src/elements/DisplayElement.js":
/*!****************************************!*\
  !*** ./src/elements/DisplayElement.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BasicElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicElement */ "./src/elements/BasicElement.js");


const DisplayElement = (pixiClass) => class extends Object(_BasicElement__WEBPACK_IMPORTED_MODULE_0__["default"])(pixiClass) {
  constructor(markus, parent, data, arg) {
    super(markus, parent, data, arg);

    // Computed thisement Position
    if(props.centerX != null) this.x = parent.width/2;
    else if(props.left != null) this.x = props.left;
    else if(props.right != null) this.x = parent.width-props.right;
    else this.x = props.x || 0;

    if(props.centerY != null) this.y = parent.height/2;
    else if(props.top != null) this.y = props.top;
    else if(props.bottom != null) this.y = parent.height-props.bottom;
    else this.y = props.y || 0;

    this.x += props.marginX || 0;
    this.y += props.marginY || 0;

    // Computed thisement transform
    this.width = props.w || this.width;
    this.height = props.h || this.height;
    this.angle = props.angle || 0;

    if(props.scale == null) {
      if(props.scaleX != null) this.scale.x = props.scaleX;
      if(props.scaleY != null) this.scale.y = props.scaleY;
    } else this.scale.set(props.scale, props.scale);

    if(props.anchor == null && this.anchor) {
      this.anchor.x = props.anchorX || 0;
      this.anchor.y = props.anchorY || 0;
    } else this.anchor && this.anchor.set(props.anchor, props.anchor);

    markus.activatePresets(this, data.presets);
  }
  set angle(deg) {
    if(typeof deg != 'number') return;
    this.rotation = deg*PIXI.DEG_TO_RAD;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DisplayElement);


/***/ }),

/***/ "./src/elements/Resources.js":
/*!***********************************!*\
  !*** ./src/elements/Resources.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Resources; });
/* harmony import */ var _BasicElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicElement */ "./src/elements/BasicElement.js");


class Resources extends Object(_BasicElement__WEBPACK_IMPORTED_MODULE_0__["default"])(PIXI.loaders.Loader) {
  constructor(markus, root, data) {
    super(markus, root, data);

    for(let key in data.props) {
      this.add(key, data.props[key]);
    }
  }
}


/***/ }),

/***/ "./src/elements/Sprite.js":
/*!********************************!*\
  !*** ./src/elements/Sprite.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sprite; });
/* harmony import */ var _DisplayElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayElement */ "./src/elements/DisplayElement.js");


class Sprite extends Object(_DisplayElement__WEBPACK_IMPORTED_MODULE_0__["default"])(PIXI.Sprite) {
  constructor(markus, parent, data) {
    super(markus, parent, data, data.props.texture ? PIXI.Texture.fromImage(data.props.texture) : PIXI.Texture.WHITE);

    
  }
}


/***/ }),

/***/ "./src/elements/Styles.js":
/*!********************************!*\
  !*** ./src/elements/Styles.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Styles; });
/* harmony import */ var _BasicElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicElement */ "./src/elements/BasicElement.js");


class Styles extends Object(_BasicElement__WEBPACK_IMPORTED_MODULE_0__["default"])() {
  constructor(markus, root, data) {
    super(markus, root, data)
    this.styles = data.presets;
  }
  get(elm) {
    let props = {};
    for(let i = 0; i < this.styles.length; i++) {
      if(this.markus.isSelectorOfElement(this.styles[i], elm))
        Object.assign(props, this.styles[i].props);
    }
    return props;
  }
  set(selector, props) {
    this.styles[selector] = props;
  }
}


/***/ }),

/***/ "./src/elements/Text.js":
/*!******************************!*\
  !*** ./src/elements/Text.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _DisplayElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayElement */ "./src/elements/DisplayElement.js");


class Text extends Object(_DisplayElement__WEBPACK_IMPORTED_MODULE_0__["default"])(PIXI.Text) {
  constructor(markus, parent, data) {
    super(markus, parent, data, data.value);

    this.style.fontSize = data.props.size;
    this.style.fontFamily = data.props.font;
    this.style.fontWeight = data.props.weight || 'normal';
    this.style.fontStyle = data.props.style || 'normal';
    this.style.fill = data.props.color || '#000';
  }
}


/***/ }),

/***/ "./src/elements/index.js":
/*!*******************************!*\
  !*** ./src/elements/index.js ***!
  \*******************************/
/*! exports provided: app, resources, styles, block, sprite, text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/elements/App.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "app", function() { return _App__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resources */ "./src/elements/Resources.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resources", function() { return _Resources__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Styles */ "./src/elements/Styles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return _Styles__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Block */ "./src/elements/Block.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "block", function() { return _Block__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sprite */ "./src/elements/Sprite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sprite", function() { return _Sprite__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Text */ "./src/elements/Text.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "text", function() { return _Text__WEBPACK_IMPORTED_MODULE_5__["default"]; });










/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Markus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Markus", function() { return Markus; });
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ "./src/parser/index.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements */ "./src/elements/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");




class Markus {
  constructor(elements={}) {
    this.parser = new _parser__WEBPACK_IMPORTED_MODULE_0__["default"]({loadType: 'browser'});
    this.elements = Object.assign(_elements__WEBPACK_IMPORTED_MODULE_1__, elements);
    this.presets = [];
    this.childList = [];

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add((dt) => this.updateElements(dt));
  }

  updateElements(dt, elms=this.childList) {
    for(let i = 0; i < elms.length; i++) {
      elms[i].update && elms[i].update(dt);
      this.updateElements(dt, elms[i].childList);
    }
  }

  add(filepath) {
    return new Promise((resolve) => {
      this.parser.parseMarkfile(filepath).then((tree) => {
        this.presets = tree;
        this.activatePresets(this, this.presets);
        resolve(this);
      })
    })
  }

  createElement(parent, str) {
    let preset = this.parser.parsePreset(str);
    return this.activatePreset(parent, parent);
  }

  // presets
  activatePreset(root, preset) {
    if(preset.type !== 'elementNode') throw Error('Preset cannot be activate. His type is not elementNode');
    if(!this.elements[preset.element]) throw Error('Element "' + preset.element + '" is not defined');

    this.get('styles') && Object.assign(preset.props, this.get('styles').get(preset));
    root.childList.push(new this.elements[preset.element](this, root, preset));
  }

  activatePresets(parent, presets) {
    let res = [];
    for(let key in presets) {
      res.push(this.activatePreset(parent, presets[key]));
    }
    return res;
  }

  addRoot(elms) {
    if(typeof elms === 'array') this.childList = this.childList.concat(elm);
    else this.childList.push(elms);
  }
  removeRoot(elm) {
    let i = this.childList.indexOf(elm);
    if(i != -1) this.childList.splice(i, 1);
  }

  // find objects
  get(selector) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, this.childList);
  }
  getAll(selector) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, this.childList, true);
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
    let isTags = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isSubsetArray"])(elm.tags, q.tags);

    return isEl && isId && isTags;
  }
}


/***/ }),

/***/ "./src/parser/index.js":
/*!*****************************!*\
  !*** ./src/parser/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MarkusParser; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
// The first version of the parser based on RegExp. In the future, needs a faster solution.
// 0.1.0v


class MarkusParser {
  constructor(data) {
    this.loadType = data.loadType || 'browser';
  }
  parseMarkfile(filepath) {
    return new Promise((resolve) => {
      this.imports([filepath]).then((data) => {
        let entry = data[0].data;
        let imports = this.getImports(entry);

        this.imports(imports).then((files) => {
          for(let i = 0; i < files.length; i++) {
            if(this.getImports(files[i].data).length) throw Error('Imports are possible only in the entry file.')
            entry = entry.replace('import ' + files[i].path, files[i].data);
          }

          let presets = this.parsePresets(entry.split('\n'));
          resolve(this.generateTree(presets));
        })
      })
    })
  }
  imports(pathes) {
    let files = [];
    for(let i = 0; i < pathes.length; i++) {
      if(this.loadType === 'browser') {
        files.push(fetch(pathes[i])
          .then((res) => {
            if(res.status === 404) throw Error('Markus module "' + pathes[i] + '" is not found');
            return res.text()
          }).then((data) => {
            return {name: pathes[i].split('/').slice(-1)[0], path: pathes[i], data}
          })
        )
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
                if(typeof presets[j].value !== 'object') presets[j].value = {value: presets[j].value};
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
      let preset = this.parsePreset(lines[i]);
      if(preset != null) presets.push(preset);
    }
    return presets;
  }
  parsePreset(line) {
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
      if(tags.length || id) element = '';
      else if(value) type = 'valueNode';
      else return;
    }

    // if line is elementNode, then parse props
    if(type !== 'valueNode') {
      props = this.getProps(line);
    }

    return {type, element, value, props, tags, id, depth, presets: []};
  }
  parseValue(value) {
    if(value === 'on' || value === 'yes' || value === 'true') return true;
    else if(value === 'off' || value === 'no' || value === 'false') return false;
    else if(/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) return Number(value);
    return value;
  }
  getImports(data) {
    return (data.match(/import .+/g) || []).map((v) => v.split(' ')[1]);
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
    if(prop) return [prop[1], prop[3] != null ? this.parseValue(prop[3]) : true]
  }
  getProps(line) {
    let res = {};
    let find = line.match(/\((.+)\)/g);
    if(find == null) return {};

    let props = find[0].split(/,\s+/);
    for(let key in props) {
      let prop = props[key].replace('(', '').replace(')', '').split('=');
      res[prop[0]] = prop[1] != null ? this.parseValue(prop[1]) : true;
    }
    return res;
  }
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isSubsetArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSubsetArray", function() { return isSubsetArray; });
function isSubsetArray(set, subset) {
  for(let i = 0; i < subset.length; i++) {
    let isInclude = false;
    for(let j = 0; j < set.length; j++) {
      if(set[j] == subset[i]) {
        isInclude = true;
        break;
      }
    }
    if(!isInclude) return false;
  }
  return true;
}


/***/ })

/******/ });
});
//# sourceMappingURL=markus.js.map