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
  saveGoalConfirm: false,
  saveFinalReflectionConfirm: false,
  saveLessonReflectionConfirm: false,
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
  addModal: {
    show: false,
    name: '',
  },
  arrangeComponentArray: [],
  names: {
    templateName: "",
    lessonName: "",
    folderName: ""
  },
  lessonHistory: {
    selectedFolder:'',
    selectedLesson: 0,
    reflectionAdded: false,
    reflectionGoal: 0,
    warning: false,
  },
  lessonReflection: {
    actions: '',
    progress: '',
    improve: '',
  },
  goals: [],
  goalData: {
    id: NaN,
    component: 0,
    strengths: '',
    improve: '',
    actions: '',
    name: '',
  },
  standards: [],
  standardsData: {
    strand: '',
    substrand: '',
    standard: '',
    selectedStandards: [],
  },
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
  selectGoal(state) {
    state.goalData.id = 0;
  },
  saveComponents(state, res) {
    state.lessonComponents = res.components;
  },
  updateLessonComponents(state, res) {
    state.lessonComponents.push(res.components);
    state.addModal = {
      show: false,
      name: '',
    };
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
  selectLesson(state, event) {
    state.lessonHistory.selectedLesson = event.target.id;
  },
  addReflection(state) {
    if(state.lessonHistory.selectedLesson !== 0 && state.lessonHistory.reflectionGoal !== 0 ) {
      state.lessonHistory.warning = false;
      if(state.lessonHistory.reflectionAdded === true) {
        state.lessonHistory.reflectionAdded = false;
      } else {
        state.lessonHistory.reflectionAdded = true;
      }
    } else {
      state.lessonHistory.warning = true;
    }
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
  },
  saveGoals(state, res) {
    state.goals = res.goals;
  },
  saveStandards(state, res) {
    const standardsArray = Object.values(res.data.standards)
    state.standards = standardsArray;
  },
  selectGoalComponent(state, event) {
    state.goalData.component = event.target.id;
  },
  updateGoals(state, res) {
    state.saveGoalConfirm = true;
    state.goals.push(res.goals);
    state.goalData = {
      component: 0,
      strengths: '',
      improve: '',
      actions: '',
      name: '',
      reflection: '',
    };
    setTimeout(function() {
      state.saveGoalConfirm = false;
    }, 5000);
  },
  updateGoalReflections(state, res) {
    state.saveFinalReflectionConfirm = true;
    let index;
    state.goals.forEach((goal, i) => {
      if(goal.id === res.goals.id) {
        index = i;
      }
    })
    state.goals.splice(index , 1, res.goals);
    setTimeout(function() {
      state.saveFinalReflectionConfirm = false;
    }, 5000);
  },
  updateLessonReflections(state, res) {
    state.saveLessonReflectionConfirm = true;
    let index;
    state.lessonPlans.forEach((plan, i) => {
      if(plan.id === res.plans.id) {
        index = i;
      }
    })
    state.lessonPlans.splice(index , 1, res.plans);
    state.lessonHistory.reflectionAdded = false;
    state.lessonReflection = {
      actions: '',
      progress: '',
      improve: '',
    };
    setTimeout(function() {
      state.saveLessonReflectionConfirm = false;
    }, 5000);
  }
};

