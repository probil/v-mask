import { defaultMaskReplacers, NEXT_CHAR_OPTIONAL } from '../constants';
import { castToRegexp, makeRegexpOptional } from './regexp';

/**
 * @param {string[]} mask
 * @param {MaskReplaces} maskReplacers
 * @returns {RegExp[]}
 */
function maskToRegExpMask(mask, maskReplacers = defaultMaskReplacers) {
  return mask
    .map((char, index, array) => {
      const maskChar = maskReplacers[char] || char;
      const previousChar = array[index - 1];
      const previousMaskChar = maskReplacers[previousChar] || previousChar;
      if (maskChar === NEXT_CHAR_OPTIONAL) {
        return null;
      }
      if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
        return makeRegexpOptional(castToRegexp(maskChar));
      }
      return maskChar;
    })
    .filter(Boolean);
}

/**
 * Converts mask from `v-mask` string format to `text-mask-core` format
 * @param {string} stringMask
 * @param {MaskReplaces} maskReplacers
 * @return {RegExp[]}
 */
export function stringMaskToRegExpMask(stringMask, maskReplacers = defaultMaskReplacers) {
  return maskToRegExpMask(stringMask.split(''), maskReplacers);
}

/**
 * Converts mask from `v-mask` array format to `text-mask-core` format
 * @param {Array.<string|RegExp>} arrayMask
 * @param {MaskReplaces} maskReplacers
 * @return {RegExp[]}
 */
export function arrayMaskToRegExpMask(arrayMask, maskReplacers = defaultMaskReplacers) {
  const flattenedMask = arrayMask
    .map((part) => {
      if (part instanceof RegExp) {
        return part;
      }
      if (typeof part === 'string') {
        return part.split('');
      }
      return null;
    })
    .filter(Boolean)
    .reduce((mask, part) => mask.concat(part), []);

  return maskToRegExpMask(flattenedMask, maskReplacers);
}
