import { createLocalVue, mount } from '@vue/test-utils';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import VueMask, { VueMaskDirective, VueMaskPlugin, VueMaskFilter } from '../index';
import { timeRangeMask } from '../utils/timeRangeMask';

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

  it('named export `VueMaskFilter` should be a function', () => {
    expect(VueMaskFilter).toEqual(expect.any(Function));
  });

  it('named export `VueMaskDirective` should be an object', () => {
    expect(VueMaskDirective).toEqual(expect.any(Object));
  });

  it('should register `VMask` filter', () => {
    expect(Vue.options.filters.VMask).toBeUndefined();
    Vue.use(VueMask);
    expect(Vue.options.filters.VMask).toEqual(expect.any(Function));
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
    expect(wrapper.element.tagName).toBe('INPUT');
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

  it('should accept an array of regular expressions directly', async () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: ['(', /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], value: '5555551234' }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    expect(wrapper.vm.$el.value).toBe('(555) 555-1234');
  });

  it('should allow for add/removal of global mask placeholders', async () => {
    const localVue = createLocalVue();
    localVue.use(VueMask, {
      placeholders: {
        '#': null,
        D: /\d/,
      },
    });
    const wrapper = mount({
      data: () => ({ mask: '###-DDD-###-DDD', value: '123456' }),
      template: '<input v-mask="mask" v-model="value"/>',
    }, { localVue });
    expect(wrapper.vm.$el.value).toBe('###-123-###-456');
  });

  it('should allow placeholders for uppercase and lowercase characters', async () => {
    const localVue = createLocalVue();
    localVue.use(VueMask, {
      placeholders: {
        u: /[A-Z]/,
        l: /[a-z]/,
      },
    });
    const wrapper = mount({
      data: () => ({ mask: '###-###-###-ul-ul', value: '123123123AbAb' }),
      template: '<input v-mask="mask" v-model="value"/>',
    }, { localVue });
    expect(wrapper.vm.$el.value).toBe('123-123-123-Ab-Ab');
  });

  it('should allow placeholders for cyrillic characters', async () => {
    const localVue = createLocalVue();
    localVue.use(VueMask, {
      placeholders: {
        Я: /[\wа-яА-Я]/,
      },
    });
    const wrapper = mount({
      data: () => ({ mask: 'ЯЯЯЯЯЯ ЯЯЯЯ', value: 'Доброеутро' }),
      template: '<input v-mask="mask" v-model="value"/>',
    }, { localVue });
    expect(wrapper.vm.$el.value).toBe('Доброе утро');
  });

  it('should be possible to create a mask for accepting a valid time range', async () => {
    const wrapper = mountWithMask({
      data: () => ({
        mask: timeRangeMask,
        value: '02532137',
      }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    expect(wrapper.vm.$el.value).toBe('02:53-21:37');
  });

  it('should be possible to create a mask for rejecting an invalid time range', async () => {
    const wrapper = mountWithMask({
      data: () => ({
        mask: timeRangeMask,
        value: '23599999',
      }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    expect(wrapper.vm.$el.value).toBe('23:59-');
  });

  it('should have the ability to give two or multiple choices', async () => {
    const localVue = createLocalVue();
    localVue.use(VueMask, {
      placeholders: {
        P: /([67])/,
      },
    });
    const wrapper = mount({
      data: () => ({ mask: '0P-##-##-##-##', value: '0755555555' }),
      template: '<input v-mask="mask" v-model="value"/>',
    }, { localVue });
    expect(wrapper.vm.$el.value).toBe('07-55-55-55-55');
  });

  it('should be possible to use createNumberMask from text-mask-addons', () => {
    const currencyMask = createNumberMask({
      prefix: '$',
      allowDecimal: true,
      includeThousandsSeparator: true,
      allowNegative: false,
    });
    const wrapper = mountWithMask({
      data: () => ({
        mask: currencyMask,
        value: '1000000.00',
      }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    expect(wrapper.vm.$el.value).toBe('$1,000,000.00');
  });

  it.each([
    false, null, '', undefined,
  ])('allows input any value for `%p` mask', async (mask) => {
    const wrapper = mountWithMask({
      data: () => ({ mask, value: undefined }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    wrapper.vm.$el.value = '11112011BC';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('11112011BC');
  });

  it('should conform to mask when mask changes from falsy value back to real mask', async () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: false, value: undefined }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    wrapper.vm.$el.value = '11112011BC';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('11112011BC');
    wrapper.setData({ mask: '##:##' });
    wrapper.vm.$el.value = '11112011BC';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('11:11');
  });

  it('should allow any value when mask changes from real mask to falsy value', async () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: '##:##', value: undefined }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    wrapper.vm.$el.value = '11112011BC';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('11:11');
    wrapper.setData({ mask: '' });
    wrapper.vm.$el.value = '11112011BC';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('11112011BC');
  });

  it('should preserve entered value after setting mask to falsy value', async () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: '##:##', value: undefined }),
      template: '<input v-mask="mask" v-model="value"/>',
    });
    wrapper.vm.$el.value = '19323V';
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    wrapper.setData({ mask: '' });
    wrapper.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el.value).toBe('19:32');
  });
});

describe('filter usage', () => {
  let mountWithMask;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueMask);
    mountWithMask = (arg, options) => mount(arg, { ...options, localVue });
  });

  it('should mask static string', () => {
    const wrapper = mountWithMask({
      template: '<span>{{ "9999999999" | VMask("(###) ###-####") }}</span>',
    });
    expect(wrapper.text()).toBe('(999) 999-9999');
  });

  it('should mask static number', () => {
    const wrapper = mountWithMask({
      template: '<span>{{ 9999999999 | VMask("(###) ###-####") }}</span>',
    });
    expect(wrapper.text()).toBe('(999) 999-9999');
  });

  it('should mask dynamic value', () => {
    const wrapper = mountWithMask({
      data: () => ({ val: '8888888888' }),
      template: '<span>{{ val | VMask("(###) ###-####") }}</span>',
    });
    expect(wrapper.text()).toBe('(888) 888-8888');
  });

  it.each([null, undefined])('should pass through %p without modification', (val) => {
    const wrapper = mountWithMask({
      data: () => ({ val }),
      template: '<span>{{ val | VMask("(###) ###-####") }}</span>',
    });
    expect(wrapper.text()).toBe('');
  });

  it('should accept an array of regular expressions directly', async () => {
    const wrapper = mountWithMask({
      data: () => ({ mask: ['(', /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], value: '5555551234' }),
      template: '<span>{{ value | VMask(mask) }}</span>',
    });
    expect(wrapper.text()).toBe('(555) 555-1234');
  });

  it('should be possible to create a mask for accepting a valid time range', async () => {
    const wrapper = mountWithMask({
      data: () => ({
        mask: timeRangeMask,
        value: '02532137',
      }),
      template: '<span>{{ value | VMask(mask) }}</span>',
    });
    expect(wrapper.text()).toBe('02:53-21:37');
  });

  it('should allow for add/removal of global mask placeholders', async () => {
    const localVue = createLocalVue();
    localVue.use(VueMask, {
      placeholders: {
        '#': null,
        D: /\d/,
      },
    });
    const wrapper = mount({
      data: () => ({ mask: '###-DDD-###-DDD', value: '123456' }),
      template: '<span>{{ value | VMask(mask) }}</span>',
    }, { localVue });
    expect(wrapper.text()).toBe('###-123-###-456');
  });
});
