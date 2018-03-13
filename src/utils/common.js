/**
 * Indicates is given object has key
 * @param {Object} obj
 * @param {String} key
 * @returns {boolean}
 */
export const hasKey = (obj, key) => key in obj;

/**
 * Indicates is given value is a string
 * @param {*|String} val
 * @returns {boolean}
 */
export const isString = val => typeof val === 'string';
