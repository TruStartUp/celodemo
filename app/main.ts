import Vue from 'nativescript-vue';
import App from './components/App.vue';
import firebase from 'nativescript-plugin-firebase';
import {web3} from './handlers';

import store from './store'
import VueDevtools from 'nativescript-vue-devtools'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

Vue.web3 = Vue.prototype.$web3 = web3;

firebase.init({})
  .catch((err) => {
    console.error(`Firebase error: ${err}`);
  });

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');
// Prints Colored logs when --env.production is *NOT* set while building
// @ts-ignore
Vue.config.debug = (TNS_ENV !== 'production');

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
