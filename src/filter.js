// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';
import { isString } from './utils';
import parseMask from './utils/parseMask';
import extendMaskReplacers from './utils/extendMaskReplacers';

/**
 * Create the Vue filter
 * @param {Object}       filterOptions
 * @param {MaskReplaces} filterOptions.placeholders
 */
export function createFilter(filterOptions = {}) {
  const instanceMaskReplacers = extendMaskReplacers(
    filterOptions && filterOptions.placeholders,
  );

  /**
   * Vue filter definition
   * @param {string|number} value
   * @param {string|Array.<string|RegExp>|Function|null} inputMask
   */
  return (value, inputMask) => {
    if (!isString(value) && !Number.isFinite(value)) return value;
    const mask = parseMask(inputMask, instanceMaskReplacers);
    const { conformedValue } = conformToMask(`${value}`, mask, { guide: false });
    return conformedValue;
  };
}

export default createFilter();
