import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  authorized: true,
  settingsView: false,
  templateStep: 1,
};

const mutations = {
  openSettings(state) {
    if (state.settingsView === false) {
      state.settingsView = true;
    } else {
      state.settingsView = false;
    }
  },
  changeTemplateStepNext(state) {
    state.templateStep++;
    console.log(state.templateStep)
  },
  changeTemplateStepBack(state) {
    state.templateStep--;
  },
};


const actions = {
  openSettings: ({ commit }) => commit('openSettings'),
  changeTemplateStepNext: ({ commit }) => commit('changeTemplateStepNext'),
  changeTemplateStepBack: ({ commit }) => commit('changeTemplateStepBack'),
  decrement: ({ commit }) => commit('decrement'),

  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment');
        resolve();
      }, 1000);
    });
  }
};

// getters are functions
const getters = {
  authorized: state => state.authorized,
  settingsView: state => state.settingsView,
  templateStep: state => state.templateStep,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
