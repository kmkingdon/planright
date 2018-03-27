<template>
  <div id="lesson-plan">
    <Header />
    <Menu />
    <div id="lesson-plan-menu">
      <div id="toggle">
        <button v-on:click="(newLesson = true) && (oldLesson = false)">New Lesson</button>
        <button v-on:click="(oldLesson = true) && (newLesson = false)">Edit Lesson</button>
      </div>
      <div v-if="newLesson" id="new-menu">
        <h2>Select a Template:</h2>
        <form>
          <select v-model="templateData.templateId" name="templates" v-on:change="getStandardsTemplate">
            <option value="">Select a Template</option>
            <option  v-for="template in lessonTemplates" :value="template.id">{{template.name}}</option>
          </select>
        </form>
        <h6 v-if="templateData.templateId !== 0" v-on:click="deleteTemplateModal.show = true">Delete This Template</h6>
        <h2>Save Your Lesson Plan:</h2>
        <form v-on:submit.prevent="saveData">
          <label for="folder">What folder should the plan go in?</label>
          <select required v-model="templateData.selectedFolder" name="folder">
            <option value="">Select a Folder</option>
            <option  v-for="folder in folders" :value="folder">{{folder}}</option>
          </select>
          <div id="newFolder">
            <form v-on:submit.prevent="addFolder">
              <input required  placeholder="New Folder Name" type="text" v-model="names.folderName" name="folder"/>
              <input id="add-folder" type="submit" value="Add" />
            </form>
          </div>
          <label for="lessonName">What is the name of your lesson plan?</label>
          <input required v-model="names.lessonName" type="text" name="lessonName">
          <input id="save" type="submit" name="button" value="Save Lesson Plan"/>
          <p v-if="saveLessonConfirm"> Lesson Saved!</p>
        </form>
      </div>
      <div v-if="oldLesson" id="edit-menu">
        <h2>Open a Lesson Plan:</h2>
        <form>
          <select  v-model="oldLessonData.lessonId" name="plans" v-on:change="updateOldLessonData">
            <option value="">Select a Lesson Plan</option>
            <option  v-for="plan in lessonPlans" :value="plan.id">{{plan.name}}</option>
          </select>
        </form>
        <h2>Save Your Changes:</h2>
        <form v-on:submit.prevent="updateLessonPlan">
          <label for="lessonName">What is the name of your lesson plan?</label>
          <input required  type="text" v-model="oldLessonData.name" name="lessonName">
          <input id="save" type="submit" name="button" value="Save Lesson Plan"/>
          <p v-if="updateLessonConfirm"> Lesson Saved!</p>
        </form>
      </div>
    </div>
    <div v-if="newLesson" class="lesson-plan-template">
      <div class="date">
        <h2>What date will you teach this lesson?</h2>
        <input v-model="dateTaught" type="date"/>
      </div>
      <div class="standards-selected">
        <h2>Standards:</h2>
        <ul>
          <li v-for="standard in standardsData.selectedStandards">
            <h3>{{standard.description}}</h3>
            <h4>{{standard.statementNotation}}</h4>
            <button :id="standard.id" v-on:click="deleteStandard">X</button>
          </li>
        </ul>
      </div>
      <div id="template" v-for="template in lessonTemplates" v-if="template.id === templateData.templateId" v-html="template.lessonTemplateString" >
      </div>
    </div>
    <div v-if="oldLesson" class="lesson-plan-template">
      <div class="date">
        <h2>What date will you teach this lesson?</h2>
        <input v-model="oldLessonData.dateTaught" type="date"/>
      </div>
      <div class="standards-selected">
        <div id="clear" >
          <h2>Standards:</h2>
          <button v-on:click="clearOldStandards">Clear Old Standards</button>
        </div>
        <ul>
          <li v-for="(value, key) in oldLessonData.standardsObject">
            <h3>{{value}}</h3>
            <h4>{{key}}</h4>
          </li>
          <li v-for="standard in standardsData.selectedStandards">
            <h3>{{standard.description}}</h3>
            <h4>{{standard.statementNotation}}</h4>
            <button :id="standard.id" v-on:click="deleteStandard">X</button>
          </li>
        </ul>
      </div>
      <div id="template-old" v-html="oldLessonData.lessonTemplateString" >
      </div>
    </div>
    <div id="standards-menu">
        <h1>Import Your Standards:</h1>
        <h2>What strand of standards?</h2>
        <select v-model="standardsData.strand">
          <option value=""> Select a Standard Strand</option>
          <option v-for="standard in standards" v-if="standard.depth === 0" :value="standard.id">{{standard.description}}</option>
        </select>
        <h2>What sub-strand of standards?</h2>
        <select v-model="standardsData.substrand">
          <option value=""> Select a Standard Sub-Strand</option>
          <option v-for="standard in standards" v-if="standard.depth === 1 && standard.ancestorIds[standard.ancestorIds.length - 1] === standardsData.strand " :value="standard.id">{{standard.description}}</option>
        </select>
        <h2>What standard would you like to add??</h2>
        <select v-model="standardsData.standard">
          <option value=""> Select a Standard</option>
          <option v-for="standard in standards" v-if="(standard.depth === 2 || standard.depth === 3) && (standard.ancestorIds[0] === standardsData.substrand || standard.ancestorIds[1] === standardsData.substrand) " :value="standard.id">{{standard.statementNotation}}: {{standard.description}}</option>
        </select>
        <button v-on:click="addStandard">Add Standard</button>
    </div>
    <ModalDeleteTemplate v-if="deleteTemplateModal.show"  @close="deleteTemplateModal.show = false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import ModalDeleteTemplate from "@/components/ModalDeleteTemplate";

