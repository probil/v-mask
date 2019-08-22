/**
 * Notifies Vue about internal value change
 * @see https://github.com/vuejs/Discussion/issues/157#issuecomment-273301588
 *
 * @param {HTMLInputElement} el
 * @param {String}           type
 */
export const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

/**
 * Extracts first input element inside given html element (if any)
 * @param {HTMLElement} el
 * @returns {HTMLElement|HTMLInputElement}
 */
export const queryInputElementInside = (el) => (
  el instanceof HTMLInputElement
    ? el
    : el.querySelector('input') || el
);
