'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var trigger = exports.trigger = function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};