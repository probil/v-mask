import format from './format.js'

export default function (Vue) {
  Vue.directive('mask', {
    bind: function bind(el, _ref2) {
      var value = _ref2.value

      bindHandler(el, value)
      updateHandler(el, value, true)
    },

    unbind: unbindHandler,
    update: function update(el, _ref3) {
      var value = _ref3.value
      var oldValue = _ref3.oldValue

      updateHandler(el, value)
    }
  })
}

function handler(_ref, evt) {
  var kCode = evt.keyCode || evt.charCode
  if (kCode === 8 || kCode === 13) return
  var target = _ref
  var _target$dataset = target.dataset
  var previousValue = _target$dataset.previousValue
  var mask = _target$dataset.mask

  if (!mask) return

  var tmp = target.value + String.fromCharCode(kCode)
  if ((typeof previousValue === 'string' && previousValue.length < target.value.length) || target.value !== undefined) {
    var tmpTarget = format(tmp, mask);
    target.value = format(target.value, mask);
    if (tmp.length > tmpTarget.length) {
      evt.preventDefault()
    }
  }
  target.dataset.previousValue = tmpTarget
}

function bindHandler(el, mask) {
  el.dataset.mask = mask
  el.addEventListener('keypress', function (evt) { handler(el, evt) }, false)
}

function unbindHandler(el) {
  el.removeEventListener('keypress', handler, false)
}

function updateHandler(el, mask, pInitial) {
  if (!el.value) return
  el.dataset.mask = mask
  let formated = format(el.value, mask)
  if (el.value.length >= formated || pInitial === true) el.value = formated;
}
