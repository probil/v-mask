export default function createOptions() {
  const elementOptions = new Map();
  const defaultOptions = { previousValue: '', mask: [] };

  function get(el) {
    return elementOptions.get(el) || { ...defaultOptions };
  }

  function partiallyUpdate(el, newOptions) {
    elementOptions.set(el, { ...get(el), ...newOptions });
  }

  function remove(el) {
    elementOptions.delete(el);
  }

  return {
    partiallyUpdate,
    remove,
    get,
  };
}
