(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("markus", [], factory);
	else if(typeof exports === 'object')
		exports["markus"] = factory();
	else
		root["markus"] = factory();
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

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parser =
/*#__PURE__*/
function () {
  function Parser(data) {
    _classCallCheck(this, Parser);

    this.loadType = data.loadType || 'ajax';
  }

  _createClass(Parser, [{
    key: "parseMarkfile",
    value: function parseMarkfile(filepath) {
      var _this = this;

      return new Promise(function (resolve) {
        _this.imports([filepath]).then(function (data) {
          var entry = data[0].data;

          var imports = _this.getImports(entry);

          _this.imports(imports).then(function (files) {
            for (var i = 0; i < files.length; i++) {
              if (_this.getImports(files[i].data).length) throw Error('Imports are possible only in the entry file.');
              entry = entry.replace('import ' + files[i].path, files[i].data);
            }

            var presets = _this.parsePresets(entry.split('\n'));

            resolve(_this.generateTree(presets));
          });
        });
      });
    }
  }, {
    key: "imports",
    value: function imports(pathes) {
      var _this2 = this;

      var files = [];

      var _loop = function _loop(i) {
        if (_this2.loadType === 'ajax') {
          files.push(fetch(pathes[i]).then(function (res) {
            if (res.status === 404) throw Error('Markus module "' + pathes[i] + '" is not found');
            return res.text();
          }).then(function (data) {
            return {
              name: pathes[i].split('/').slice(-1)[0],
              path: pathes[i],
              data: data
            };
          }));
        }
      };

      for (var i = 0; i < pathes.length; i++) {
        _loop(i);
      }

      return Promise.all(files);
    }
  }, {
    key: "generateTree",
    value: function generateTree(presets) {
      var tree = [];

      for (var i = presets.length - 1; i >= 0; i--) {
        if (presets[i].depth !== 0) {
          for (var j = i - 1; j >= 0; j--) {
            if (presets[j].depth < presets[i].depth) {
              if (presets[i].type === 'valueNode') {
                if (presets[j].type === 'elementNode') presets[j].value = presets[i].value + (presets[j].value ? '\n' + presets[j].value : '');else if (presets[j].type === 'propNode') {
                  if (presets[j].value === true) presets[j].value = '';
                  presets[j].value = presets[i].value + (presets[j].value ? '\n' + presets[j].value : '');
                } else throw Error('valueNode cannot be a child of a ' + presets[j].type);
              }

              if (presets[i].type === 'propNode') {
                if (presets[j].type === 'propNode') {
                  if (_typeof(presets[j].value) !== 'object') presets[j].value = {
                    value: presets[j].value
                  };
                  Object.assign(presets[j].value, _defineProperty({}, presets[i].name, presets[i].value));
                } else if (presets[j].type === 'elementNode') {
                  Object.assign(presets[j].props, _defineProperty({}, presets[i].name, presets[i].value));
                } else throw Error('propNode cannot be a child of a ' + presets[j].type);
              } else if (presets[i].type === 'elementNode') {
                if (presets[j].type === 'elementNode') presets[j].presets.unshift(presets[i]);else throw Error('elementNode cannot be a child of a ' + presets[j].type);
              }

              break;
            }
          }
        } else tree.push(presets[i]);
      }

      return tree;
    }
  }, {
    key: "parsePresets",
    value: function parsePresets(lines) {
      var presets = [];

      for (var i = 0; i < lines.length; i++) {
        var preset = this.parsePreset(lines[i]);
        if (preset != null) presets.push(preset);
      }

      return presets;
    }
  }, {
    key: "parsePreset",
    value: function parsePreset(line) {
      var type = 'elementNode';
      var depth = this.getDepth(line); // if line is attr node

      var attr = this.getAttr(line);

      if (attr) {
        type = 'propNode';
        return {
          type: type,
          depth: depth,
          name: attr[0],
          value: attr[1]
        };
      } // else line is element, empty or value node


      var element = this.getElement(line);
      var tags = this.getTags(line);
      var value = this.getValue(line);
      var id = this.getId(line);
      var props = []; // if element is undefined, then line is block or value node

      if (element == null) {
        if (tags.length || id) element = '';else if (value) type = 'valueNode';else return;
      } // if line is elementNode, then parse props


      if (type !== 'valueNode') {
        props = this.getProps(line);
      }

      return {
        type: type,
        element: element,
        value: value,
        props: props,
        tags: tags,
        id: id,
        depth: depth,
        presets: []
      };
    }
  }, {
    key: "parseValue",
    value: function parseValue(value) {
      if (value === 'on' || value === 'yes' || value === 'true') return true;else if (value === 'off' || value === 'no' || value === 'false') return false;else if (/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) return Number(value);
      return value;
    }
  }, {
    key: "getImports",
    value: function getImports(data) {
      return (data.match(/import .+/g) || []).map(function (v) {
        return v.split(' ')[1];
      });
    }
  }, {
    key: "getDepth",
    value: function getDepth(line) {
      return (line.match(/^[\t ]+/) || [''])[0].length / 2;
    }
  }, {
    key: "parseQuery",
    value: function parseQuery(query) {
      var tags = (query.match(/\.\w+/g) || []).map(function (tag) {
        return tag.slice(1);
      });
      var id = (query.match(/\#\w+/) || [''])[0].slice(1);
      var element = (query.match(/^\w+/) || [])[0];
      return {
        element: element,
        id: id,
        tags: tags
      };
    }
  }, {
    key: "getElement",
    value: function getElement(line) {
      return (line.match(/^[\t ]*(\w+)/) || [])[1];
    }
  }, {
    key: "getTags",
    value: function getTags(line) {
      return (line.replace(/\(.+\)/, '').match(/\.\w+/g) || []).map(function (tag) {
        return tag.slice(1);
      });
    }
  }, {
    key: "getId",
    value: function getId(line) {
      return (line.replace(/\(.+\)/, '').match(/#\w+/) || [''])[0].slice(1);
    }
  }, {
    key: "getValue",
    value: function getValue(line) {
      return (line.match(/\| *(.+)/) || [])[1] || '';
    }
  }, {
    key: "getAttr",
    value: function getAttr(line) {
      var prop = line.match(/^[\t ]*@(\w+)(\s(.+))?/);
      if (prop) return [prop[1], prop[3] != null ? this.parseValue(prop[3]) : true];
    }
  }, {
    key: "getProps",
    value: function getProps(line) {
      var res = {};
      var find = line.match(/\((.+)\)/g);
      if (find == null) return {};
      var props = find[0].split(/,\s+/);

      for (var key in props) {
        var prop = props[key].replace('(', '').replace(')', '').split('=');
        res[prop[0]] = prop[1] != null ? this.parseValue(prop[1]) : true;
      }

      return res;
    }
  }]);

  return Parser;
}();

exports.default = Parser;
module.exports = exports["default"];

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Parser = _interopRequireDefault(__webpack_require__(/*! ./Parser */ "./src/Parser.js"));

var elements = _interopRequireWildcard(__webpack_require__(/*! ./elements */ "./src/elements/index.js"));

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View(filepath, onReady) {
    var _this = this;

    var customElms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, View);

    this.elements = elements;
    this.registerElements(customElms);
    this.childList = [];
    this.parser = new _Parser.default({
      loadType: 'ajax'
    });
    this.parser.parseMarkfile(filepath).then(function (tree) {
      _this.add(tree);

      onReady && onReady(_this);
    });
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(function (dt) {
      return _this.updateElements(dt);
    });
    this.ticker.start();
  }

  _createClass(View, [{
    key: "registerElements",
    value: function registerElements(elms) {
      Object.assign(this.elements, elms);
    }
  }, {
    key: "updateElements",
    value: function updateElements(dt) {
      var elms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.childList;

      for (var i = 0; i < elms.length; i++) {
        elms[i].tick && elms[i].tick(dt);
        this.updateElements(dt, elms[i].childList);
      }
    } // add element

  }, {
    key: "add",
    value: function add(value) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var res = [];
      if (typeof value === 'string') value = this.parser.parsePreset(value);
      if (!Array.isArray(value)) return this.addPreset(value, parent);

      for (var i = 0; i < value.length; i++) {
        res.push(this.addPreset(value[i], parent));
      }

      return res;
    }
  }, {
    key: "addPreset",
    value: function addPreset(preset) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      if (preset.type !== 'elementNode') throw Error('Preset cannot be activate. His type is not elementNode');
      if (!this.elements[preset.element]) throw Error('Element "' + preset.element + '" is not defined');
      return new this.elements[preset.element](this, parent, preset);
    } // remove element

  }, {
    key: "remove",
    value: function remove(value) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      if (typeof value === 'string') value = this.get(value, parent);
      if (!Array.isArray(value)) value = [value];

      for (var i = 0; i < value.length; i++) {
        this.removeElement(value[i], value[i].parentElement);
      }
    }
  }, {
    key: "removeElement",
    value: function removeElement(el) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var index = parent.childList.indexOf(el);

      if (index !== -1) {
        el.onRemove && el.onRemove();
        parent.childList.splice(index, 1);

        if (el instanceof PIXI.DisplayObject) {
          if (parent instanceof PIXI.DisplayObject) parent.removeChild(el);else parent.stage.removeChild(el);
        }
      }
    } // find element

  }, {
    key: "get",
    value: function get(selector) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var q = this.parser.parseQuery(selector);
      return this.find(q, parent.childList);
    }
  }, {
    key: "getAll",
    value: function getAll(selector) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var q = this.parser.parseQuery(selector);
      return this.find(q, parent.childList, true);
    }
  }, {
    key: "find",
    value: function find(q) {
      var elms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var isAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var res = [];

      for (var i = 0; i < elms.length; i++) {
        if (this.isSelectorOfElement(q, elms[i])) {
          if (isAll) res.push(elms[i]);else return elms[i];
        }

        if (elms[i].childList.length) {
          var find = this.find(q, elms[i].childList, isAll);
          if (!isAll && find) return find;else res = res.concat(find);
        }
      }

      return isAll ? res : null;
    }
  }, {
    key: "isSelectorOfElement",
    value: function isSelectorOfElement(q, elm) {
      var isEl = q.element ? q.element === elm.element : true;
      var isId = q.id ? q.id === elm.id : true;
      var isTags = (0, _utils.isSubsetArray)(elm.tags, q.tags);
      return isEl && isId && isTags;
    }
  }]);

  return View;
}();

