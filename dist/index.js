'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  Vue.directive('mask', {
    bind: function bind(el, _ref) {
      var value = _ref.value;

      el = getInputElement(el);
      updateMask(el, value);
      updateValue(el);
    },
    componentUpdated: function componentUpdated(el, _ref2) {
      var value = _ref2.value,
          oldValue = _ref2.oldValue;

      var isMaskChanged = value !== oldValue;

      el = getInputElement(el);

      if (isMaskChanged) {
        updateMask(el, value);
      }

      updateValue(el, isMaskChanged);
    }
  });
};

var _format = require('./format.js');

var _format2 = _interopRequireDefault(_format);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var value = el.value,
      _el$dataset = el.dataset,
      _el$dataset$previousV = _el$dataset.previousValue,
      previousValue = _el$dataset$previousV === undefined ? "" : _el$dataset$previousV,
      mask = _el$dataset.mask;

  var position = getCursorPosition(el);

  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = (0, _format2.default)(value, mask);
    (0, _utils.trigger)(el, 'input');
    position++;
  }

  setCursorPosition(el, position);
  el.dataset.previousValue = value;
}

function updateMask(el, mask) {
  el.dataset.mask = mask;
}

function getInputElement(el) {
  if (el.tagName !== 'INPUT') {
    el = el.getElementsByTagName('input')[0];
  }
  return el;
}

function getCursorPosition(el) {
  return el.selectionEnd || 0;
}

function setCursorPosition(el, p) {
  if (el === document.activeElement) {
    el.setSelectionRange(p, p);
  }
}

;