import format from './format.js';
import { trigger } from './utils'

/**
 * Event handler
 * @param {HTMLInputElement} el
 * @param {Boolean}          force
 */
function updateValue (el, force = false) {
  let {value, dataset: {previousValue = "", mask } } = el;

  if(force || (value && value !== previousValue && value.length > previousValue.length)) {
    el.value = format(value, mask);
    trigger(el, 'input')
  }

  el.dataset.previousValue = value;
}

/**
 * Fires on handler update
 * @param {HTMLInputElement} el
 * @param {String}           mask
 */
function updateMask(el, mask) {
  // change format
  el.dataset.mask = mask;
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
      updateMask(el, value);
      updateValue(el);
    },

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
    componentUpdated(el, {value, oldValue}){

      let isMaskChanged = value !== oldValue;

      // update mask first if changed
      if(isMaskChanged){
        updateMask(el, value);
      }

      // update value
      updateValue(el, isMaskChanged);
    }
  });
};

