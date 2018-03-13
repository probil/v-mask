/* eslint-disable no-param-reassign, no-unused-expressions */
import { isString, hasKey } from './utils/common';

/**
 * Mask keys
 *
 * @type {Object}
 */
const allowedMaskPlaceholders = {
  '#': {
    test: char => /\d/.test(char),
  },
  A: {
    test: char => /[a-z]/i.test(char),
  },
  N: {
    test: char => /[a-z0-9]/i.test(char),
  },
  X: {
    test: () => true,
  },
  '?': {
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
 * @param {String} text String to mask (input value)
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

  maskArray.some((mask) => {
    const char = text[textIndex];

    if (!isPlaceholder(mask) && char === mask) {
      newText += mask;
      textIndex += 1;
    } else if (!isPlaceholder(mask)) {
      newText += mask;
    } else if (isValid(mask, char)) {
      newText += char;
      textIndex += 1;
    } else {
      return true;
    }
    return false;
  });
  return newText;
}
