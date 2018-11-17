import Parser from './Parser';
import {elements} from './main';
import {isSubsetArray} from './utils';

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
export default class View {
  constructor(filepath, onReady) {
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
      this.parser.parseMarkfile(filepath).then(tree => {
        this.add(tree);
        onReady && onReady(this);
      });
    }

    /**
     * Main ticker for update all elements. Initially active.
     * @member {PIXI.ticker.Ticker}
     */
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(dt => this.updateElements(dt));
    this.ticker.start();
  }

  /**
   * Update all elements in root childList
   * @private
   * @param dt {number} Delta time
   * @param [elms=view.childList] {Array} Array of element
   */
  updateElements(dt, elms=this.childList) {
    for(let i = 0; i < elms.length; i++) {
      elms[i].tick && elms[i].tick(dt);
      this.updateElements(dt, elms[i].childList);
    }
  }


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
  add(value, parent=this) {
    if(!Array.isArray(value)) {
      return this.addPreset(value, parent);
    }

    let res = [];
    for(let i = 0; i < value.length; i++) {
      let preset = value[i];
      if(typeof preset === 'string') {
        preset = this.parser.parsePreset(preset);
      }
      res.push(this.addPreset(preset, parent));
    }
    return res;
  }


  /**
   * Add Preset to parent node
   * @param preset {Preset} Preset object
   * @param [parent=view] {Element} Parent element
   * @returns {Element} Returns added element
   */
  addPreset(preset={}, parent=this) {
    if(preset.type !== 'elementNode') {
      throw Error('Preset cannot be activate. His type is not elementNode');
    }

    let elementName = preset.element.slice(0, 1).toUpperCase() + preset.element.slice(1);
    let elmCtor = elements[elementName] || elements[preset.element];

    if(!elmCtor) {
      throw Error('Element "' + preset.element + '" is not defined');
    }

    // merge props with mixins
    let props = preset.props;
    if(this.get('mixins')) {
      props = this.get('mixins').merge(preset, preset.props);
    }

    let elm = new elmCtor(Object.assign(preset, {parent: parent, view: this, props: props}));
    elm.setProps(elm.props);
    return elm;
  }


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
  remove(value, parent=this) {
    if(!Array.isArray(value)) {
      return this.removeElement(value, value.parentElement);
    }

    let res = [];
    for(let i = 0; i < value.length; i++) {
      let preset = value[i];
      if(typeof preset === 'string') {
        preset = this.get(preset, parent);
      }
      res.push(this.removeElement(preset, preset.parentElement));
    }
    return res;
  }

  /**
   * Remove Element from parent node
   * @param el {ELement} Element class
   * @param [parent=view] {Element} Parent element
   * @returns {Element} Returns removed element
   */
  removeElement(el, parent=this) {
    let index = parent.childList.indexOf(el);
    if(index !== -1) {
      el.onRemove && el.onRemove();
      parent.childList.splice(index, 1);
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
  }

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
  get(selector, parent=this) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, parent.childList);
  }

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
  getAll(selector, parent=this) {
    let q = this.parser.parseQuery(selector);
    return this.find(q, parent.childList, true);
  }

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
  find(q, elms, isAll=false) {
    let res = [];
    for(let i = 0; i < elms.length; i++) {
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
        let find = this.find(q, elms[i].childList, isAll);
        if(!isAll && find) {
          return find;
        }
        else {
          res = res.concat(find);
        }
      }
    }
    return isAll ? res : null;
  }

  /**
   * Checks if the request is suitable for the item
   * @param q {Object} Query object
   * @param q.id {string} Query id
   * @param q.element {string} Query element name
   * @param q.tags {string[]} Query element tags
   * @param elm {Element} Checked Element
   * @returns {booleon}
   */
  isSelectorOfElement(q, elm) {
    let isEl = q.element ? q.element === elm.element : true;
    let isId = q.id ? q.id === elm.id : true;
    let isTags = isSubsetArray(elm.tags, q.tags);

    return isEl && isId && isTags;
  }
}