exports.default = View;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/App.js":
/*!*****************************!*\
  !*** ./src/elements/App.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "./src/elements/Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_Element) {
  _inherits(App, _Element);

  function App(view, parent, data) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, view, parent, data, {
      width: window.innerWidth,
      height: window.innerHeight,
      sharedTicker: false,
      sharedLoader: false
    }));

    _this.defaultProps({
      smooth: true,
      width: 1920,
      height: 1080
    });

    document.body.appendChild(_this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";
    _this.resolution = null;
    window.addEventListener('resize', function () {
      return _this.resize(_this);
    });

    _this.resize();

    return _this;
  } // properties


  _createClass(App, [{
    key: "init",
    value: function init() {
      this.mark.add(this.presets, this);
    }
  }, {
    key: "resize",
    value: function resize() {
      this.resolution = window.innerWidth / this.width;
      this.renderer.resize(window.innerWidth, this.height * this.resolution);
      this.view.style.marginTop = window.innerHeight / 2 - this.height * this.resolution / 2 + 'px';
      this.stage.scale.set(this.resolution);
    }
  }, {
    key: "color",
    get: function get() {
      return this.renderer.backgroundColor;
    },
    set: function set(v) {
      this.renderer.backgroundColor = +v;
    }
  }, {
    key: "smooth",
    get: function get() {
      return PIXI.settings.SCALE_MODE !== PIXI.SCALE_MODES.NEAREST;
    },
    set: function set(v) {
      PIXI.settings.SCALE_MODE = v ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
    }
  }]);

  return App;
}((0, _Element2.default)(PIXI.Application));

exports.default = App;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Block.js":
/*!*******************************!*\
  !*** ./src/elements/Block.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Display2 = _interopRequireDefault(__webpack_require__(/*! ./Display */ "./src/elements/Display.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Block =
