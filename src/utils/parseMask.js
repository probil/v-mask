import { arrayMaskToRegExpMask, stringMaskToRegExpMask } from './maskToRegExpMask';
import { isFunction, isString } from './index';

/**
 * @param {(string|RegExp)[]|Function|string} inputMask
 * @param maskReplacers
 * @returns {RegExp[]|*}
 */
export default function parseMask(inputMask, maskReplacers) {
  if (Array.isArray(inputMask)) {
    return arrayMaskToRegExpMask(inputMask, maskReplacers);
  } if (isFunction(inputMask)) {
    return inputMask;
  } if (isString(inputMask) && inputMask.length > 0) {
    return stringMaskToRegExpMask(inputMask, maskReplacers);
  }
  return inputMask;
}
