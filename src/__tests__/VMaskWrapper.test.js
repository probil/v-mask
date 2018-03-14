import { mount } from '@vue/test-utils';
import { VueMaskWrapper } from '../index';

describe('VMaskWrapper', () => {
  it('should be a component', () => {
    const wrapper = mount(VueMaskWrapper);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
