'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data, mask) {
  if (!mask) return data;

  var text = '';
  for (var i = 0, x = 1; x && i < mask.length; ++i) {
    var c = data.charAt(i);
    var m = mask.charAt(i);

    switch (m) {
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
      case 'X':
        text += c;break;
      default:
        text += m;break;
    }
  }
  return text;
};