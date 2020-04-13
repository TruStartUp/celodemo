import Vue from 'nativescript-vue';
import App from './components/App.vue';
import firebase from 'nativescript-plugin-firebase';

import store from './store';
import router from './router';
import VueDevtools from 'nativescript-vue-devtools'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}

firebase.init({})
  .catch((err) => {
    console.error(`Firebase error: ${err}`);
  });

Vue.prototype.$router = router;

Vue.prototype.$goto = function (to, options) {
  const opts = options || {
    clearHistory: false,
    backstackVisible: true,
    transition: {
      name: "fade",
      duration: 380,
      curve: "easeIn"
    }
  };
  this.$navigateTo(this.$router[to], opts);
};


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');
// Prints Colored logs when --env.production is *NOT* set while building
// @ts-ignore
Vue.config.debug = (TNS_ENV !== 'production');

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
