import { createDirective } from './directive';
import filter from './filter';

/**
 * Vue plugin definition
 * @param {Vue} Vue
 * @param {Object}                  options
 * @param {Object.<string, RegExp>} options.placeholders
 */
export default (Vue, options = {}) => {
  Vue.directive('mask', createDirective(options));
  Vue.filter('VMask', filter);
};