/*#__PURE__*/
function (_Display) {
  _inherits(Block, _Display);

  function Block(markus, parent, data) {
    var _this;

    _classCallCheck(this, Block);

    _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, markus, parent, data));

    _this.defaultProps({
      inlineItems: false
    });

    _this.mark.add(data.presets, _this);

    return _this;
  }

  return Block;
}((0, _Display2.default)(PIXI.Container));

exports.default = Block;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Button.js":
/*!********************************!*\
  !*** ./src/elements/Button.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Display2 = _interopRequireDefault(__webpack_require__(/*! ./Display */ "./src/elements/Display.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Button =
/*#__PURE__*/
function (_Display) {
  _inherits(Button, _Display);

  function Button(mark, parent, data) {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, mark, parent, data));
    _this.interactive = true;
    _this.buttonMode = true;

    _this.on('pointertap', function () {
      console.log(_this.mark.get('scenes'));
      if (_this.toScene) _this.mark.get('scenes').scene = _this.toScene;
    });

    _this.mark.add(data.presets, _this);

    return _this;
  }

  return Button;
}((0, _Display2.default)(PIXI.Container));

exports.default = Button;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Display.js":
/*!*********************************!*\
  !*** ./src/elements/Display.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Display;

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "./src/elements/Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function Display(superclass) {
  return (
    /*#__PURE__*/
    function (_Element) {
      _inherits(_class, _Element);

      function _class(view, parent, data, arg) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, view, parent, data, arg));

        _this.defaultProps({
          x: 400,
          y: 400
        });

        _this.addTick(function () {
          return _this._computedPosition();
        });

        return _this;
      }

      _createClass(_class, [{
        key: "_computedPosition",
        value: function _computedPosition() {
          var w = this.parentElement.contentW || this.mark.get('app').width;
          var h = this.parentElement.contentH || this.mark.get('app').height;
          if (this.left != null) this.x = this.left;else if (this.centerX != null) this.x = w / 2 + this.centerX;else if (this.right != null) this.x = w - this.right;
          if (this.top != null) this.y = this.top;else if (this.centerY != null) this.y = h / 2 + this.centerY;else if (this.bottom != null) this.y = h - this.bottom;
        }
      }, {
        key: "angle",
        set: function set(v) {
          this.rotation = v * PIXI.DEG_TO_RAD;
        },
        get: function get() {
          return this.rotation * PIXI.RAD_TO_DEG;
        }
      }, {
        key: "w",
        set: function set(v) {
          this.width = v;
        }
      }, {
        key: "h",
        set: function set(v) {
          this.height = v;
        }
      }, {
        key: "left",
        set: function set(v) {
          this._right = null;
          this._centerX = null;
          this._left = v === true ? 0 : v === false ? null : v;
        },
        get: function get() {
          return this._left;
        }
      }, {
        key: "right",
        set: function set(v) {
          this._left = null;
          this._centerX = null;
          this._right = v === true ? 0 : v === false ? null : v;
        },
        get: function get() {
          return this._right;
        }
      }, {
        key: "centerX",
        set: function set(v) {
          this._left = null;
          this._right = null;
          this._centerX = v === true ? 0 : v === false ? null : v;
        },
        get: function get() {
          return this._centerX;
        }
      }, {
        key: "top",
        set: function set(v) {
          this._bottom = null;
          this._centerY = null;
          this._top = v === true ? 0 : v === false ? null : v;
        },
        get: function get() {
          return this._top;
        }
      }, {
        key: "bottom",
        set: function set(v) {
          this._top = null;
          this._centerY = null;
          this._bottom = v === true ? 0 : v === false ? null : v;
        },
        get: function get() {
          return this._bottom;
        }
      }, {
        key: "centerY",
        set: function set(v) {
          this._top = null;
          this._bottom = null;
          this._centerY = v === true ? 0 : v === false ? null : v;
        },
        get: function get() {
          return this._centerY;
        }
      }]);

      return _class;
    }((0, _Element2.default)(superclass))
  );
}

