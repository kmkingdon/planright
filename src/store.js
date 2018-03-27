import Vue from "vue";
import Vuex from "vuex";
import router from './router';
Vue.use(Vuex);

const state = {
  //  Authorization and Account Management
  loginData:{
    email: '',
    password: '',
  },
  modaledit: {
    show: false,
  },
  modalSignUp: {
    show: false,
  },
  userData: {
    userId: 0,
    userName: '',
    warning: '',
    avatar: '../../static/0.png',
  },
  settingsView: false,
  signUpData: {
    warning: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  //  Application data
  goals: [],
  folders: [],
  lessonComponents: [],
  lessonTemplates: [],
  lessonPlans: [],
  names: {
    templateName: '',
    lessonName: '',
    folderName: '',
  },
  standards: [],
  //  Confirmation Message Controllers
  arrangeConfirm: false,
  saveFinalReflectionConfirm: false,
  saveGoalConfirm: false,
  saveLessonConfirm: false,
  saveLessonReflectionConfirm: false,
  saveTemplateConfirm: false,
  updateLessonConfirm: false,
  //  Lesson Template
  addModal: {
    show: false,
    name: '',
  },
  arrangeComponentArray: [],
  selectedComponentsList: [],
  standardsSelected: {
    standardsSet: '',
    gradeLevel: '',
  },
  templateStep: 1,
  //  Lesson Planning
  deleteTemplateModal: {
    show: false,
  },
  oldLessonData: {
    lessonId: 0,
    name: '',
    dateTaught: '2000,01,01',
    standards: {},
    standardsObject: {},
    lessonTemplateString: '',
    lessonPlanData: {},
    fileName: '',
  },
  standardsData: {
    strand: '',
    substrand: '',
    standard: '',
    selectedStandards: [],
  },
  templateData: {
    templateId: 0,
    selectedFolder: '',
  },
  //  Lesson History
  deleteLessonModal: {
    show: false,
  },
  lessonHistory: {
    selectedFolder: '',
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
  //  Goals
  deleteGoalModal: {
    show: false,
  },
  goalData: {
    id: -1,
    component: 0,
    strengths: '',
    improve: '',
    actions: '',
    name: '',
  },

};




const mutations = {
  //  Authorization and Account Managment
  logout(state) {
    state.userData.userId = 0;
    state.settingsView= false,
    localStorage.clear();
    router.push({ path: '/' })
  },
  openSettings(state) {
    if (state.settingsView === false) {
      state.settingsView = true;
    } else {
      state.settingsView = false;
    }
  },
  setError(state, error){
    state.userData.warning = error;
  },
  setErrorSignup(state, error){
    state.signUpData.warning = error;
  },
  updateUserData(state, res) {
    state.loginData = {
      email: '',
      password: '',
    };
    state.userData.userId = res;
  },
  //  Lesson Template
  arrangeComponentList(state) {
    const filterById = (array, id) => array.filter(item => item.id === id);
    const list = state.selectedComponentsList.map((component) => {
      return Object.assign(
        {},
        component,
        filterById(state.lessonComponents, component.id)[0]
      );
    });
    state.arrangeComponentArray = list;
  },
  changeTemplateStepNext(state) {
    state.templateStep++;
  },
  changeTemplateStepBack(state) {
    state.templateStep--;
  },
  resetTemplateVariables(state) {
    state.saveTemplateConfirm = false;
    state.names.templateName = '';
    state.arrangeComponentArray = [];
    state.templateStep = 1;
    state.standardsSelected = { standardsSet: '', gradeLevel: '' };
  },
  saveComponents(state, res) {
    const savedComponents = res.components.filter(component => component.users_id === 1 || component.users_id === state.userData.userId)
    state.lessonComponents = savedComponents;
  },
  saveLessonTemplates(state, res) {
    const savedTemplates = res.templates.filter(template => template.users_id === state.userData.userId);
    state.lessonTemplates = savedTemplates;
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
    setTimeout(() => {
      state.arrangeConfirm = false;
    }, 5000);
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
      state.selectedComponentsList.forEach((item) => {
        if (item.id === event.id) {
          item.htmlType = event.target.value;
        }
      });
    }
  },
  updateLessonComponents(state, res) {
    state.lessonComponents.push(res.components);
    state.addModal = {
      show: false,
      name: '',
    };
  },
  updateLessonTemplates(state, res) {
    state.saveTemplateConfirm = true;
    state.lessonTemplates.push(res.templates);
  },
  //  Lesson Planning
  addFolder(state) {
    if(state.folders.length === 0) {
      state.folders.push(state.names.folderName);
      state.names.folderName = '';
    } else {
      state.folders.forEach((folder) => {
        if (state.names.folderName !== folder) {
          state.folders.push(state.names.folderName);
          state.names.folderName = '';
        }
      });
    }
  },
  addStandard(state) {
    let id = state.standardsData.standard;
    state.standards.forEach((standard) => {
      if (standard.id == id) {
        state.standardsData.selectedStandards.push(standard);
      }
    });
  },
  clearOldStandards(state) {
    state.oldLessonData.standardsObject = {};
  },
  deleteStandard(state, event) {
    let index;
    state.standardsData.selectedStandards.forEach((standard, i) => {
      if (standard.id == event.target.id) {
        index = i;
      }
    });
    state.standardsData.selectedStandards.splice(index, 1);
  },
  getFolders(state) {
    setTimeout(() => {
      state.lessonPlans.forEach((lesson) => {
        if (state.folders.includes(lesson.fileName) === false) {
          state.folders.push(lesson.fileName);
        }
      })
    }, 3000);
  },
  saveLessonPlans(state, res) {
    const savedLessons = res.plans.filter(plan => plan.users_id === state.userData.userId);
    state.lessonPlans = savedLessons;
  },
  saveStandards(state, res) {
    const standardsArray = Object.values(res.data.standards);
    state.standards = standardsArray;
  },
  updateDeleteTemplate(state) {
    let index;
    state.lessonTemplates.forEach((template, i) => {
      if (template.id === state.templateData.templateId) {
        index = i;
      }
    });
    state.lessonTemplates.splice(index, 1);
    state.deleteTemplateModal = {
      show: false
    };
    state.templateData.templateId = 0;
  },
  updateLessonPlans(state, res) {
    state.saveLessonConfirm = true;
    state.lessonPlans.push(res.plans);
    setTimeout(() => {
      state.saveLessonConfirm = false;
    }, 5000);
  },
  updateOldLessonData(state) {
    const lesson = state.lessonPlans.filter(plan => plan.id == state.oldLessonData.lessonId)[0]

    const date = lesson.dateTaught.split('T')[0];
    state.oldLessonData.name = lesson.name;
    state.oldLessonData.dateTaught = date;
    state.oldLessonData.standards = lesson.standards;
    state.oldLessonData.standardsObject = lesson.standardsObject;
    state.oldLessonData.lessonTemplateString = lesson.lessonTemplateString;
    state.oldLessonData.lessonPlanData = lesson.lessonPlanData;
    state.oldLessonData.fileName = lesson.fileName;
  },
  //  Lesson history
  addReflection(state) {
    if (state.lessonHistory.selectedLesson !== 0 && state.lessonHistory.reflectionGoal !== 0) {
      state.lessonHistory.warning = false;
      if (state.lessonHistory.reflectionAdded === true) {
        state.lessonHistory.reflectionAdded = false;
      } else {
        state.lessonHistory.reflectionAdded = true;
      }
    } else {
      state.lessonHistory.warning = true;
    }
  },
  selectLesson(state, event) {
    state.lessonHistory.selectedLesson = event.target.id;
  },
  updateDeleteLesson(state) {
    let index;
    state.lessonPlans.forEach((plan, i) => {
      if (plan.id === state.lessonHistory.selectedLesson) {
        index = i;
      }
    });
    state.lessonPlans.splice(index, 1);
    state.deleteLessonModal = false;
    state.lessonHistory.selectedLesson = 0;
  },
  updateLessonPlansEdit(state, res) {
    state.updateLessonConfirm = true;
    let index;
    state.lessonPlans.forEach((lesson, i) => {
      if (lesson.id === res.lessons.id) {
        index = i;
      }
    });
    state.lessonPlans.splice(index, 1, res.lessons);
    setTimeout(() => {
      state.updateLessonConfirm = false;
    }, 5000);
  },
  updateLessonReflections(state, res) {
    state.saveLessonReflectionConfirm = true;
    let index;
    state.lessonPlans.forEach((plan, i) => {
      if (plan.id === res.plans.id) {
        index = i;
      }
    });
    state.lessonPlans.splice(index, 1, res.plans);
    state.lessonHistory.reflectionAdded = false;
    state.lessonReflection = {
      actions: '',
      progress: '',
      improve: '',
    };
    setTimeout(() => {
      state.saveLessonReflectionConfirm = false;
    }, 5000);
  },
  //  Goals
  saveGoals(state, res) {
    const savedGoals = res.goals.filter(goal => goal.users_id === state.userData.userId);
    state.goals = savedGoals;
  },
  selectGoal(state) {
    state.goalData.id = 0;
  },
  selectGoalComponent(state, event) {
    state.goalData.component = event.target.id;
  },
  updateDeleteGoal(state) {
    let index;
    state.goals.forEach((goal, i) => {
      if (goal.id === state.goalData.id) {
        index = i;
      }
    });
    state.goals.splice(index, 1);
    state.deleteGoalModal = false;
    state.goalData.id = -1;
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
    setTimeout(() => {
      state.saveGoalConfirm = false;
    }, 5000);
  },
  updateGoalReflections(state, res) {
    state.saveFinalReflectionConfirm = true;
    let index;
    state.goals.forEach((goal, i) => {
      if (goal.id === res.goals.id) {
        index = i;
      }
    });
    state.goals.splice(index, 1, res.goals);
    setTimeout(() => {
      state.saveFinalReflectionConfirm = false;
    }, 5000);
  },
};




const actions = {
  //  Authorization and Account Management
  login: ({ commit, state }) => {
    const loginObject = {
      email: state.loginData.email,
      password: state.loginData.password,
    };

    fetch('https://planrightdb.herokuapp.com/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(loginObject),
    })
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          commit('setError', response.error);
        } else {
          commit('updateUserData', response.id);
          router.push({ path: '/dashboard' })
          localStorage.setItem('token', response.token);
        }
      })
  },
  logout: ({ commit }) => commit('logout'),
  openSettings: ({ commit }) => commit('openSettings'),
  signUp: ({ commit, state }) => {
    const signupObject = {
      userName: state.signUpData.username,
      email: state.signUpData.email,
      password: state.signUpData.password,
      teacherAccount: true,
      coachAccount: false,
    };

    fetch('https://planrightdb.herokuapp.com/signup', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(signupObject),
    })
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          commit('setErrorSignup', response.error);
        } else {
          state.modalSignUp.show = false;
        }
      })
  },
  //  Lesson Template
  addLessonComponent: ({ commit, state }) => {
    const token = localStorage.getItem('token');

    const lessonComponentObject = {
      name: state.addModal.name,
      order: 0,
      fixed: false,
      users_id: state.userData.userId,
    }
    fetch('https://planrightdb.herokuapp.com/components', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(lessonComponentObject),
    })
      .then(res => res.json())
      .then(res => commit('updateLessonComponents', res));
  },
  arrangeComponentList: ({ commit }) => commit('arrangeComponentList'),
  changeTemplateStepNext: ({ commit }) => commit('changeTemplateStepNext'),
  changeTemplateStepBack: ({ commit }) => commit('changeTemplateStepBack'),
  getComponents({ commit }) {
    const token = localStorage.getItem('token');
    fetch('https://planrightdb.herokuapp.com/components', {
      method: 'GET',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => res.json())
      .then(res => commit('saveComponents', res));
  },
  resetTemplateVariables: ({ commit }) => commit('resetTemplateVariables'),
  restartTemplate: ({ commit }) => commit('resetTemplateVariables'),
  saveOrder: ({ commit }, { oldIndex, newIndex }) => {
    commit('saveOrder', { oldIndex, newIndex });
  },
  saveOrderFinal: ({ commit }) => commit('saveOrderFinal'),
  saveTemplate({ commit, state }) {
    const finalTemplate = ['<form>'];
    state.arrangeComponentArray.forEach((item) => {
      switch (item.htmlType) {
        case 'text':
          finalTemplate.push(
            `<label>${item.name}</label><input type='text' id='${item.name}'/>`
          );
          break;
        case 'const':
          finalTemplate.push(
            `<label>${item.name}</label><input type='text' id='${
              item.name
            }' value='${item.customization}'/>`
          );
          break;
        case 'select':
          const optionsArray = item.customization.split(',');
          const optionsHTMLArray = [];
          optionsArray.forEach((item) => {
            optionsHTMLArray.push(`<option value='${item}'>${item}</option>`);
          });
          let optionsHTML = optionsHTMLArray.join('');
          finalTemplate.push(
            `<label>${item.name}</label><select id='${
              item.name
            }'><option value=''>Select</option>${optionsHTML}</select>`
          );
          break;
        default:
      }
    });
    finalTemplate.push('</form>');

    const templateString = finalTemplate.join('');
    const standardsObject = state.standardsSelected;
    const nameString = state.names.templateName;

    const templateObject = {
      name: nameString,
      standards: standardsObject,
      lessonTemplateString: templateString,
      users_id: state.userData.userId,
    };
    const token = localStorage.getItem('token');
    fetch('https://planrightdb.herokuapp.com/lessontemplates', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(templateObject),
    })
      .then(res => res.json())
      .then(res => commit('updateLessonTemplates', res));
  },
  saveSelectedComponents: ({ commit }, event) => {
    commit('saveSelectedComponents', event);
  },
  //  Lesson Planning
  addFolder: ({ commit }) => commit('addFolder'),
  addStandard: ({ commit }) => commit('addStandard'),
  clearOldStandards: ({ commit }) => commit('clearOldStandards'),
  deleteStandard: ({ commit }, event) => {
    commit('deleteStandard', event);
  },
  deleteTemplate({ commit, state }) {
    const token = localStorage.getItem('token');
    const deleteAPI = `https://planrightdb.herokuapp.com/lessontemplates/${state.templateData.templateId}`;
    fetch(deleteAPI, {
      method: 'DELETE',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(commit('updateDeleteTemplate'));
  },
  getLessonTemplates({ commit }) {
    const token = localStorage.getItem('token');
    fetch('https://planrightdb.herokuapp.com/lessontemplates', {
      method: 'GET',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => res.json())
      .then(res => commit('saveLessonTemplates', res));
  },
  getStandards: ({ commit, state }, standardsInfo) => {
    const standardsObject = {
      gradeLevel: standardsInfo.gradeLevel,
      standardsSet: standardsInfo.standardsSet,
    };

    fetch('https://standards-express-server.herokuapp.com/standards', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(standardsObject),
    })
      .then(res => res.json())
      .then(res => commit('saveStandards', res));
  },
  saveLessonPlan: ({ commit }, plan) => {
    const token = localStorage.getItem('token');
    fetch('https://planrightdb.herokuapp.com/lessonplans', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(plan),
    })
      .then(res => res.json())
      .then(res => commit('updateLessonPlans', res));
  },
  selectLesson: ({ commit }, event) => {
    commit('selectLesson', event);
  },
  updateLessonPlan: ({ commit, state }, lessonPlan) => {
    const token = localStorage.getItem('token');
    const putAPI = `https://planrightdb.herokuapp.com/lessonplans/${state.oldLessonData.lessonId}`;

    fetch(putAPI, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(lessonPlan),
    })
      .then(res => res.json())
      .then(res => commit('updateLessonPlansEdit', res));
  },
  updateOldLessonData: ({ commit }) => commit('updateOldLessonData'),
  //  Lesson History
  addLessonReflection: ({ commit, state }) => {
    const token = localStorage.getItem('token');
    const reflectionObject = {
      teacherReflection: {
        actions: state.lessonReflection.actions,
        progress: state.lessonReflection.progress,
        improve: state.lessonReflection.improve,
      }
    };
    const putAPI = `https://planrightdb.herokuapp.com/lessonplans/${state.lessonHistory.selectedLesson}`;
    fetch(putAPI, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(reflectionObject),
    })
      .then(res => res.json())
      .then(res => commit('updateLessonReflections', res));
  },
  deleteLesson({ commit, state }) {
    const token = localStorage.getItem('token');
    const deleteAPI = `https://planrightdb.herokuapp.com/lessonplans/${state.lessonHistory.selectedLesson}`;
    fetch(deleteAPI, {
      method: 'DELETE',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(commit('updateDeleteLesson'));
  },
  getLessonPlans({ commit }) {
    const token = localStorage.getItem('token');
    fetch('https://planrightdb.herokuapp.com/lessonplans', {
      method: 'GET',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => res.json())
      .then(res => commit('saveLessonPlans', res))
      .then(commit('getFolders'));
  },
  //  Goals
  addReflection: ({ commit }) => commit('addReflection'),
  deleteGoal({ commit, state }) {
    const token = localStorage.getItem('token');
    const deleteAPI = `https://planrightdb.herokuapp.com/lessonplans/${state.goalData.id}`;
    fetch(deleteAPI, {
      method: 'DELETE',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(commit('updateDeleteGoal'));
  },
  getGoals({ commit }) {
    const token = localStorage.getItem('token');
    fetch('https://planrightdb.herokuapp.com/goals', {
      method: 'GET',
      headers: new Headers ({
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => res.json())
      .then(res => commit('saveGoals', res));
  },
  postGoal: ({ commit, state }) => {
    const token = localStorage.getItem('token');
    const goalObject = {
      componentId: state.goalData.component,
      name: state.goalData.name,
      goalData: { Strengths:state.goalData.strengths, Improvements:state.goalData.improve, Actions:state.goalData.actions},
      goalFinalReflection: '',
      coachCommentString: '',
      users_id: state.userData.userId,
    };
    fetch('https://planrightdb.herokuapp.com/goals', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(goalObject),
    })
      .then(res => res.json())
      .then(res => commit('updateGoals', res));
  },
  saveFinalReflection: ({ commit, state }) => {
    const token = localStorage.getItem('token');
    const goalObject = {
      goalFinalReflection: state.goalData.reflection,
    };
    const putAPI = `https://planrightdb.herokuapp.com/goals/${state.goalData.id}`;

    fetch(putAPI, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
      body: JSON.stringify(goalObject),
    })
      .then(res => res.json())
      .then(res => commit('updateGoalReflections', res));
  },
  selectGoal: ({ commit }) => commit('selectGoal'),
  selectGoalComponent: ({ commit }, event) => {
    commit('selectGoalComponent', event);
  },
};


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
  oldLessonData: state => state.oldLessonData,
  updateLessonConfirm: state => state.updateLessonConfirm,
  deleteTemplateModal: state => state.deleteTemplateModal,
  templateData: state => state.templateData,
  deleteLessonModal: state => state.deleteLessonModal,
  deleteGoalModal: state => state.deleteGoalModal,
  loginData: state => state.loginData,
  userData: state => state.userData,
  modalSignUp: state => state.modalSignUp,
  signUpData: state => state.signUpData,
  modaledit: state => state.modaledit,
};


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
