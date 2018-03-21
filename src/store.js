import Vue from 'vue';
import Vuex from 'vuex';
var algoliasearch = require('algoliasearch');
Vue.use(Vuex);

const state = {
  authorized: true,
  settingsView: false,
  arrangeConfirm: false,
  saveTemplateConfirm: false,
  templateStep: 1,
  standardsSelected: {
    standardsSet: '',
    gradeLevel: '',
  },
  lessonComponents: [],
  selectedComponentsList: [],
  arrangeComponentArray: [],
  templateName: '',
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
  },
  saveSelectedComponents(state, event) {
    var exhists= false;

    state.selectedComponentsList.forEach((item) => {
      if(event.target.id === item.id) {
        item.htmlType = event.target.value;
        exhists = true;
      }
    });

    if (exhists === false) {
      state.selectedComponentsList.push({
        id: parseInt(event.target.id),
        htmlType: event.target.value,
      });
    }
  },
  arrangeComponentList(state) {
    const filterById = (array, id) => array.filter(item => item.id === id);
    const list = state.selectedComponentsList.map((component) => {
      return Object.assign({}, component, filterById(state.lessonComponents, component.id)[0])
    });
    state.arrangeComponentArray = list;
  },
  saveOrder(state, { oldIndex, newIndex }) {
    const categories = state.arrangeComponentArray.slice();
    categories.splice(newIndex, 0, categories.splice(oldIndex, 1)[0]);
    state.arrangeComponentArray = categories;
  },
  saveOrderFinal(state) {
    state.arrangeComponentArray.forEach((component, i) => {
      component.order = i;
    });
    state.arrangeConfirm = true;
    setTimeout(function(){state.arrangeConfirm = false}, 5000);
  },
};


const actions = {
  openSettings: ({ commit }) => commit('openSettings'),
  changeTemplateStepNext: ({ commit }) => commit('changeTemplateStepNext'),
  changeTemplateStepBack: ({ commit }) => commit('changeTemplateStepBack'),
  getComponents({ commit }) {
    fetch('https://planrightdb.herokuapp.com/components')
      .then(res => res.json())
      .then(res => commit('saveComponents', res));
  },
  saveSelectedComponents: ({ commit }, event) => {
    commit('saveSelectedComponents', event)
  },
  arrangeComponentList: ({ commit }) => commit('arrangeComponentList'),
  saveOrder: ({ commit }, {oldIndex, newIndex}) => {
    commit('saveOrder', {oldIndex, newIndex})
  },
  saveOrderFinal: ({ commit }) => commit('saveOrderFinal'),
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
  selectedComponentsList: state => state.selectedComponentsList,
  arrangeComponentArray: state => state.arrangeComponentArray,
  templateName: state => state.templateName,
  arrangeConfirm: state => state.arrangeConfirm,
  saveTemplateConfirm: state => state.saveTemplateConfirm,
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
