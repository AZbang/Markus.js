(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Markus", [], factory);
	else if(typeof exports === 'object')
		exports["Markus"] = factory();
	else
		root["Markus"] = factory();
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
function (_PIXI$Application) {
  _inherits(App, _PIXI$Application);

  function App(markus, data) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, {
      backgroundColor: data.props.color || 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    }));
    document.body.appendChild(_this.view);
    document.body.style = "padding: 0; margin: 0; overflow: hidden; background: #000;";
    _this.markus = markus;
    _this.presets = data.presets;

    _this.markus.addRoot(_this);

    _this.resolution = null;
    _this.w = data.props.w || 1280;
    _this.h = data.props.h || 720;
    window.addEventListener('resize', function () {
      return _this.resize(_this);
    });

    _this.resize();

    return _this;
  }

  _createClass(App, [{
    key: "startRender",
    value: function startRender() {
      this.presets.length && this.stage.addChild.apply(this.stage, this.markus.activatePresets(this.presets));
    }
  }, {
    key: "resize",
    value: function resize() {
      this.resolution = window.innerWidth / this.w;
      this.renderer.resize(window.innerWidth, this.h * this.resolution);
      this.view.style.marginTop = window.innerHeight / 2 - this.h * this.resolution / 2 + 'px';
      this.stage.scale.set(this.resolution);
    }
  }]);

  return App;
}(PIXI.Application);

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Block =
/*#__PURE__*/
function (_PIXI$Container) {
  _inherits(Block, _PIXI$Container);

  function Block(markus, data) {
    var _this;

    _classCallCheck(this, Block);

    _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this));
    markus.mixinDisplayGrahic(_this, data.props);
    data.presets.length && _this.addChild.apply(_this, markus.activatePresets(data.presets));
    return _this;
  }

  return Block;
}(PIXI.Container);

exports.default = Block;
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Resources =
/*#__PURE__*/
function (_PIXI$loaders$Loader) {
  _inherits(Resources, _PIXI$loaders$Loader);

  function Resources(markus, data) {
    var _this;

    _classCallCheck(this, Resources);

    _this = _possibleConstructorReturn(this, (Resources.__proto__ || Object.getPrototypeOf(Resources)).call(this));
    markus.addRoot(_this);

    for (var key in data.props) {
      _this.add(key, data.props[key]);
    }

    return _this;
  }

  return Resources;
}(PIXI.loaders.Loader);

exports.default = Resources;
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sprite =
/*#__PURE__*/
function (_PIXI$Sprite) {
  _inherits(Sprite, _PIXI$Sprite);

  function Sprite(markus, data) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, data.props.texture ? PIXI.Texture.fromImage(data.props.texture) : PIXI.Texture.WHITE));
    markus.mixinDisplayGrahic(_this, data.props);
    return _this;
  }

  return Sprite;
}(PIXI.Sprite);

exports.default = Sprite;
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Text =
/*#__PURE__*/
function (_PIXI$Text) {
  _inherits(Text, _PIXI$Text);

  function Text(markus, data) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, data.value));
    _this.style.fontSize = data.props.size;
    _this.style.fontFamily = data.props.font;
    _this.style.fontWeight = data.props.weight || 'normal';
    _this.style.fontStyle = data.props.style || 'normal';
    _this.style.fill = data.props.color || '#000';
    markus.mixinDisplayGrahic(_this, data.props);
    return _this;
  }

  return Text;
}(PIXI.Text);

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

var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "./src/elements/App.js"));

var _Resources = _interopRequireDefault(__webpack_require__(/*! ./Resources */ "./src/elements/Resources.js"));

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
exports.default = void 0;

var _parser = _interopRequireDefault(__webpack_require__(/*! ./parser */ "./src/parser/index.js"));

