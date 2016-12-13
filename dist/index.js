'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  Vue.directive('mask', {
    bind: function bind(el, _ref2) {
      var value = _ref2.value;

      var handlerFunc = handler.bind({ format: value });
      el.addEventListener('input', handlerFunc, false);

      return handlerFunc({ target: el });
    },
    unbind: function unbind(el) {
      el.removeEventListener('input', handler, false);
    }
  });
};

var _format = require('./format.js');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handler(_ref) {
  var target = _ref.target;
  var previousValue = target.dataset.previousValue;


  if (typeof previousValue === 'string' && previousValue.length < target.value.length) {
    target.value = (0, _format2.default)(target.value, this.format);
  }

  target.dataset.previousValue = target.value;
}

;