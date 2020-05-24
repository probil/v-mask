// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';
import { stringMaskToRegExpMask } from './maskToRegExpMask';

/**
 * Vue filter definition
 * @param {String} value
 * @param {String} stringMask
 */
export default (value, stringMask) => {
  const mask = stringMaskToRegExpMask(stringMask);
  const { conformedValue } = conformToMask(value, mask, { guide: false });
  return conformedValue;
};
