import { createDirective } from './directive';

/**
 * Vue plugin definition
 * @param {import('vue').App} app
 * @param {Object}            options
 * @param {MaskReplaces}      options.placeholders
 */
export default (app, options = {}) => {
  app.directive('mask', createDirective(options));
};
