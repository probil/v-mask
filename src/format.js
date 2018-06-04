/* eslint-disable no-param-reassign, no-unused-expressions */

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

  const maskStartRegExp = /^([^#ANX]+)/;

  if (+text.length === 1 && maskStartRegExp.test(wholeMask)) {
    text = maskStartRegExp.exec(wholeMask)[0] + text;
  }

  let newText = '';
  let charOffset = 0;

  // Cleans data to  avoid value loss on dynamic mask changing
  for (let maskIndex = 0; maskIndex < wholeMask.length; maskIndex += 1) {
    const mask = wholeMask.charAt(maskIndex);
    switch (mask) {
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
        text = text.replace(mask, '');
    }
  }
  for (let maskIndex = 0, x = 1; x && maskIndex < wholeMask.length; maskIndex += 1) {
    const char = text.charAt(maskIndex - charOffset);
    const mask = wholeMask.charAt(maskIndex);

    switch (mask) {
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
        newText += mask;

        // preserve characters that are in the same spot we need to insert a mask
        // character by shifting the data over to the right (issue #5, & #7)
        if (char && char !== mask) {
          text = ` ${text}`;
        }

        break;
    }
  }
  return newText;
}
