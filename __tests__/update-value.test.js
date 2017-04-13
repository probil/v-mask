import vueMask from '../src/index'

describe('Element binding works', () => {
  var bindFunc = function(){};
  let mockVue = {};

  beforeEach( () => {
    global.document = {
      createEvent: function() { return {
        initEvent: function() {}
      }}
    };
    mockVue.directive = function(name, funcObject){
      bindFunc = funcObject.bind;
    };
    vueMask(mockVue);
  });


  test('Should set value when binded and previous value is `undefined`', () => {
    let mask = {value:"##.##.####"};
    let element = {
      value : "11112011",
      dataset : {
        previousValue : undefined,
        mask: mask.value
      },
      dispatchEvent: () => {}
    };
    debugger;
    bindFunc(element, mask);

    expect(element.value).toBe("11.11.2011");
  });
});
