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

    /**
     * Called only once, when the directive is first bound to the element.
     * This is where you can do one-time setup work.
     *
     * @param {HTMLInputElement} el
     * @param {?String}          value
     */
    bind (el, {value}) {
      bindHandler(el, value);
    },

    /**
     * Called only once, when the directive is unbound from the element.
     */
    unbind: unbindHandler,

    /**
     * Called after the containing component has updated,
     * but possibly before its children have updated.
     * The directive’s value may or may not have changed,
     * but you can skip unnecessary updates by comparing the
     * binding’s current and old values.
     *
     * @param {HTMLInputElement} el
     * @param {?String}          value
     * @param {?String}          oldValue
     */
    update(el, {value, oldValue}){
      // if mask was not changed - do nothing
      if (value === oldValue) return;

      updateHandler(el, value)
    }
  });
};

