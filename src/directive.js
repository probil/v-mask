/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';
import { stringMaskToRegExpMask, arrayMaskToRegExpMask } from './maskToRegExpMask';
import { trigger, queryInputElementInside } from './utils';
import { isAndroid, isChrome } from './utils/env';
import createOptions from './createOptions';
import { defaultMaskReplacers } from './constants';

const options = createOptions();

function triggerInputUpdate(el) {
  const fn = trigger.bind(null, el, 'input');
  if (isAndroid && isChrome) {
    setTimeout(fn, 0);
  } else {
    fn();
  }
}

/**
 * Event handler
 * @param {HTMLInputElement} el
 * @param {Boolean}          force
 */
function updateValue(el, force = false) {
  const { value } = el;
  const { previousValue, mask } = options.get(el);

  const isValueChanged = value !== previousValue;
  const isLengthIncreased = value.length > previousValue.length;
  const isUpdateNeeded = value && isValueChanged && isLengthIncreased;

  if (force || isUpdateNeeded) {
    const { conformedValue } = conformToMask(value, mask, { guide: false });
    el.value = conformedValue;
    triggerInputUpdate(el);
  }

  options.partiallyUpdate(el, { previousValue: value });
}

/**
 * Fires on handler update
 * @param {HTMLInputElement}                      el
 * @param {String|Array.<String|RegExp>|Function} inputMask
 */
function updateMask(el, inputMask, maskReplacers) {
  let mask = null;

  if (Array.isArray(inputMask)) {
    mask = arrayMaskToRegExpMask(inputMask, maskReplacers);
  } else if (typeof inputMask === 'function') {
    mask = inputMask;
  } else {
    mask = stringMaskToRegExpMask(inputMask, maskReplacers);
  }

  options.partiallyUpdate(el, { mask });
}

/**
 * Merge custom mask replacers with default mask replacers
 * @param {Object<string, RegExp>} maskReplacers
 * @param {Objext<string, RegExp>} baseMaskReplacers
 * @return {Object} The extended mask replacers
 */
function extendMaskReplacers(maskReplacers, baseMaskReplacers = defaultMaskReplacers) {
  if (maskReplacers === null || Array.isArray(maskReplacers) || typeof maskReplacers !== 'object') {
    return baseMaskReplacers;
  }

  return Object.keys(maskReplacers).reduce((extendedMaskReplacers, key) => {
    const value = maskReplacers[key];

    if (value !== null && !(value instanceof RegExp)) {
      return extendedMaskReplacers;
    }

    return { ...extendedMaskReplacers, [key]: value };
  }, baseMaskReplacers);
}

/**
 * Convert a mask into a string for comparison
 * @param {String|Array.<String|RegExp>} mask
 */
function maskToString(mask) {
  const maskArray = Array.isArray(mask) ? mask : [mask];
  const filteredMaskArray = maskArray.filter((part) => typeof part === 'string' || part instanceof RegExp);
  return filteredMaskArray.toString();
}

/**
 * Create the Vue directive
 * @param {Object}                  directiveOptions
 * @param {Object.<string, RegExp>} directiveOptions.placeholders
 * @return {Object} The Vue directive
 */
export function createDirective(directiveOptions = {}) {
  const instanceMaskReplacers = extendMaskReplacers(
    directiveOptions && directiveOptions.placeholders,
  );

  /**
   * Vue directive definition
   */
  return {

    /**
     * Called only once, when the directive is first bound to the element.
     * This is where you can do one-time setup work.
     *
     * @param {(HTMLInputElement|HTMLElement)} el
     * @param {?String}                        value
     */
    bind(el, { value }) {
      el = queryInputElementInside(el);

      updateMask(el, value, instanceMaskReplacers);
      updateValue(el);
    },

    /**
     * Called after the containing component has updated,
     * but possibly before its children have updated.
     * The directive’s value may or may not have changed,
     * but you can skip unnecessary updates by comparing the
     * binding’s current and old values.
     *
     * @param {(HTMLInputElement|HTMLElement)} el
     * @param {?String}                        value
     * @param {?String}                        oldValue
     */
    componentUpdated(el, { value, oldValue }) {
      el = queryInputElementInside(el);

      const isMaskChanged = typeof value === 'function'
        || maskToString(oldValue) !== maskToString(value);

      // update mask first if changed
      if (isMaskChanged) {
        updateMask(el, value, instanceMaskReplacers);
      }

      // update value
      updateValue(el, isMaskChanged);
    },

    unbind(el) {
      el = queryInputElementInside(el);
      options.remove(el);
    },
  };
}

/**
 * Default directive definition
 */
export default createDirective();
