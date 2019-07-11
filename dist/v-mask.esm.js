function format (text, wholeMask) {
  if (!wholeMask) return text;

  return mask(clean(prepare(text, wholeMask), wholeMask), wholeMask);
}

var mask = function mask(text, wholeMask) {
  if (!wholeMask) return text;

  var newText = '';
  var charOffset = 0;

  for (var maskIndex = 0, x = 1; x && maskIndex < wholeMask.length; maskIndex += 1) {
    var char = text.charAt(maskIndex - charOffset);
    var _mask = wholeMask.charAt(maskIndex);

    switch (_mask) {
      case '#':
        /\d/.test(char) ? newText += char : x = 0;
        break;
      case 'A':
        /[a-z]/i.test(char) ? newText += char : x = 0;
        break;
      case 'N':
        /[a-z0-9]/i.test(char) ? newText += char : x = 0;
        break;

      case '?':
        charOffset += 1;
        break;
      case 'X':
        newText += char;
        break;
      default:
        newText += _mask;

        if (char && char !== _mask) {
          text = ' ' + text;
        }

        break;
    }
  }
  return newText;
};

var clean = function clean(text, wholeMask) {
  if (!wholeMask) return text;

  for (var maskIndex = 0; maskIndex < wholeMask.length; maskIndex += 1) {
    var _mask2 = wholeMask.charAt(maskIndex);
    switch (_mask2) {
      case '#':
        break;
      case 'A':
        break;
      case '?':
        break;
      case 'N':
        break;
      case 'X':
        break;
      default:
        text = text.replace(_mask2, '');
    }
  }

  return text;
};

var prepare = function prepare(text, wholeMask) {
  if (!wholeMask) return text;

  var maskStartRegExp = /^([^#ANX]+)/;

  if (+text.length === 1 && maskStartRegExp.test(wholeMask)) {
    text = maskStartRegExp.exec(wholeMask)[0] + text;
  }

  return text;
};

var trigger = function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

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
      mask$$1 = _el$dataset.mask;


  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = format(value, mask$$1);
    if (isAndroid && isChrome) {
      setTimeout(function () {
        return trigger(el, 'input');
      }, 0);
    } else {
      trigger(el, 'input');
    }
  }

  el.dataset.previousValue = value;
  el.dataset.rawValue = clean(value, mask$$1);
}

function updateMask(el, mask$$1) {
  el.dataset.mask = mask$$1;
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
