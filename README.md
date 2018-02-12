# :abcd: Vue input mask 
[![npm](https://img.shields.io/npm/v/v-mask.svg)](https://www.npmjs.com/package/v-mask)
[![Github file size](https://img.shields.io/github/size/probil/v-mask/dist/v-mask.min.js.svg)](https://raw.githubusercontent.com/probil/v-mask/master/dist/v-mask.min.js)
[![npm](https://img.shields.io/npm/dm/v-mask.svg)](https://www.npmjs.com/package/v-mask)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/probil/v-mask/master/LICENSE)
[![Vue2](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![](https://data.jsdelivr.com/v1/package/npm/v-mask/badge?style=rounded)](https://www.jsdelivr.com/package/npm/v-mask)

> Super tiny input mask library for vue.js based on [PureMask.js](https://github.com/romulobrasil/PureMask.js) (~2kb) exposed as directive. No dependencies

## :art: Playground on the Web

- https://codesandbox.io/s/m3q1m5yp9x (interactive playground with webpack and ESM)
- https://jsfiddle.net/probil/c6fjjzn6/ (simple interactive playground with UMD)
- https://rawgit.com/probil/v-mask--demo/master/dist/index.html (just preview)

## :cd: Installation

This version requires Vue 2.X. If you are looking for Vue 1.X, [check it here](https://github.com/probil/v-mask/tree/vue-1.x).

```sh
npm install v-mask
```

## Initialization

### ES2015 (Webpack/Rollup/Browserify/etc)

```javascript
import Vue from 'vue'

// As a plugin
import VueMask from 'v-mask'
Vue.use(VueMask);

// Or as a directive
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);
```

### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-mask/dist/v-mask.min.js"></script>
<script>
// As a plugin
Vue.use(VueMask.VueMaskPlugin);

// Or as a directive
Vue.directive('mask', VueMask.VueMaskDirective);
</script>
```

## :rocket: Usage

```html
<input type="text" v-mask="'####-##'" v-model="myInputModel">
<!-- OR -->
<input type="text" v-mask="nameOfVariableWithMask" v-model="myInputModel">
```
**Notice:** `v-model` is required starting from `v1.1.0`, because [a lot](https://github.com/probil/v-mask/issues/16) [of](https://github.com/probil/v-mask/issues/30) [bugs](https://github.com/probil/v-mask/issues/29) with HTMLElement event listeners and sync with Vue internals.

There is no reason to support using this lib for using without `v-model` but open the door for using on [custom inputs](http://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events).

## :gear: Configs

List of supported placeholders:

| Value | Format                       |
|-------|------------------------------|
| #     | Number (0-9)                 |
| A     | Letter in any case (a-z,A-Z) |
| N     | Number or letter             |
| X     | Any symbol                   |
| ?     | Optional (next character)    |

## :syringe: Tests

[Jest](https://github.com/facebook/jest) is used for unit-tests.

You can run tests by typing this command in your console:

```bash
npm test
```

[Nightwatch](http://nightwatchjs.org/) is used of E2E testing.

Check the [v-mask--demo](https://github.com/probil/v-mask--demo) repo for more details


## :anchor: Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/).

## :newspaper: Changelog

We're using [GitHub Releases](https://github.com/probil/v-mask/releases).

## :beers: Contributing

We're more than happy to see potential contributions, so don't hesitate. If you have any suggestions, ideas or problems feel free to add new [issue](https://github.com/probil/v-mask/issues), but first please make sure your question does not repeat previous ones.

**Notice:** You should make your changes only in `src` folder, don't try to edit files from `dist` as it compiled from `src` by babel and shouldn't be changes manually.

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