export default {
  name: "LessonPlan",
  components: {
    Header,
    Menu,
    ModalDeleteTemplate,
  },
  data() {
    return {
      newLesson: false,
      oldLesson: false,
      dateTaught: "2000,01,01"
    };
  },
  computed: mapGetters([
    "lessonTemplates",
    "lessonPlans",
    "folders",
    "saveLessonConfirm",
    "names",
    "standards",
    "standardsData",
    "oldLessonData",
    "updateLessonConfirm",
    "deleteTemplateModal",
    "templateData",
    "userData"
  ]),
  methods: {
    ...mapActions([
      "getLessonTemplates",
      "getLessonPlans",
      "addFolder",
      "getStandards",
      "clearOldStandards",
      "deleteStandard",
      "addStandard",
    ]),
    saveData() {
      const lessonPlanObject = {};
      const template = document.getElementById("template");
      const templateForm = template.childNodes[0];
      templateForm.childNodes.forEach(item => {
        if (item.value !== undefined) {
          lessonPlanObject[item.id] = item.value;
        }
      });

      let standardsData;
      let templateString;
      this.lessonTemplates.forEach(template => {
        if (template.id === this.templateData.templateId) {
          standardsData = template.standards;
          templateString = template.lessonTemplateString;
        }
      });

      let standardsObjectNew = {};
      this.standardsData.selectedStandards.forEach(standard => {
        standardsObjectNew[standard.statementNotation] = standard.description;
      });

      const lessonPlan = {
        name: this.names.lessonName,
        dateTaught: this.dateTaught,
        standards: standardsData,
        standardsObject: standardsObjectNew,
        lessonTemplateString: templateString,
        lessonPlanData: lessonPlanObject,
        fileName: this.templateData.selectedFolder,
        teacherReflection: {},
        coachCommentString: "",
        users_id: this.userData.userId,
      };
      this.$store.dispatch("saveLessonPlan", lessonPlan);
    },
    getCurrentDate() {
      let currentDate;
      Date.prototype.toDateInputValue = (function() {
        var local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        currentDate = local.toJSON().slice(0, 10);
      })();
      this.dateTaught = currentDate;
    },
    getStandardsTemplate() {
      let standardsInfo;
      this.lessonTemplates.forEach(template => {
        if (template.id === this.templateData.templateId) {
          standardsInfo = template.standards;
        }
      });
      this.$store.dispatch("getStandards", standardsInfo);
    },
    updateOldLessonData() {
      this.$store.dispatch("updateOldLessonData");
      setTimeout(() => {
        const standardsInfo = this.oldLessonData.standards;
        this.$store.dispatch("getStandards", standardsInfo);

        const lessonData = this.oldLessonData.lessonPlanData;
        const template = document.getElementById("template-old");
        const templateForm = template.childNodes[0];

        templateForm.childNodes.forEach(item => {
          if (item.value != undefined) {
            item.value = lessonData[item.id];
          }
        });
      }, 2000);
    },
    updateLessonPlan() {
      const lessonPlanObject = {};
      const template = document.getElementById("template-old");
      const templateForm = template.childNodes[0];
      templateForm.childNodes.forEach(item => {
        if (item.value !== undefined) {
          lessonPlanObject[item.id] = item.value;
        }
      });

      let standardsObjectNew = this.oldLessonData.standardsObject;
      this.standardsData.selectedStandards.forEach(standard => {
        standardsObjectNew[standard.statementNotation] = standard.description;
      });

      const lessonPlan = {
        name: this.oldLessonData.name,
        dateTaught: this.oldLessonData.dateTaught,
        standardsObject: standardsObjectNew,
        lessonPlanData: lessonPlanObject
      };
      this.$store.dispatch("updateLessonPlan", lessonPlan);
    }
  },
  mounted() {
    this.getLessonTemplates();
    this.getLessonPlans();
    this.getCurrentDate();
  }
};
</script>


<style scoped>
#lesson-plan {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 20vw 60vw 20vw;
}

#lesson-plan-menu {
  grid-row: 3/4;
  grid-column: 1/2;
  background-color: #afadb3;
}

#toggle {
  width: 100%;
  height: 5vh;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: space-around;
}

