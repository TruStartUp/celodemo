import Vue from 'vue';
import Vuex from 'vuex';
import Session from './modules/Session.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Session,
  },
});
