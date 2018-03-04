/* eslint-disable no-param-reassign, no-unused-expressions */

/**
 * Mask keys
 *
 * @type {Object}
 */
const allowedMaskPlaceholders = {
  '#': {
    test: char => /\d/.test(char)
  },
  'A': {
    test: char => /[a-z]/i.test(char)
  },
  'N': {
    test: char => /[a-z0-9]/i.test(char)
  },
  'X': {
    test: () => true
  },
  '?': {
    special: true
  }
}

/**
 * Indicates is given char a mask placeholder
 *
 * @param {String} char
 * @return {Boolean}
 */
const isPlaceholder = char => allowedMaskPlaceholders.hasOwnProperty(char);

/**
 * Indicates is given value is a string
 * @param {*|String} val
 * @returns {boolean}
 */
const isString = val => typeof val === 'string';

/**
 * Indicates is given mask char validates by given text char
 * @param {String} mask
 * @param {String} char
 * @returns {boolean}
 */
const isValid = (mask, char) => (true
  && isString(char)
  && isPlaceholder(mask)
  && allowedMaskPlaceholders[mask].test(char)
)

/**
 * Format given input based on mask and options
 *
 * @param {String} text String to mask (input value)
 * @param {String} [mask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
export default function (text, wholeMask) {
  if (!text) return '';
  text = String(text);
  if (!wholeMask || !wholeMask.length|| !text.length) return text;
  const maskArray = Array.isArray(wholeMask) ? wholeMask : wholeMask.split('');

  let textIndex = 0;
  let maskIndex = 0;
  let newText = '';

  while (maskIndex < maskArray.length) {
    const mask = maskArray[maskIndex];
    const char = text[textIndex];

    if (!isPlaceholder(mask) && char === mask) {
      newText += mask;
      textIndex++;
    } else if (!isPlaceholder(mask)) {
      newText += mask;
    } else if (isValid(mask, char)) {
      newText += char;
      textIndex++;
    } else {
      return newText;
    }
    maskIndex++;
  }
  return newText;
}
