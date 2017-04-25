import vueMask from '../src/index'

describe('Element binding works', () => {
  let bindFunc = function () {};
  let mockVue = {};

  beforeEach(() => {
    global.document = {
      createEvent() {
        return {
          initEvent() {}
        }
      }
    };
    mockVue.directive = function (name, funcObject) {
      bindFunc = funcObject.bind;
    };
    vueMask(mockVue);
  });


  test('Should set value when bound and previous value is `undefined`', () => {
    let mask = {value: "##.##.####"};
    let element = {
      value        : "11112011",
      dataset      : {
        previousValue: undefined,
        mask         : mask.value
      },
      dispatchEvent: () => {}
    };
    bindFunc(element, mask);

    expect(element.value).toBe("11.11.2011");
  });
});
