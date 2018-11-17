import Element from '../mixins/Element';

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
export default class Resources extends Element(PIXI.loaders.Loader) {
  constructor(preset) {
    super(preset);

    for(let key in this.props) {
      this.add(key, this.props[key]);
    }
    this.props = {};
  }
}
