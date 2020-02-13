/**
 * Generate a time mask based on input value (23:59)
 * @param {string} value
 */
export function timeMask(value) {
  const hours = [
    /[0-2]/,
    value.charAt(0) === '2' ? /[0-3]/ : /[0-9]/,
  ];
  const minutes = [/[0-5]/, /[0-9]/];
  return value.length > 2
    ? [...hours, ':', ...minutes]
    : hours;
}

/**
 * Generate a time range mask based on input value (00:00-23:59)
 * @param {string} value
 */
export function timeRangeMask(value) {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length > 4) {
    return [...timeMask(numbers.substring(0, 4)), '-', ...timeMask(numbers.substring(4))];
  }
  return [...timeMask(numbers)];
}
