var hasKey = function hasKey(obj, key) {
  return key in obj;
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var allowedMaskPlaceholders = {
  '#': /\d/,
  A: /[a-z]/i,
  N: /[a-z0-9]/i,
  X: /./,
  '?': {
    test: function test() {
      return false;
    },
    special: true
  }
};

var isPlaceholder = function isPlaceholder(char) {
  return hasKey(allowedMaskPlaceholders, char);
};

var isSpecial = function isSpecial(char) {
  return isPlaceholder(char) && allowedMaskPlaceholders[char].special;
};

var isValid = function isValid(mask, char) {
  return isString(char) && isPlaceholder(mask) && allowedMaskPlaceholders[mask].test(char);
};

function format (text, wholeMask) {
  if (!text) return '';
  text = String(text);
  if (!wholeMask || !wholeMask.length || !text.length) return text;
  var maskArray = Array.isArray(wholeMask) ? wholeMask : wholeMask.split('');

  var textIndex = 0;
  var newText = '';

  maskArray.some(function (mask, index) {
    var char = text[textIndex];
    var prevMask = maskArray[index - 1];

    if (!isPlaceholder(mask) && char === mask) {
      newText += mask;
      textIndex += 1;
      return false;
    }
    if (!isPlaceholder(mask)) {
      newText += mask;
      return false;
    }
    if (isValid(mask, char)) {
      newText += char;
      textIndex += 1;
      return false;
    }

    if (isSpecial(mask) || isSpecial(prevMask)) {
      return false;
    }
    return true;
  });

  return newText;
}

var trigger = (function (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
});

var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var value = el.value,
      _el$dataset = el.dataset,
      _el$dataset$previousV = _el$dataset.previousValue,
      previousValue = _el$dataset$previousV === undefined ? '' : _el$dataset$previousV,
      mask = _el$dataset.mask;


  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = format(value, mask);
    if (isAndroid && isChrome) {
      setTimeout(function () {
        return trigger(el, 'input');
      }, 0);
    } else {
      trigger(el, 'input');
    }
  }

  el.dataset.previousValue = value;
}

function updateMask(el, mask) {
  el.dataset.mask = mask;
}

var directive = {
  bind: function bind(el, _ref) {
    var value = _ref.value;

    updateMask(el, value);
    updateValue(el);
  },
  componentUpdated: function componentUpdated(el, _ref2) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue;

    var isMaskChanged = value !== oldValue;

    if (isMaskChanged) {
      updateMask(el, value);
    }

    updateValue(el, isMaskChanged);
  }
};

var plugin = (function (Vue) {
  Vue.directive('mask', directive);
});

export default plugin;
export { plugin as VueMaskPlugin, directive as VueMaskDirective };
