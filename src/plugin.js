import { createDirective } from './directive';
import { createFilter } from './filter';

/**
 * Vue plugin definition
 * @param {Vue} Vue
 * @param {Object}       options
 * @param {MaskReplaces} options.placeholders
 */
export default (Vue, options = {}) => {
  Vue.directive('mask', createDirective(options));
  Vue.filter('VMask', createFilter(options));
};
