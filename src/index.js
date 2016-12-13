import format from './format.js';

/**
 * Event handler
 * @param target
 */
function handler ({target}) {
  let {previousValue} = target.dataset;

  if (typeof previousValue === 'string' && previousValue.length < target.value.length) {
    target.value = format(target.value, this.format);
  }

  target.dataset.previousValue = target.value;
}

/**
 * Vue plugin definition
 * @param {Vue} Vue
 */
export default function (Vue) {
  Vue.directive('mask', {
    bind (el, {value}) {
      let handlerFunc = handler.bind({format: value});
      el.addEventListener('input', handlerFunc, false);

      return handlerFunc({target: el});
    },
    unbind(el) {
      el.removeEventListener('input', handler, false)
    }
  });
};

