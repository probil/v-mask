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
  let mountWithMask;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueMask);
    mountWithMask = (arg, options) => mount(arg, { ...options, localVue });
  });

  it('should run this canary test', () => {
    const wrapper = mountWithMask({
      template: '<input />',
    });
    expect(wrapper.is('input')).toBe(true);
  });

  it('should update model value after directive bind', () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: '##.##.####', value: '11112011' }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    expect(wrapper.vm.$el.value).toBe('11.11.2011');
  });

  it('should update model value when input value changes', async () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: '##.##.####', value: undefined }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    wrapper.vm.$el.value = '11112011';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('11.11.2011');
  });
});