var markusElements = _interopRequireWildcard(__webpack_require__(/*! ./elements */ "./src/elements/index.js"));

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Markus =
/*#__PURE__*/
function () {
  function Markus(filepath) {
    var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Markus);

    this.filepath = filepath;
    this.filename = filepath.split('/').slice(-1)[0];
    this.lines = [];
    this.parser = new _parser.default(this);
    this.elements = Object.assign(markusElements, elements);
    this.flatPresets = [];
    this.presets = [];
    this.roots = [];
  }

  _createClass(Markus, [{
    key: "load",
    value: function load(onReady) {
      var _this = this;

      PIXI.loader.add(this.filepath).load(function (loader, res) {
        _this.lines = res[_this.filename].data.split('\n');
        _this.flatPresets = _this.parser.parsePresets(_this.lines);
        _this.presets = _this.parser.generateTree(_this.flatPresets);

        _this.activatePresets(_this.presets);

        onReady && onReady(_this);
      });
    }
  }, {
    key: "addRoot",
    value: function addRoot(elms) {
      if (typeof elms === 'array') this.roots = this.roots.concat(elm);else this.roots.push(elms);
    }
  }, {
    key: "removeRoot",
    value: function removeRoot(elm) {
      var i = this.root.indexOf(elm);
      if (i != -1) this.root.splice(i, 1);
    }
  }, {
    key: "mixinDisplayGrahic",
    value: function mixinDisplayGrahic(el, props) {
      el.width = props.w || el.width;
      el.height = props.h || el.height;
      el.x = props.centerX ? this.get('app').w / 2 : props.x || 0;
      el.y = props.centerY ? this.get('app').h / 2 : props.y || 0;
      el.x += props.marginX || 0;
      el.y += props.marginY || 0;
      el.rotation = props.angle * PIXI.DEG_TO_RAD || 0;

      if (props.scale == null) {
        if (props.scaleX != null) el.scale.x = props.scaleX;
        if (props.scaleY != null) el.scale.y = props.scaleY;
      } else el.scale.set(props.scale, props.scale);

      if (props.anchor == null && el.anchor) {
        el.anchor.x = props.anchorX || 0;
        el.anchor.y = props.anchorY || 0;
      } else el.anchor && el.anchor.set(props.anchor, props.anchor);
    } // presets

  }, {
    key: "activatePreset",
    value: function activatePreset(preset) {
      var elm = new this.elements[preset.element](this, preset);
      elm.element = preset.element;
      elm.id = preset.id;
      elm.tags = preset.tags;
      return elm;
    }
  }, {
    key: "activatePresets",
    value: function activatePresets(presets) {
      var res = [];

      for (var key in presets) {
        res.push(this.activatePreset(presets[key]));
      }

      return res;
    } // find objects

  }, {
    key: "get",
    value: function get(queryStr) {
      var q = this.parser.parseQuery(queryStr);
      return this.find(q, this.roots);
    }
  }, {
    key: "getAll",
    value: function getAll(queryStr) {
      var q = this.parser.parseQuery(queryStr);
      return this.find(q, this.roots, true);
    }
  }, {
    key: "find",
    value: function find(q) {
      var elms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var isAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var res = [];

      for (var i = 0; i < elms.length; i++) {
        var isEl = q.element ? q.element === elms[i].element : true;
        var isId = q.id ? q.id === elms[i].id : true;
        var isTags = (0, _utils.isSubsetArray)(elms[i].tags, q.tags);

        if (isEl && isId && isTags) {
          if (isAll) res.push(elms[i]);else return elms[i];
        }

        if (elms[i].children || elms[i].stage) {
          var find = this.find(q, elms[i].children || elms[i].stage.children, isAll);
          if (!isAll && find) return find;else res = res.concat(find);
        }
      }

      return isAll ? res : null;
    }
  }]);

  return Markus;
}();

exports.default = Markus;
module.exports = exports["default"];

/***/ }),

/***/ "./src/parser/index.js":
/*!*****************************!*\
  !*** ./src/parser/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MarkusParser =
/*#__PURE__*/
function () {
  function MarkusParser(markus) {
    _classCallCheck(this, MarkusParser);

    this.markus = markus;
  }

  _createClass(MarkusParser, [{
    key: "generateTree",
    value: function generateTree(presets) {
      var tree = [];

      for (var i = presets.length - 1; i >= 0; i--) {
        if (presets[i].depth !== 0) {
          for (var j = i - 1; j >= 0; j--) {
            if (presets[j].depth < presets[i].depth) {
              if (presets[i].type === 'valueNode') {
                presets[j].value = presets[i].value + (presets[j].value ? '\n' + presets[j].value : '');
              } else if (presets[j].type === 'elementNode') {
                presets[j].presets.unshift(presets[i]);
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
        var preset = this.parseLine(lines[i]);
        if (preset != null) presets.push(preset);
      }

      return presets;
    }
  }, {
    key: "parseLine",
    value: function parseLine(line) {
      var type = 'elementNode';
      var element = this.getElement(line);
      var depth = this.getDepth(line);
      var tags = this.getTags(line);
      var value = this.getValue(line);
      var id = this.getId(line);
      var props = [];

      if (element == null) {
        if (tags.length || id) element = 'block';else if (value) type = 'valueNode';else return;
      }

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
    key: "getProps",
    value: function getProps(line) {
      var res = {};
      var find = line.match(/\((.+)\)/g);
      if (find == null) return {};
      var props = find[0].split(/,\s+/);

      for (var key in props) {
        var prop = props[key].replace('(', '').replace(')', '').split('=');
        res[prop[0]] = prop[1] != null ? (0, _utils.parseValue)(prop[1]) : true;
      }

      return res;
    }
  }]);

  return MarkusParser;
}();

exports.default = MarkusParser;
module.exports = exports["default"];

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
exports.parseValue = parseValue;
exports.isSubsetArray = isSubsetArray;

function parseValue(value) {
  if (/^[-\.\+]?[0-9]+\.?([0-9]+)?$/.test(value)) return Number(value);
  return value;
}

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