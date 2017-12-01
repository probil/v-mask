var format = function (data, mask) {
  if (!mask) return data;

  var maskStartRegExp = /^([^#ANX]+)/;

  if (data.length == 1 && maskStartRegExp.test(mask)) {
    data = maskStartRegExp.exec(mask)[0] + data;
  }

  var text = '';

  var cOffset = 0;

  for (var i = 0; i < mask.length; i++) {
    var m = mask.charAt(i);
    switch (m) {
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
        data = data.replace(m, '');
    }
  }
  for (var _i = 0, x = 1; x && _i < mask.length; ++_i) {
    var c = data.charAt(_i - cOffset);
    var _m = mask.charAt(_i);

    switch (_m) {
      case '#':
        if (/\d/.test(c)) {
          text += c;
        } else {
          x = 0;
        }break;
      case 'A':
        if (/[a-z]/i.test(c)) {
          text += c;
        } else {
          x = 0;
        }break;
      case 'N':
        if (/[a-z0-9]/i.test(c)) {
          text += c;
        } else {
          x = 0;
        }break;

      case '?':
        cOffset++;break;
      case 'X':
        text += c;break;
      default:
        text += _m;

        if (c && c !== _m) {
          data = ' ' + data;
        }

        break;
    }
  }
  return text;
};

var trigger = function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var value = el.value,
      _el$dataset = el.dataset,
      _el$dataset$previousV = _el$dataset.previousValue,
      previousValue = _el$dataset$previousV === undefined ? "" : _el$dataset$previousV,
      mask = _el$dataset.mask;


  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = format(value, mask);
    trigger(el, "input");
  }

  el.dataset.previousValue = value;
}

function updateMask(el, mask) {
  el.dataset.mask = mask;
}

function getSelector(ele) {
  var result = void 0;
  if (!ele) {
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

function getInput(ele) {
  var input = ele;
  if (ele.tagName && ele.tagName.toLowerCase() !== "input") {
    var result = ele.getElementsByTagName("input");
    if (!result || !result.length) {
      throw new Error("Can't find an input element on " + getSelector(ele));
    }
    input = result[0];
  }

  return input;
}

var VueMaskDirective = {
  bind: function bind(el, _ref) {
    var value = _ref.value;

    var input = getInput(el);
    updateMask(input, value);
    updateValue(input);
  },
  componentUpdated: function componentUpdated(el, _ref2) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue;

    var input = getInput(el);
    var isMaskChanged = value !== oldValue;

    if (isMaskChanged) {
      updateMask(input, value);
    }

    updateValue(input, isMaskChanged);
  }
};

var VueMaskPlugin = function VueMaskPlugin(Vue) {
  Vue.directive("mask", VueMaskDirective);
};

export { VueMaskPlugin, VueMaskDirective };export default VueMaskPlugin;
