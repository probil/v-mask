import { defaultMaskReplacers, NEXT_CHAR_OPTIONAL } from './constants';
import { castToRegexp, makeRegexpOptional } from './utils/regexp';

/**
 * Converts mask from `v-mask` format to `text-mask-core` format
 * @param {String} stringMask
 * @return {RegExp[]}
 */
export default function stringMaskToRegExpMask(stringMask) {
  return stringMask
    .split('')
    .map((char, index, array) => {
      const maskChar = defaultMaskReplacers[char] || char;
      const previousChar = array[index - 1];
      const previousMaskChar = defaultMaskReplacers[previousChar] || previousChar;
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
