import vueMask from '../src/index';

describe('Element binding works', () => {
  let bindFunc = function bindFunc() {};
  const mockVue = {};

  beforeEach(() => {
    global.document = {
      createEvent() {
        return {
          initEvent() {},
        };
      },
    };
    mockVue.directive = function directive(name, funcObject) {
      bindFunc = funcObject.bind;
    };
    vueMask(mockVue);
  });


  test('Should set value when bound and previous value is `undefined`', () => {
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