module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Element.js":
/*!*********************************!*\
  !*** ./src/elements/Element.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Element;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Element() {
  var superclass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] :
  /*#__PURE__*/
  function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    return _class;
  }();
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inherits(_class2, _superclass);

      function _class2(view, parent, preset, arg) {
        var _this;

        _classCallCheck(this, _class2);

        _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, arg));
        _this.mark = view;
        _this.element = preset.element;
        _this.id = preset.id;
        _this.tags = preset.tags;
        _this.presets = preset.presets;
        _this.parentElement = parent;
        _this.value = preset.value;
        _this.childList = [];
        _this.ticks = [];
        _this.mark.get('styles') && Object.assign(preset.props, _this.mark.get('styles').get(_this));

        _this.updateProps(preset.props);

        parent && parent.childList.push(_this);

        if (_this instanceof PIXI.DisplayObject) {
          if (parent instanceof PIXI.DisplayObject) parent.addChild(_this);else parent.stage.addChild(_this);
        }

        return _this;
      }

      _createClass(_class2, [{
        key: "updateProps",
        value: function updateProps(props) {
          for (var key in props) {
            if (_typeof(this[key]) === 'object') {
              if (_typeof(props[key]) === 'object') Object.assign(this[key], props[key]);else if (this[key].set) this[key].set(props[key]);
              if (props[key + 'X']) this[key].x = props[key + 'X'];
              if (props[key + 'Y']) this[key].y = props[key + 'Y'];
            } else this[key] = props[key];
          }
        }
      }, {
        key: "defaultProps",
        value: function defaultProps(props) {
          for (var key in props) {
            if (this[key] === undefined) this.updateProps(_defineProperty({}, key, props[key]));
          }
        }
      }, {
        key: "addTick",
        value: function addTick(cb) {
          this.ticks.push(cb);
        }
      }, {
        key: "tick",
        value: function tick(dt) {
          for (var i = 0; i < this.ticks.length; i++) {
            this.ticks[i](dt);
          }
        }
      }]);

      return _class2;
    }(superclass)
  );
}

