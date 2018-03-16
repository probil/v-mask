/* eslint-disable no-param-reassign, no-unused-expressions */
import { isString, hasKey } from './utils/common';

/**
 * Mask keys
 *
 * @type {Object}
 */
const allowedMaskPlaceholders = {
  '#': /\d/,
  A: /[a-z]/i,
  N: /[a-z0-9]/i,
  X: /./,
  '?': {
    test: () => false,
    special: true,
  },
};

/**
 * Indicates is given char a mask placeholder
 *
 * @param {String} char
 * @return {Boolean}
 */
const isPlaceholder = char => hasKey(allowedMaskPlaceholders, char);

const isSpecial = char => isPlaceholder(char) && allowedMaskPlaceholders[char].special;
/**
 * Indicates is given mask char validates by given text char
 * @param {String} mask
 * @param {String} char
 * @returns {boolean}
 */
const isValid = (mask, char) => (
  isString(char)
  && isPlaceholder(mask)
  && allowedMaskPlaceholders[mask].test(char)
);

/**
 * Format given input based on mask and options
 *
 * @param {String|Number} text String to mask (input value)
 * @param {String|String[]} [wholeMask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
export default function (text, wholeMask) {
  if (!text) return '';
  text = String(text);
  if (!wholeMask || !wholeMask.length || !text.length) return text;
  const maskArray = Array.isArray(wholeMask) ? wholeMask : wholeMask.split('');

  let textIndex = 0;
  let newText = '';

  maskArray.some((mask, index) => {
    const char = text[textIndex];
    const prevMask = maskArray[index - 1];

    if (!isPlaceholder(mask) && char === mask) {
      newText += mask;
      textIndex += 1;
      return false;
    }
    if (!isPlaceholder(mask)) {
      newText += mask;
      return false;
    }
    if (isValid(mask, char)) {
      newText += char;
      textIndex += 1;
      return false;
    }
    // TODO: apply better solution here
    if (isSpecial(mask) || isSpecial(prevMask)) {
      return false;
    }
    return true;
  });

  return newText;
}
