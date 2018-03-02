import { createLocalVue } from '@vue/test-utils';
// TODO: rewrite using '@vue/test-utils' when it will support directives
import { mount, trigger } from 'vuenit';
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
  it('should run this canary test', () => {
    const wrapper = mount({
      template: '<input />',
    });
    expect(wrapper.$contains('input')).toBe(true);
  });

  it('should update model value after directive bind', () => {
    const wrapper = mount({
      data: () => ({
        mask: '##.##.####',
        value: '11112011',
      }),
      directives: {
        mask: VueMaskDirective,
      },
      template: '<input v-mask="mask" v-model="value"/>',
    });
    expect(wrapper.$el.value).toBe('11.11.2011');
  });

  it('should update model value when input value changes', async () => {
    const wrapper = mount({
      data: () => ({ mask: '##.##.####', value: undefined }),
      directives: { mask: VueMaskDirective },
      template: '<input v-mask="mask" v-model="value"/>',
    });
    wrapper.$el.value = '11112011';
    trigger(wrapper.$el, 'input');
    await wrapper.$nextTick();
    expect(wrapper.$el.value).toBe('11.11.2011');
  });
});