module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Resources.js":
/*!***********************************!*\
  !*** ./src/elements/Resources.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "./src/elements/Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Resources =
/*#__PURE__*/
function (_Element) {
  _inherits(Resources, _Element);

  function Resources(markus, root, data) {
    var _this;

    _classCallCheck(this, Resources);

    _this = _possibleConstructorReturn(this, (Resources.__proto__ || Object.getPrototypeOf(Resources)).call(this, markus, root, data));

    for (var key in data.props) {
      _this.add(key, data.props[key]);
    }

    return _this;
  }

  return Resources;
}((0, _Element2.default)(PIXI.loaders.Loader));

exports.default = Resources;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Scenes.js":
/*!********************************!*\
  !*** ./src/elements/Scenes.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "./src/elements/Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scenes =
/*#__PURE__*/
function (_Element) {
  _inherits(Scenes, _Element);

  function Scenes(view, parent, data) {
    _classCallCheck(this, Scenes);

    return _possibleConstructorReturn(this, (Scenes.__proto__ || Object.getPrototypeOf(Scenes)).call(this, view, parent, data));
  }

  _createClass(Scenes, [{
    key: "scene",
    set: function set(id) {
      for (var i = 0; i < this.presets.length; i++) {
        if (this.presets[i].id === id) {
          this._scene && this.mark.remove(this._scene, this);
          this._scene = this.mark.add(this.presets[i], this);
        }
      }
    },
    get: function get() {
      return this._scene;
    }
  }]);

  return Scenes;
}((0, _Element2.default)(PIXI.Container));

exports.default = Scenes;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Sprite.js":
/*!********************************!*\
  !*** ./src/elements/Sprite.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Display2 = _interopRequireDefault(__webpack_require__(/*! ./Display */ "./src/elements/Display.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sprite =
/*#__PURE__*/
function (_Display) {
  _inherits(Sprite, _Display);

  function Sprite(mark, parent, data) {
    _classCallCheck(this, Sprite);

    return _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, mark, parent, data, PIXI.Texture.WHITE));
  }

  _createClass(Sprite, [{
    key: "src",
    get: function get() {
      return this._src;
    },
    set: function set(v) {
      this._src = v;
      this.texture = PIXI.Texture.fromImage(v);
    }
  }]);

  return Sprite;
}((0, _Display2.default)(PIXI.Sprite));

exports.default = Sprite;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Styles.js":
/*!********************************!*\
  !*** ./src/elements/Styles.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "./src/elements/Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Styles =
/*#__PURE__*/
function (_Element) {
  _inherits(Styles, _Element);

  function Styles(markus, root, data) {
    var _this;

    _classCallCheck(this, Styles);

    _this = _possibleConstructorReturn(this, (Styles.__proto__ || Object.getPrototypeOf(Styles)).call(this, markus, root, data));
    _this.styles = data.presets;
    return _this;
  }

  _createClass(Styles, [{
    key: "get",
    value: function get(elm) {
      var props = {};

      for (var i = 0; i < this.styles.length; i++) {
        if (this.mark.isSelectorOfElement(this.styles[i], elm)) Object.assign(props, this.styles[i].props);
      }

      return props;
    }
  }, {
    key: "set",
    value: function set(selector, props) {
      this.styles[selector] = props;
    }
  }]);

  return Styles;
}((0, _Element2.default)());

