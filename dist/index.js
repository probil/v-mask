'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

exports.default = function (Vue) {
  Vue.directive('mask', {
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
  });
};

var _format = require('./format.js');

var _format2 = _interopRequireDefault(_format);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function supportsDataset() {
  return !document || !document.documentElement || document.documentElement.dataset || (0, _getOwnPropertyDescriptor2.default)(Element.prototype, 'dataset') && (0, _getOwnPropertyDescriptor2.default)(Element.prototype, 'dataset').get;
}

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var value = el.value;
  var previousValue = void 0;
  var mask = void 0;

  if (supportsDataset()) {
    previousValue = el.dataset.previousValue || '';
    mask = el.dataset.mask;
  } else {
    previousValue = el.getAttribute('data-previous-value') || '';
    mask = el.getAttribute('data-mask');
  }

  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = (0, _format2.default)(value, mask);
    (0, _utils.trigger)(el, 'input');
  }

  if (supportsDataset()) {
    el.dataset.previousValue = value;
  } else {
    el.setAttribute('data-previous-value', value);
  }
}

function updateMask(el, mask) {
  if (supportsDataset()) {
    el.dataset.mask = mask;
  } else {
    el.setAttribute('data-mask', mask);
  }
}

;