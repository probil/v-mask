import directive from './directive';

/**
 * Vue plugin definition
 * @param {Vue} Vue
 */
export default (Vue) => {
  Vue.directive('mask', directive);
};
