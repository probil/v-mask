// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';

const NEXT_CHAR_OPTIONAL = {
  __nextCharOptional__: true,
};

/**
 * @param {String} text String to mask (input value)
 * @param {String} [wholeMask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
export default function (text, wholeMask) {
  if (!wholeMask) return text;
  const replacementMap = {
    '#': /\d/,
    A: /[a-z]/i,
    N: /[a-z0-9]/i,
    '?': NEXT_CHAR_OPTIONAL,
    X: /./,
  };

  const stringToRegexp = (str) => {
    const lastSlash = str.lastIndexOf('/');
    return new RegExp(
      str.slice(1, lastSlash),
      str.slice(lastSlash + 1),
    );
  };
  const makeRegexpOptional = charRegexp => (
    stringToRegexp(
      charRegexp.toString()
        .replace(
          /.(\/)[gmiyus]{0,6}$/,
          match => match.replace('/', '?/'),
        ),
    )
  )

  const escapeIfNeeded = char => ('[\\^$.|?*+()'.split('').includes(char) ? `\\${char}` : char);
  const charRegexp = char => new RegExp(`/[${escapeIfNeeded(char)}]/`);
  const isRegexp = entity => entity instanceof RegExp;
  const castToRegexp = char => (isRegexp(char) ? char : charRegexp(char));

  const generatedMask = wholeMask
    .split('')
    .map((char, index, array) => {
      const maskChar = replacementMap[char] || char;
      const previousChar = array[index - 1];
      const previousMaskChar = replacementMap[previousChar] || previousChar;
      if (maskChar === NEXT_CHAR_OPTIONAL) {
        return null;
      }
      if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
        const casted = castToRegexp(maskChar);
        const optionalRegexp = makeRegexpOptional(casted);
        return optionalRegexp;
      }
      return maskChar;
    })
    .filter(Boolean);

  const { conformedValue } = conformToMask(text, generatedMask, { guide: false });
  return conformedValue;
}
