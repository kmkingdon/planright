import Vue from 'vue';
import Vuex from 'vuex';
var algoliasearch = require('algoliasearch');
Vue.use(Vuex);

const state = {
  authorized: true,
  settingsView: false,
  templateStep: 1,
  standardsSelected: {
    standardsSet: '',
    gradeLevel: '',
  },
  lessonComponents: [],
  selectedComponents: [],
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
  },
  changeTemplateStepBack(state) {
    state.templateStep--;
  },
  saveComponents(state, res) {
    state.lessonComponents = res.users;
  }
};


const actions = {
  openSettings: ({ commit }) => commit('openSettings'),
  changeTemplateStepNext: ({ commit }) => commit('changeTemplateStepNext'),
  changeTemplateStepBack: ({ commit }) => commit('changeTemplateStepBack'),

  getComponents ({ commit }) {
    fetch('https://planrightdb.herokuapp.com/components')
      .then(res => res.json())
      .then(res => commit('saveComponents', res));
  },


  // searchStandards({ commit }) {
  //   var client = algoliasearch('O7L4OQENOZ', 'def640649a42fff2f56df3c284c27230');
  //   var index = client.initIndex('common-standards-project');
  //   index.search('Common Core State Standards Mathematics', function searchDone(err, content) {
  //   console.log(err, content)
  //   });
  // }
};

// getters are functions
const getters = {
  authorized: state => state.authorized,
  settingsView: state => state.settingsView,
  templateStep: state => state.templateStep,
  standardsSelected: state => state.standardsSelected,
  lessonComponents: state => state.lessonComponents,
  selectedComponents: state => state.selectedComponents,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
