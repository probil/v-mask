// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Date and time': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    const input = 'input#time-and-date-ex';

    browser
      .url(devServer)
      .waitForElementVisible('.container', 5000)
      .assert.elementPresent(input)
      .setValue(input,'271020162315')
      .getValue(input, function (result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.value, "27/10/2016 23:15");
      })
      .end();
  },

  'Time with seconds': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    const input = 'input#time-ex';

    browser
      .url(devServer)
      .waitForElementVisible('.container', 5000)
      .assert.elementPresent(input)
      .setValue(input, '111515')
      .getValue(input, function (result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.value, "11:15:15");
      })
      .end()
  },

  'Credit Card': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    const input = 'input#credit-cart-ex';

    browser
      .url(devServer)
      .waitForElementVisible('.container', 5000)
      .assert.elementPresent(input)
      .setValue(input, '4444444444444444')
      .getValue(input, function (result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.value, "4444 4444 4444 4444");
      })
      .end()
  },

  'Phone Number': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    const input = 'input#phone-number-ex';

    browser
      .url(devServer)
      .waitForElementVisible('.container', 5000)
      .assert.elementPresent(input)
      .setValue(input, '9999999999')
      .getValue(input, function (result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.value, "(999) 999-9999");
      })
      .end()
  },

  'Phone Number (US)': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    const input = 'input#us-phone-number-ex';

    browser
      .url(devServer)
      .waitForElementVisible('.container', 5000)
      .assert.elementPresent(input)
      .setValue(input, '9999999999')
      .getValue(input, function (result) {
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.value, "+1(999)-999-9999");
      })
      .end()
  },
};
