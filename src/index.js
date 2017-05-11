import format from './format.js';
import { trigger } from './utils'

/**
 * Dataset test
 */
function supportsDataset() {
  return !document || !document.documentElement || document.documentElement.dataset || (Object.getOwnPropertyDescriptor(Element.prototype, 'dataset')	&& Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get);
}

/**
 * Event handler
 * @param {HTMLInputElement} el
 * @param {Boolean}          force
 */
function updateValue (el, force = false) {
  let value = el.value;
  let previousValue;
  let mask;

  if (supportsDataset()) {
    previousValue = el.dataset.previousValue || '';
    mask = el.dataset.mask;
  } else {
    previousValue = el.getAttribute('data-previous-value') || '';
    mask = el.getAttribute('data-mask');
  }

  if(force || (value && value !== previousValue && value.length > previousValue.length)) {
    el.value = format(value, mask);
    trigger(el, 'input')
  }

  if (supportsDataset()) {
    el.dataset.previousValue = value;
  } else {
    el.setAttribute('data-previous-value', value);
  }
}

/**
 * Fires on handler update
 * @param {HTMLInputElement} el
 * @param {String}           mask
 */
function updateMask(el, mask) {
  // change format
  if (supportsDataset()) {
    el.dataset.mask = mask;
  } else {
    el.setAttribute('data-mask', mask);
  }
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