exports.default = Styles;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/Text.js":
/*!******************************!*\
  !*** ./src/elements/Text.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Display2 = _interopRequireDefault(__webpack_require__(/*! ./Display */ "./src/elements/Display.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Text =
/*#__PURE__*/
function (_Display) {
  _inherits(Text, _Display);

  function Text(view, parent, data) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, view, parent, data));
    if (_this.value) _this.text = _this.value;
    return _this;
  }

  _createClass(Text, [{
    key: "size",
    get: function get() {
      return this.style.fontSize;
    },
    set: function set(v) {
      this.style.fontSize = v;
    }
  }, {
    key: "color",
    get: function get() {
      return this.style.fill;
    },
    set: function set(v) {
      this.style.fill = v;
    }
  }, {
    key: "font",
    get: function get() {
      return this.style.fontFamily;
    },
    set: function set(v) {
      this.style.fontFamily = v;
    }
  }]);

  return Text;
}((0, _Display2.default)(PIXI.Text));

exports.default = Text;
module.exports = exports["default"];

/***/ }),

/***/ "./src/elements/index.js":
/*!*******************************!*\
  !*** ./src/elements/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "element", {
  enumerable: true,
  get: function get() {
    return _Element.default;
  }
});
Object.defineProperty(exports, "display", {
  enumerable: true,
  get: function get() {
    return _Display.default;
  }
});
Object.defineProperty(exports, "app", {
  enumerable: true,
  get: function get() {
    return _App.default;
  }
});
Object.defineProperty(exports, "resources", {
  enumerable: true,
  get: function get() {
    return _Resources.default;
  }
});
Object.defineProperty(exports, "styles", {
  enumerable: true,
  get: function get() {
    return _Styles.default;
  }
});
Object.defineProperty(exports, "scenes", {
  enumerable: true,
  get: function get() {
    return _Scenes.default;
  }
});
Object.defineProperty(exports, "button", {
  enumerable: true,
  get: function get() {
    return _Button.default;
  }
});
Object.defineProperty(exports, "block", {
  enumerable: true,
  get: function get() {
    return _Block.default;
  }
});
Object.defineProperty(exports, "sprite", {
  enumerable: true,
  get: function get() {
    return _Sprite.default;
  }
});
Object.defineProperty(exports, "text", {
  enumerable: true,
  get: function get() {
    return _Text.default;
  }
});

var _Element = _interopRequireDefault(__webpack_require__(/*! ./Element */ "./src/elements/Element.js"));

var _Display = _interopRequireDefault(__webpack_require__(/*! ./Display */ "./src/elements/Display.js"));

var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "./src/elements/App.js"));

var _Resources = _interopRequireDefault(__webpack_require__(/*! ./Resources */ "./src/elements/Resources.js"));

var _Styles = _interopRequireDefault(__webpack_require__(/*! ./Styles */ "./src/elements/Styles.js"));

var _Scenes = _interopRequireDefault(__webpack_require__(/*! ./Scenes */ "./src/elements/Scenes.js"));

var _Button = _interopRequireDefault(__webpack_require__(/*! ./Button */ "./src/elements/Button.js"));

var _Block = _interopRequireDefault(__webpack_require__(/*! ./Block */ "./src/elements/Block.js"));

var _Sprite = _interopRequireDefault(__webpack_require__(/*! ./Sprite */ "./src/elements/Sprite.js"));

var _Text = _interopRequireDefault(__webpack_require__(/*! ./Text */ "./src/elements/Text.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Parser: true,
  View: true
};
Object.defineProperty(exports, "Parser", {
  enumerable: true,
  get: function get() {
    return _Parser.default;
  }
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function get() {
    return _View.default;
  }
});

var _Parser = _interopRequireDefault(__webpack_require__(/*! ./Parser.js */ "./src/Parser.js"));

var _View = _interopRequireDefault(__webpack_require__(/*! ./View.js */ "./src/View.js"));

var _elements = __webpack_require__(/*! ./elements */ "./src/elements/index.js");

Object.keys(_elements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _elements[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSubsetArray = isSubsetArray;

function isSubsetArray(set, subset) {
  for (var i = 0; i < subset.length; i++) {
    var isInclude = false;

    for (var j = 0; j < set.length; j++) {
      if (set[j] == subset[i]) {
        isInclude = true;
        break;
      }
    }

    if (!isInclude) return false;
  }

  return true;
}

/***/ })

/******/ });
});
//# sourceMappingURL=markus.js.map