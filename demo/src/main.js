import Vue from 'vue'
import App from './App.vue'

import VueMask from '../../src/index.js'

Vue.use(VueMask);

new Vue({
  el    : '#app',
  render: h => h(App)
});
