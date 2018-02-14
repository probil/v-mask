/* eslint-disable no-param-reassign */
import format from './format';
import { trigger } from './utils';
import { isAndroid, isChrome } from './utils/env';

/**
 * Event handler
 * @param {HTMLInputElement} el
 * @param {Boolean}          force
 */
function updateValue(el, force = false) {
  const { value, dataset: { previousValue = '', mask } } = el;

  if (force || (value && value !== previousValue && value.length > previousValue.length)) {
    el.value = format(value, mask);
    if (isAndroid && isChrome) {
      setTimeout(() => trigger(el, 'input'), 0);
    } else {
      trigger(el, 'input');
    }
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
 * Vue directive definition
 */
export default {

  /**
   * Called only once, when the directive is first bound to the element.
   * This is where you can do one-time setup work.
   *
   * @param {HTMLInputElement} el
   * @param {?String}          value
   */
  bind(el, { value }) {
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
  componentUpdated(el, { value, oldValue }) {
    const isMaskChanged = value !== oldValue;

    // update mask first if changed
    if (isMaskChanged) {
      updateMask(el, value);
    }

    // update value
    updateValue(el, isMaskChanged);
  },
};