#toggle button {
  width: 40%;
  height: 2rem;
  color: white;
  font-size: 0.8rem;
  margin-top: 1rem;
  background-color: #120832;
  border: solid #120832 1px;
  border-radius: 10px;
}

#edit-menu {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#new-menu {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#new-menu h6 {
  font-size: .8rem;
  color: red;
  cursor: pointer;
}

#lesson-plan-menu h2 {
  margin: 2rem 0rem 0.7rem 0rem;
  font-size: 1.4rem;
  width: 90%;
  text-align: center;
}

#lesson-plan-menu form {
  width: 85%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-plan-menu select {
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0rem 0.5rem 0rem;
}

#lesson-plan-menu label {
  width: 100%;
  font-size: 1rem;
}

#lesson-plan-menu input {
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0rem 0.5rem 0rem;
}

#save {
  width: 75% !important;
  height: 3rem;
  color: white;
  font-size: 1.1rem;
  margin-top: 2rem;
  background-color: #d09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

p {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #d09400;
}

#newFolder {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}

#newFolder form {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}

#newFolder h3 {
  color: #d09400;
  text-align: center;
}

#newFolder input {
  width: 50%;
  height: 1.5rem;
}

#add-folder {
  height: 60%;
  background-color: #d09400;
  width: 30% !important;
  border: solid #120832 1px;
  border-radius: 10px;
  height: 1.5rem;
  font-size: 0.8rem;
  margin-top: 0rem;
  margin-left: 1rem;
  color: white;
  font-size: 1rem;
}

.lesson-plan-template {
  grid-row: 3/4;
  grid-column: 2/3;
  display: grid;
  grid-template-rows: 5vh 20vh 45vh;
  grid-template-columns: 100%;
}

.date {
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}

.standards-selected {
  grid-row: 2/3;
  grid-column: 1/2;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #495669;
  overflow: scroll;
}

.standards-selected h2 {
  font-size: 1.2rem;
  height: 3vh;
  margin-top: 0.4rem;
  font-weight: bold;
  color: white;
}

#clear {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

#clear button {
  margin-left: 4rem;
  width: 20%;
  background-color: #d09400;
  border: solid #120832 1px;
  border-radius: 10px;
  font-size: 0.8rem;
  color: white;
  font-size: 0.8rem;
}

.standards-selected ul {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

.standards-selected li {
  width: 90%;
  margin-top: 0.5rem;
  background-color: white;
  padding: 0.5rem;
  display: grid;
  grid-template-rows: 75% 25%;
  grid-template-columns: 85% 15%;
}

.standards-selected h3 {
  grid-row: 1/2;
  grid-column: 1/2;
  font-size: 0.7rem;
}

.standards-selected h4 {
  grid-row: 2/3;
  grid-column: 1/2;
  font-size: 0.6rem;
  font-weight: bold;
  margin-top: 0.4rem;
}

.standards-selected button {
  grid-row: 1/3;
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
  background-color: #d09400;
  border: solid #120832 1px;
  border-radius: 100%;
  font-size: 0.8rem;
  color: white;
  font-size: 0.8rem;
}

#template {
  width: 100%;
  height: 49vh;
  overflow: scroll;
}

#template >>> form {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#template >>> label {
  width: 100%;
  margin: 0.5rem 0rem 0.5rem 2rem;
}

#template >>> input {
  width: 90%;
  height: 2rem;
  border: solid black 1px;
  margin: 0.5rem 0rem 0.5rem 1rem;
}
#template >>> select {
  width: 90%;
  height: 2rem;
  margin: 0.5rem 0rem 0.5rem 1rem;
}
#template-old {
  width: 100%;
  height: 49vh;
  overflow: scroll;
}

#template-old >>> form {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#template-old >>> label {
  width: 100%;
  margin: 0.5rem 0rem 0.5rem 2rem;
}

#template-old >>> input {
  width: 90%;
  height: 2rem;
  border: solid black 1px;
  margin: 0.5rem 0rem 0.5rem 1rem;
}
#template-old >>> select {
  width: 90%;
  height: 2rem;
  margin: 0.5rem 0rem 0.5rem 1rem;
}

#standards-menu {
  grid-row: 3/4;
  grid-column: 3/4;
  background-color: #afadb3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#standards-menu h1 {
  width: 90%;
  text-align: center;
  font-size: 1.4rem;
  margin: 1rem 0rem;
}

#standards-menu h2 {
  width: 80%;
  text-align: center;
  font-size: 1.2rem;
  margin: 0.8rem 0rem 0.4rem 0rem;
}

#standards-menu select {
  width: 80%;
  height: 2rem;
  margin: 0.5rem 0rem 0.5rem 0rem;
}

#standards-menu button {
  background-color: #d09400;
  width: 60%;
  color: white;
  border: solid #120832 1px;
  border-radius: 10px;
  height: 1.5rem;
  font-size: 0.8rem;
  margin-top: 1rem;
}
</style>
