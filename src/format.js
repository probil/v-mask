/* eslint-disable no-param-reassign, no-unused-expressions */

/**
 * Applies mask to data.
 *
 * @param {String} text String to mask (input value)
 * @param {String} [wholeMask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
export const mask = (text, wholeMask) => {
  let newText = '';
  let charOffset = 0;

  for (let maskIndex = 0, x = 1; x && maskIndex < wholeMask.length; maskIndex += 1) {
    const char = text.charAt(maskIndex - charOffset);
    const maskChar = wholeMask.charAt(maskIndex);

    switch (maskChar) {
      case '#':
        /\d/.test(char) ? newText += char : x = 0;
        break;
      case 'A':
        /[a-z]/i.test(char) ? newText += char : x = 0;
        break;
      case 'N':
        /[a-z0-9]/i.test(char) ? newText += char : x = 0;
        break;
      // Skips testing if optional field is specified
      case '?':
        charOffset += 1;
        break;
      case 'X':
        newText += char;
        break;
      default:
        newText += maskChar;

        // preserve characters that are in the same spot we need to insert a mask
        // character by shifting the data over to the right (issue #5, & #7)
        if (char && char !== maskChar) {
          text = ` ${text}`;
        }

        break;
    }
  }
  return newText;
};

/**
 * Cleans data.
 *
 * @param {String} text String to clean (input value)
 * @param {String} [wholeMask] Mask format, like `####-##`
 * @returns {string} Cleaned text
 */
export const clean = (text, wholeMask) => {
  for (let maskIndex = 0; maskIndex < wholeMask.length; maskIndex += 1) {
    const maskChar = wholeMask.charAt(maskIndex);
    switch (maskChar) {
      case '#':
        break;
      case 'A':
        break;
      case '?':
        break;
      case 'N':
        break;
      case 'X':
        break;
      default:
        text = text.replace(maskChar, '');
    }
  }

  return text;
};

/**
 * Prepares data.
 *
 * @param {String} text String to prepare (input value)
 * @param {String} [wholeMask] Mask format, like `####-##`
 * @returns {string} Prepared text
 */
export const prepare = (text, wholeMask) => {
  const maskStartRegExp = /^([^#ANX]+)/;

  if (+text.length === 1 && maskStartRegExp.test(wholeMask)) {
    text = maskStartRegExp.exec(wholeMask)[0] + text;
  }

  return text;
};

/**
 * Simple format function borrowed from PureMask.js
 * {@link https://github.com/romulobrasil/PureMask.js}
 *
 * @param {String} text String to mask (input value)
 * @param {String} [wholeMask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
export default function (text, wholeMask) {
  if (!wholeMask) return text;

  return mask(clean(prepare(text, wholeMask), wholeMask), wholeMask);
}
