import * as constants from '@/store/constants';

const state = {
  position: null,
  fit: false,
};

const actions = {
  [constants.SESSION_INIT]: ({ commit }) => {
    const position = Math.floor(Math.random() * Math.floor(101));
    commit(constants.SESSION_SET_STATE_PROPERTY, { property: 'position', value: position });
  },
  [constants.SESSION_SET_POSITION]: ({ commit, state }, pos) => {
    commit(
      constants.SESSION_SET_STATE_PROPERTY,
      { property: 'fit', value: state.position === pos }
    );
  },
};

const mutations = {
  [constants.SESSION_SET_STATE_PROPERTY]: (state, { property, value }) => {
    state[property] = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
