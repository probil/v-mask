import { createLocalVue, mount } from '@vue/test-utils';
import VueMask, { VueMaskDirective, VueMaskPlugin } from '../index';

describe('plugin/directive registration', () => {
  let Vue;

  beforeEach(() => {
    Vue = createLocalVue();
  });

  it('default export should be a function', () => {
    expect(VueMask).toEqual(expect.any(Function));
  });

  it('named export `VueMaskPlugin` should be a function', () => {
    expect(VueMaskPlugin).toEqual(expect.any(Function));
  });

  it('named export `VueMaskDirective` should be an object', () => {
    expect(VueMaskDirective).toEqual(expect.any(Object));
  });

  it('should register `v-mask` directive', () => {
    expect(Vue.options.directives.mask).toBeUndefined();
    Vue.use(VueMask);
    expect(Vue.options.directives.mask).toEqual(expect.any(Object));
  });

  it('should allow to use exposed directive with custom name', () => {
    expect(Vue.options.directives.fakeMask).toBeUndefined();
    Vue.directive('fakeMask', VueMaskDirective);
    expect(Vue.options.directives.fakeMask).toEqual(expect.any(Object));
  });
});

describe('directive usage', () => {
  let Vue;
  beforeAll(() => {
    Vue = createLocalVue();
    Vue.use(VueMask);
  });

  it('should run this canary test', () => {
    const wrapper = mount({
      template: '<input />',
    });
    expect(wrapper.is('input')).toBe(true);
  });

  test('Should set value when bound and previous value is `undefined`', () => {
    let bindFunc = function bindFunc() {};
    const mockVue = {};
    mockVue.directive = function directive(name, funcObject) {
      bindFunc = funcObject.bind;
    };
    VueMask(mockVue);
    const mask = { value: '##.##.####' };
    const element = {
      value: '11112011',
      dataset: {
        previousValue: undefined,
        mask: mask.value,
      },
      dispatchEvent: () => {},
    };
    bindFunc(element, mask);

    expect(element.value).toBe('11.11.2011');
  });
});
