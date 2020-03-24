import directive from './directive';
import filter from './filter';

/**
 * Vue plugin definition
 * @param {Vue} Vue
 */
export default (Vue) => {
  Vue.directive('mask', directive);
  Vue.filter('VMask', filter);
};
