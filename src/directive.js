/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';
import parseMask from './utils/parseMask';
import {
  trigger, queryInputElementInside, isFunction, isString, isRegexp,
} from './utils';
import createOptions from './createOptions';
import extendMaskReplacers from './utils/extendMaskReplacers';

const options = createOptions();

/**
 * @typedef {RegExp|NEXT_CHAR_OPTIONAL|null} MaskReplacerValue
 */

/**
 * @typedef {Object<string,MaskReplacerValue>} MaskReplaces
 */

/**
 * Convenience wrapper for `trigger(el, 'input')`, which raises
 * an event for Vue to detect a value change.
 *
 * @param {HTMLInputElement} el
 */
function triggerInputUpdate(el) {
  trigger(el, 'input');
}

function updateElementWithMaskedValue(el, maskedValue) {
  if (maskedValue === el.value) {
    return;
  }

  el.value = maskedValue;
  triggerInputUpdate(el);
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

  if ((force || isUpdateNeeded) && mask) {
    const { conformedValue } = conformToMask(value, mask, { guide: false });

    updateElementWithMaskedValue(el, conformedValue);
  }

  options.partiallyUpdate(el, { previousValue: value });
}

/**
 * Fires on handler update
 * @param {HTMLInputElement}                           el
 * @param {string|Array.<string|RegExp>|Function|null} inputMask
 * @param {MaskReplaces} maskReplacers
 */
function updateMask(el, inputMask, maskReplacers) {
  const mask = parseMask(inputMask, maskReplacers);

  options.partiallyUpdate(el, { mask });
}

/**
 * Convert a mask into a string for comparison
 * @param {string|Array.<string|RegExp>} mask
 */
function maskToString(mask) {
  const maskArray = Array.isArray(mask) ? mask : [mask];
  const filteredMaskArray = maskArray.filter((part) => isString(part) || isRegexp(part));
  return filteredMaskArray.toString();
}

/**
 * Check if previous mask has been different than current one
 * @param {String|Array.<String|RegExp>} mask
 */
function hasMaskFromBindingChanged(el, oldValue, currentValue) {
  const previousMask = isFunction(oldValue)
    ? maskToString(oldValue(options.get(el).previousValue))
    : maskToString(oldValue);

  const currentMask = isFunction(currentValue)
    ? maskToString(currentValue(el.value))
    : maskToString(currentValue);

  return previousMask !== currentMask;
}

/**
 * Create the Vue directive
 * @param {Object}       directiveOptions
 * @param {MaskReplaces} directiveOptions.placeholders
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
     * @param {?string}                        value
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
     * @param {?string}                        value
     * @param {?string}                        oldValue
     */
    componentUpdated(el, { value, oldValue }) {
      el = queryInputElementInside(el);

      const isMaskChanged = hasMaskFromBindingChanged(el, oldValue, value);

      if (isMaskChanged) {
        updateMask(el, value, instanceMaskReplacers);
      }

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