const actions = {
  openSettings: ({ commit }) => commit("openSettings"),
  changeTemplateStepNext: ({ commit }) => commit("changeTemplateStepNext"),
  changeTemplateStepBack: ({ commit }) => commit("changeTemplateStepBack"),
  resetTemplateVariables: ({ commit }) => commit("resetTemplateVariables"),
  selectGoal: ({ commit }) => commit("selectGoal"),
  addFolder: ({ commit }) => commit("addFolder"),
  addReflection: ({ commit }) => commit("addReflection"),
  restartTemplate: ({ commit }) => commit("resetTemplateVariables"),
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
    const standardsObject = state.standardsSelected;
    const nameString = state.names.templateName;

    const templateObject = {
      name: nameString,
      standards: standardsObject,
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
    fetch("https://planrightdb.herokuapp.com/lessonplans", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(plan)
    })
      .then(res => res.json())
      .then(res => commit("updateLessonPlans", res));
  },
  selectLesson: ({ commit }, event) => {
    commit("selectLesson", event);
  },
  getGoals({ commit }) {
    fetch("https://planrightdb.herokuapp.com/goals")
      .then(res => res.json())
      .then(res => commit("saveGoals", res))
  },
  selectGoalComponent: ({ commit }, event) => {
    commit("selectGoalComponent", event);
  },
  postGoal: ({ commit, state }) => {
    const goalObject = {
        componentId: state.goalData.component,
        name: state.goalData.name,
        goalData: {Strengths:state.goalData.strengths, Improvements:state.goalData.improve, Actions:state.goalData.actions},
        goalFinalReflection: '',
        coachCommentString: '',
        users_id: 1
    }
    fetch("https://planrightdb.herokuapp.com/goals", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(goalObject)
    })
      .then(res => res.json())
      .then(res => commit("updateGoals", res));
  },
  saveFinalReflection: ({ commit, state }) => {
    const goalObject = {
        goalFinalReflection: state.goalData.reflection,
    }
    const putAPI = `https://planrightdb.herokuapp.com/goals/${state.goalData.id}`;

    fetch(putAPI, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(goalObject)
    })
      .then(res => res.json())
      .then(res => commit('updateGoalReflections', res));
  },
  addLessonReflection: ({ commit, state }) => {
    const reflectionObject = {
        teacherReflection: {
          actions: state.lessonReflection.actions,
          progress: state.lessonReflection.progress,
          improve: state.lessonReflection.improve,
        }
    };
    const putAPI = `https://planrightdb.herokuapp.com/lessonplans/${state.lessonHistory.selectedLesson}`;
    fetch(putAPI, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(reflectionObject)
    })
      .then(res => res.json())
      .then(res => commit('updateLessonReflections', res));
  },
  addLessonComponent: ({ commit, state }) => {
    const lessonComponentObject = {
        name: state.addModal.name,
        order: 0,
        fixed: false,
        users_id: 1,
    }
    fetch("https://planrightdb.herokuapp.com/components", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(lessonComponentObject)
    })
      .then(res => res.json())
      .then(res => commit("updateLessonComponents", res));
  },
  getStandards: ({ commit, state }, standardsInfo) => {
    console.log(standardsInfo)
    let APIurl;

    if(standardsInfo.standardsSet === "CommonCoreMath"){
      switch (standardsInfo.gradeLevel) {
        case "1":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-01"
            break;
        case "2":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-02"
            break;
        case "3":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-03"
            break;
        case "4":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-04"
            break;
        case "5":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-05"
            break;
        case "6":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-06"
            break;
        case "7":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-07"
            break;
        case "8":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grade-08"
            break;
        case "9-10-11-12":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FB_grades-09-10-11-12"
            break;
        default:
      }
    } else if(standardsInfo.standardsSet === "CommonCoreEnglish"){
      switch (standardsInfo.gradeLevel) {
        case "1":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-01"
            break;
        case "2":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-02"
            break;
        case "3":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-03"
            break;
        case "4":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-04"
            break;
        case "5":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-05"
            break;
        case "6":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-06"
            break;
        case "7":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-07"
            break;
        case "8":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grade-08"
            break;
        case "9-10-11-12":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/67810E9EF6944F9383DCC602A3484C23_D10003FC_grades-09-10-11-12"
            break;
        default:
      }
    } else if(standardsInfo.standardsSet === "NextGenerationScience"){
      switch (standardsInfo.gradeLevel) {
        case "1":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grade-01"
            break;
        case "2":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grade-02"
            break;
        case "3":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grade-03"
            break;
        case "4":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grade-04"
            break;
        case "5":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grade-05"
            break;
        case "6":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grades-06-07-08"
            break;
        case "7":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grades-06-07-08"
            break;
        case "8":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grades-06-07-08"
            break;
        case "9-10-11-12":
            APIurl = "http://commonstandardsproject.com/api/v1/standard_sets/71E5AA409D894EB0B43A8CD82F727BFE_D2454348_grades-09-10-11-12"
            break;
        default:
      }
    }
    console.log(APIurl);

    fetch(APIurl, {
      method: "GET",
      headers:{ 'API-KEY': 'GGbhskDed9DkGM9u3pZgR7TU' },
    })
      .then(res => res.json())
      .then(res => commit("saveStandards", res));
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
  addModal: state => state.addModal,
  selectedComponentsList: state => state.selectedComponentsList,
  arrangeComponentArray: state => state.arrangeComponentArray,
  names: state => state.names,
  arrangeConfirm: state => state.arrangeConfirm,
  saveTemplateConfirm: state => state.saveTemplateConfirm,
  saveLessonConfirm: state => state.saveLessonConfirm,
  saveGoalConfirm: state => state.saveGoalConfirm,
  lessonTemplates: state => state.lessonTemplates,
  standards: state => state.standards,
  lessonPlans: state => state.lessonPlans,
  folders: state => state.folders,
  goals: state => state.goals,
  goalData: state => state.goalData,
  saveFinalReflectionConfirm: state => state.saveFinalReflectionConfirm,
  lessonHistory: state => state.lessonHistory,
  lessonReflection: state => state.lessonReflection,
  saveLessonReflectionConfirm: state => state.saveLessonReflectionConfirm,
  standardsData: state => state.standardsData,
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
