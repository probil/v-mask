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

      updateHandler(el, value);
    }
  });
};

var _format = require('./format.js');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handler(_ref, evt) {
  var kCode = evt.keyCode || evt.charCode;
  if (kCode === 8) return;
  var target = _ref;
  var _target$dataset = target.dataset;
  var previousValue = _target$dataset.previousValue;
  var mask = _target$dataset.mask;

  if (!mask) return;

  var tmp = target.value + String.fromCharCode(kCode);
  if (typeof previousValue === 'string' && previousValue.length < target.value.length || target.value !== undefined) {
    var tmpTarget = (0, _format2.default)(tmp, mask);
    target.value = (0, _format2.default)(target.value, mask);
    if (kCode !== 13 && tmp.length > tmpTarget.length) {
      evt.preventDefault();
    }
  }
  target.dataset.previousValue = tmpTarget;
}

function bindHandler(el, mask) {
  el.dataset.mask = mask;
  el.addEventListener('keypress', function (evt) {
    handler(el, evt);
  }, false);
}

function unbindHandler(el) {
  el.removeEventListener('keypress', handler, false);
}

function updateHandler(el, mask) {
  if (!el.value) return;
  el.dataset.mask = mask;
  el.value = (0, _format2.default)(el.value, mask);
}