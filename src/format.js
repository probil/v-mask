/**
 * Simple format function borrowed from PureMask.js
 * {@link https://github.com/romulobrasil/PureMask.js}
 *
 * @param {String} data String to mask (input value)
 * @param {String} [mask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
export default function (data, mask){
  // don't do anything if mask is undefined/null/etc
  if(!mask) return data;

  const maskStartRegExp = /^([^#ANX]+)/;

  if (data.length == 1 && maskStartRegExp.test(mask)) {
    data = maskStartRegExp.exec(mask)[0] + data;
  }

  let text = '';

  // Adds a char offset to allow testing on optional values
  var cOffset = 0;

  // Cleans data to  avoid value loss on dynamic mask changing
  for (var i = 0; i < mask.length; i++) {
    var m = mask.charAt(i)
    switch(m) {
      case '#' : break;
      case 'A' : break;
      case '?' : break;
      case 'N' : break;
      case 'X' : break;
      default : data = data.replace(m, '')
    }
  }
  for (let i = 0, x = 1; x && i < mask.length; ++i) {
    // Uses the optional mask character offset
    let c = data.charAt(i - cOffset);
    let m = mask.charAt(i);

    switch (m) {
      case '#' : if (/\d/.test(c))        {text += c;} else {x = 0;} break;
      case 'A' : if (/[a-z]/i.test(c))    {text += c;} else {x = 0;} break;
      case 'N' : if (/[a-z0-9]/i.test(c)) {text += c;} else {x = 0;} break;
      // Skips testing if optional field is specified
      case '?' : cOffset++; break;
      case 'X' : text += c; break;
      default  :
        text += m;

        // preserve characters that are in the same spot we need to insert a mask
        // character by shifting the data over to the right (issue #5, & #7)
        if (c && c !== m) {
          data = ' ' + data;
        }

        break;
    }
  }
  return text;
}
