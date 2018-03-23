import Vue from "vue";
import Vuex from "vuex";
var algoliasearch = require("algoliasearch");
Vue.use(Vuex);

const state = {
  authorized: true,
  settingsView: false,
  arrangeConfirm: false,
  saveTemplateConfirm: false,
  saveLessonConfirm: false,
  templateStep: 1,
  standardsSelected: {
    standardsSet: "",
    gradeLevel: ""
  },
  lessonComponents: [],
  lessonTemplates: [],
  lessonPlans: [],
  folders: [],
  selectedComponentsList: [],
  arrangeComponentArray: [],
  names: {
    templateName: "",
    lessonName: "",
    folderName: ""
  }
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
  saveLessonTemplates(state, res) {
    state.lessonTemplates = res.templates;
  },
  updateLessonTemplates(state, res) {
    state.saveTemplateConfirm = true;
    state.lessonTemplates.push(res.templates);
  },
  saveLessonPlans(state, res) {
    state.lessonPlans = res.plans;
  },
  updateLessonPlans(state, res) {
    state.saveLessonConfirm = true;
    state.lessonPlans.push(res.plans);
    setTimeout(function() {
      state.saveLessonConfirm = false;
    }, 5000);
  },
  getFolders(state) {
    setTimeout(() => {
      state.lessonPlans.forEach(lesson => {
        if(state.folders.includes(lesson.fileName) === false){
          state.folders.push(lesson.fileName);
        }
      })
    }, 3000);
  },
  resetTemplateVariables(state) {
    state.saveTemplateConfirm = false;
    state.names.templateName = "";
    state.arrangeComponentArray = [];
    state.templateStep = 1;
    state.standardsSelected = { standardsSet: "", gradeLevel: "" };
  },
  saveSelectedComponents(state, event) {
    if (
      state.selectedComponentsList.filter(item => event.target.id == item.id)
        .length === 0
    ) {
      state.selectedComponentsList.push({
        id: parseInt(event.target.id),
        htmlType: event.target.value
      });
    } else {
      state.selectedComponentsList.forEach(item => {
        if (item.id === event.id) {
          item.htmlType = event.target.value;
        }
      });
    }
  },
  arrangeComponentList(state) {
    const filterById = (array, id) => array.filter(item => item.id === id);
    const list = state.selectedComponentsList.map(component => {
      return Object.assign(
        {},
        component,
        filterById(state.lessonComponents, component.id)[0]
      );
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
    setTimeout(function() {
      state.arrangeConfirm = false;
    }, 5000);
  },
  addFolder(state) {
    state.folders.forEach(folder => {
      if (state.names.folderName !== folder) {
        state.folders.push(state.names.folderName);
        state.names.folderName = "";
      }
    });
  }
};

const actions = {
  openSettings: ({ commit }) => commit("openSettings"),
  changeTemplateStepNext: ({ commit }) => commit("changeTemplateStepNext"),
  changeTemplateStepBack: ({ commit }) => commit("changeTemplateStepBack"),
  resetTemplateVariables: ({ commit }) => commit("resetTemplateVariables"),
  addFolder: ({ commit }) => commit("addFolder"),
  getComponents({ commit }) {
    fetch("https://planrightdb.herokuapp.com/components")
      .then(res => res.json())
      .then(res => commit("saveComponents", res));
  },
  saveSelectedComponents: ({ commit }, event) => {
    commit("saveSelectedComponents", event);
  },
  arrangeComponentList: ({ commit }) => commit("arrangeComponentList"),
  saveOrder: ({ commit }, { oldIndex, newIndex }) => {
    commit("saveOrder", { oldIndex, newIndex });
  },
  saveOrderFinal: ({ commit }) => commit("saveOrderFinal"),
  saveTemplate({ commit, state }) {
    let finalTemplate = ["<form>"];
    state.arrangeComponentArray.forEach(item => {
      switch (item.htmlType) {
        case "text":
          finalTemplate.push(
            `<label>${item.name}</label><input type='text' id='${item.name}'/>`
          );
          break;
        case "const":
          finalTemplate.push(
            `<label>${item.name}</label><input type='text' id='${
              item.name
            }' value='${item.customization}'/>`
          );
          break;
        case "select":
          const optionsArray = item.customization.split(",");
          const optionsHTMLArray = [];
          optionsArray.forEach(item => {
            optionsHTMLArray.push(`<option value='${item}'>${item}</option>`);
          });
          let optionsHTML = optionsHTMLArray.join("");
          finalTemplate.push(
            `<label>${item.name}</label><select id='${
              item.name
            }'><option value=''>Select</option>${optionsHTML}</select>`
          );
          break;
        default:
      }
    });
    finalTemplate.push("</form>");

    const templateString = finalTemplate.join("");
    const standardsString = `{state.standardsSelected.standardsSet}-{state.standardsSelected.gradeLevel}`;
    const nameString = state.names.templateName;

    const templateObject = {
      name: nameString,
      standards: standardsString,
      lessonTemplateString: templateString,
      users_id: 1
    };

    fetch("https://planrightdb.herokuapp.com/lessontemplates", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(templateObject)
    })
      .then(res => res.json())
      .then(res => commit("updateLessonTemplates", res));
  },
  getLessonTemplates({ commit }) {
    fetch("https://planrightdb.herokuapp.com/lessontemplates")
      .then(res => res.json())
      .then(res => commit("saveLessonTemplates", res));
  },
  getLessonPlans({ commit }) {
    fetch("https://planrightdb.herokuapp.com/lessonplans")
      .then(res => res.json())
      .then(res => commit("saveLessonPlans", res))
      .then(commit("getFolders"));
  },
  saveLessonPlan: ({ commit }, plan) => {
    console.log(plan);
    fetch("https://planrightdb.herokuapp.com/lessonplans", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(plan)
    })
      .then(res => res.json())
      .then(res => commit("updateLessonPlans", res));
  }
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
  names: state => state.names,
  arrangeConfirm: state => state.arrangeConfirm,
  saveTemplateConfirm: state => state.saveTemplateConfirm,
  saveLessonConfirm: state => state.saveLessonConfirm,
  lessonTemplates: state => state.lessonTemplates,
  lessonPlans: state => state.lessonPlans,
  folders: state => state.folders
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
