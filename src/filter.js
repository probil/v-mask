// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';
import { formatMask } from './maskToRegExpMask';

/**
 * Vue filter definition
 * @param {String} value
 * @param {String} inputMask
 */
export default (value, inputMask) => {
  const mask = formatMask(inputMask);
  const { conformedValue } = conformToMask(value, mask, { guide: false });
  return conformedValue;
};
