// eslint-disable-next-line import/no-extraneous-dependencies
import conformToMask from 'text-mask-core/src/conformToMask';
import { stringMaskToRegExpMask } from './maskToRegExpMask';
import { isString } from './utils';

/**
 * Vue filter definition
 * @param {String} value
 * @param {String} stringMask
 */
export default (value, stringMask) => {
  const mask = stringMaskToRegExpMask(stringMask);
  if (!isString(value) && !Number.isFinite(value)) return value;
  const { conformedValue } = conformToMask(`${value}`, mask, { guide: false });
  return conformedValue;
};
