'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  Vue.directive('mask', {
    bind: function bind(el, _ref2) {
      var value = _ref2.value;

      bindHandler(el, value);
    },

    unbind: unbindHandler,
    update: function update(el, _ref3) {
      var value = _ref3.value;
      var oldValue = _ref3.oldValue;

      if (value === oldValue) return;

      updateHandler(el, value);
    }
  });
};

var _format = require('./format.js');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handler(_ref) {
  var target = _ref.target;
  var _target$dataset = target.dataset;
  var previousValue = _target$dataset.previousValue;
  var mask = _target$dataset.mask;

  if (!mask) return;

  if (typeof previousValue === 'string' && previousValue.length < target.value.length) {
    target.value = (0, _format2.default)(target.value, mask);
  }

  target.dataset.previousValue = target.value;
}

function bindHandler(el, mask) {
  el.dataset.mask = mask;

  el.addEventListener('input', handler, false);

  handler({ target: el });
}

function unbindHandler(el) {
  el.removeEventListener('input', handler, false);
}

function updateHandler(el, mask) {
  el.dataset.mask = mask;

  el.value = (0, _format2.default)(el.value, mask);
}

;