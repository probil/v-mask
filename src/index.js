import format from './format.js';

/**
 * Event handler
 * @param {HTMLInputElement} target
 */
function handler ({target}) {
  let {previousValue, mask} = target.dataset;

  // do nothing if mask is not specified
  if(!mask) return;

  if (typeof previousValue === 'string' && previousValue.length < target.value.length) {
    target.value = format(target.value, mask);
  }

  target.dataset.previousValue = target.value;
}

/**
 * Fires on bind handler
 * @param {HTMLInputElement} el
 * @param {String}           mask
 */
function bindHandler(el, mask) {
  el.dataset.mask = mask;

  //add event listener
  el.addEventListener('input', handler, false);

  // run format function right after bind
  handler({target: el})
}

/**
 * Fires on unbind handler
 * @param {HTMLInputElement} el
 */
function unbindHandler(el) {
  el.removeEventListener('input', handler, false);
}

/**
 * Fires on handler update
 * @param {HTMLInputElement} el
 * @param {String}           mask
 */
function updateHandler(el, mask){
  // change format
  el.dataset.mask = mask;

  // run format function with new mask
  el.value = format(el.value, mask);
}


/**
 * Vue plugin definition
 * @param {Vue} Vue
 */
export default function (Vue) {
  Vue.directive('mask', {
    bind (el, {value}) {
      bindHandler(el, value);
    },
    unbind: unbindHandler,
    // Injects vnode param so it's possible to check the value on the field
    update(el, {value, oldValue}, {elm}){
      // if mask was changed
      // if the field value is blank, returns, else it will mask the value
      if (value === oldValue && elm.value.length < 1) return;

      updateHandler(el, value)
    }
  });
};

