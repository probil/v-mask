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
  // don't do anything if mask is undefined/null/etc
  if (!wholeMask) return text;

  const maskStartRegExp = /^([^#ANX]+)/;

  if (+text.length === 1 && maskStartRegExp.test(wholeMask)) {
    text = maskStartRegExp.exec(wholeMask)[0] + text;
  }

  let newText = '';

  // Adds a char offset to allow testing on optional values
  let cOffset = 0;

  // Cleans data to  avoid value loss on dynamic mask changing
  for (let i = 0; i < wholeMask.length; i += 1) {
    const mask = wholeMask.charAt(i);
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
  for (let i = 0, x = 1; x && i < wholeMask.length; i += 1) {
    // Uses the optional mask character offset
    const char = text.charAt(i - cOffset);
    const mask = wholeMask.charAt(i);

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
        cOffset += 1;
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
