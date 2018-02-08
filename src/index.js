import format from "./format.js";
import { trigger } from "./utils";

/**
 * Event handler
 * @param {HTMLInputElement} el
 * @param {Boolean}          force
 */
function updateValue (el, force = false) {
  let {value, dataset: {previousValue = "", mask } } = el;

  if(force || (value && value !== previousValue && value.length > previousValue.length)) {
    el.value = format(value, mask);
    trigger(el, "input")
  }

  el.dataset.previousValue = value;
}

/**
 * Fires on handler update
 * @param {HTMLInputElement} el
 * @param {String}           mask
 */
function updateMask(el, mask) {
  // change format
  el.dataset.mask = mask;
}

/**
 * Create an cssSelector for an element. This should be used to help
 * the programmer to find errors when creating masks.
 * @param {HTMLInputElement} ele
 */
function getSelector(ele) {
  let result;
  if (!ele ) {
    result = "";
  } else if (ele.getAttribute("id")) {
    result = "#" + ele.getAttribute("id");
  } else if (ele.getAttribute("class")) {
    result = "." + ele.getAttribute("class").split(" ").join(".");
  } else {
    result = ele.tagName;
  }

  return result;
}

/**
 * If not bound to an input element at the root level, that function will resolve 
 * first child input as the masking target.
 * @param {HTMLInputElement} ele
 */
function getInput(ele) {
  let input = ele;
  if (ele.tagName && ele.tagName.toLowerCase() !== "input") {
    let result = ele.getElementsByTagName("input");
    if (!result || !result.length) {
      throw new Error("Can't find an input element on " + getSelector(ele));
    }
    input = result[0];
  }

  return input;
}


 /**
 * Vue directive definition
 */
const VueMaskDirective = {

  /**
   * Called only once, when the directive is first bound to the element.
   * This is where you can do one-time setup work.
   *
   * @param {HTMLInputElement} el
   * @param {?String}          value
   */
  bind (el, {value}) {
    const input = getInput(el);
    updateMask(input, value);
    updateValue(input);
  },

  /**
   * Called after the containing component has updated,
   * but possibly before its children have updated.
   * The directive’s value may or may not have changed,
   * but you can skip unnecessary updates by comparing the
   * binding’s current and old values.
   *
   * @param {HTMLInputElement} el
   * @param {?String}          value
   * @param {?String}          oldValue
   */
  componentUpdated(el, {value, oldValue}){
    const input = getInput(el);
    let isMaskChanged = value !== oldValue;

    // update mask first if changed
    if(isMaskChanged){
      updateMask(input, value);
    }

    // update value
    updateValue(input, isMaskChanged);
  }
};


/**
 * Vue plugin definition
 * @param {Vue} Vue
 */
const VueMaskPlugin = function (Vue) {
  Vue.directive("mask", VueMaskDirective);
};

export { VueMaskPlugin as default, VueMaskPlugin, VueMaskDirective };

