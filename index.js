"use strict";

/**
 * Format function
 * @param {String} data String to mask (input value)
 * @param {String} mask Mask format, like `####-##`
 * @returns {string} Formatted text
 */
function format (data, mask){
  var text = '';
  var c, m, i, x;

  for (i = 0, x = 1; x && i < mask.length; ++i) {
    c = data.charAt(i);
    m = mask.charAt(i);

    switch (m) {
      case '#' : if (/\d/.test(c))        {text += c;} else {x = 0;} break;
      case 'A' : if (/[a-z]/i.test(c))    {text += c;} else {x = 0;} break;
      case 'N' : if (/[a-z0-9]/i.test(c)) {text += c;} else {x = 0;} break;
      case 'X' : text += c; break;
      default  : text += m; break;
    }
  }
  return text;
}

/**
 * Vue plugin definition
 * @param {Vue} Vue
 */
module.exports.install = function (Vue) {
  Vue.directive('mask', {
    params: ['format'],
    bind  : function (el, binding, vNode) {
      /**
       * Fires on input change
       */
      var handler = function () {
        var value     = el.value;
        var mask      = vNode.data.attrs.format;
        var new_value = value;

        if (el.previous.length < value.length) {
          new_value = format(value, mask);
        }

        el.value = new_value;
        el.previous = new_value;
      }

      el.previous = '';
      el.handler = handler

      el.addEventListener('input', handler, false);
      
      handler();
    },
    unbind: function (el) {
      el.removeEventListener('input', el.handler);
    }
  });
};

