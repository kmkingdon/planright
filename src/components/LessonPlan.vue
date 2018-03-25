<template>
  <div id="lesson-plan">
    <Header />
    <Menu />
    <div id="lesson-plan-menu">
      <h2>Select a Template:</h2>
      <form>
        <select v-model="templateId" name="templates">
          <option value="">Select a Template</option>
          <option  v-for="template in lessonTemplates" :value="template.id">{{template.name}}</option>
        </select>
      </form>
      <h2>Save Your Lesson Plan:</h2>
      <form v-on:submit.prevent="saveData">
        <label for="folder">What folder should the plan go in?</label>
        <select required v-model="selectedFolder" name="folder">
          <option value="">Select a Folder</option>
          <option  v-for="folder in folders" :value="folder">{{folder}}</option>
        </select>
        <div id="newFolder">
          <h3>Make a New Folder</h3>
          <form v-on:submit.prevent="addFolder">
            <input required type="text" v-model="names.folderName" name="folder"/>
            <input id="add" type="submit" value="Add" />
          </form>
        </div>
        <label for="lessonName">What is the name of your lesson plan?</label>
        <input required v-model="names.lessonName" type="text" name="lessonName">
        <input id="save" type="submit" name="button" value="Save Lesson Plan"/>
        <p v-if="saveLessonConfirm"> Lesson Saved!</p>
      </form>
    </div>
    <div id="lesson-plan-template">
        <div id="standards">
          <div id="standards-title">
            <h1>Import Your Standards:</h1>
          </div>
          <div id="standards-menu">
            <div>
              <h2>What strand of standards?</h2>
              <select v-model="standardsData.strand">
                <option value=""> Select a Standard Strand</option>
                <option v-for="standard in standards" v-if="standard.depth === 0" :value="standard.id">{{standard.description}}</option>
              </select>
            </div>
            <div>
              <h2>What sub-strand of standards?</h2>
              <select v-model="standardsData.substrand">
                <option value=""> Select a Standard Sub-Strand</option>
                <option v-for="standard in standards" v-if="standard.depth === 1 && standard.ancestorIds[standard.ancestorIds.length - 1] === standardsData.strand " :value="standard.id">{{standard.description}}</option>
              </select>
            </div>
            <div>
              <h2>What standard would you like to add??</h2>
              <select v-model="standardsData.standard">
                <option value=""> Select a Standard</option>
                <option v-for="standard in standards" v-if="(standard.depth === 2 || standard.depth === 3) && (standard.ancestorIds[0] === standardsData.substrand || standard.ancestorIds[1] === standardsData.substrand) " :value="standard.id">{{standard.description}}</option>
              </select>
            </div>
          </div>
          <div id="standards-button">
            <button v-on:click="addStandard">Add Standard</button>
          </div>
          <div id="standards-selected">
            <h2>Selected Standards</h2>
            <div id="standards-slider">
                <div id="standards-slider-inner">
                  <div v-for="standard in standardsData.selectedStandards">
                    <h3>{{standard.description}}</h3>
                    <h4>{{standard.statementNotation}}</h4>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div id="date">
          <h2>What date will you teach this lesson?</h2>
          <input v-model="dateTaught" type="date"/>
        </div>

      <div id="template" v-for="template in lessonTemplates" v-if="template.id === templateId" v-html="template.lessonTemplateString" >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

export default {
  name: 'LessonPlan',
  components: {
    Header,
    Menu
  },
  data() {
    return {
      templateId : 0,
      selectedFolder: '',
      dateTaught: "2000,01,01",
      standardsData: {
        strand: '',
        substrand: '',
        standard: '',
        selectedStandards: [],
      }
    };
  },
  computed: mapGetters([
    'lessonTemplates',
    'lessonPlans',
    'folders',
    'saveLessonConfirm',
    'names',
    'standards',
  ]),
  methods:{
    ...mapActions([
    'getLessonTemplates',
    'getLessonPlans',
    'addFolder',
    'getStandards',
  ]),
    saveData(){
      const lessonPlanObject = {};
      const template = document.getElementById('template');
      const templateForm = template.childNodes[0];
      templateForm.childNodes.forEach(item => {
        if(item.value !== undefined) {
        lessonPlanObject[item.id] = item.value;
        }
      })

      let templateString;
      this.lessonTemplates.forEach(template => {
        if(template.id === this.templateId) {
          templateString = template.lessonTemplateString;
        }
      })

      const lessonPlan = {
        name: this.names.lessonName,
        dateTaught: this.dateTaught,
        lessonTemplateString: templateString,
        lessonPlanData: lessonPlanObject,
        fileName: this.selectedFolder,
        teacherReflection: {},
        coachCommentString: '',
        users_id: 1,
      }
      this.$store.dispatch('saveLessonPlan', lessonPlan)
    },
    getCurrentDate() {
      let currentDate;
      Date.prototype.toDateInputValue = (function() {
        var local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        currentDate= local.toJSON().slice(0,10);
      }())
      this.dateTaught = currentDate;
    },
    addStandard() {
      let id = this.standardsData.standard;
      this.standards.forEach(standard => {
        if(standard.id == id) {
          this.standardsData.selectedStandards.push(standard);
        }
      })
    }
  },
  mounted(){
    this.getLessonTemplates();
    this.getLessonPlans();
    this.getCurrentDate();
    this.getStandards();
  },
  filters: {
    formatDate: function (value) {
      if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
      }
    }
  }
};
</script>


<style scoped>
#lesson-plan {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 30vw 70vw;
}

#lesson-plan-menu {
  grid-row: 3/4;
  grid-column: 1/2;
  background-color: #AFADB3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-plan-menu h2 {
  margin: 2rem 0rem .7rem 0rem;
  font-size: 1.4rem;
}

#lesson-plan-menu form {
  width: 90%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-plan-menu select {
  width: 100%;
  height: 2rem;
  margin: .5rem 0rem .5rem 0rem;
}

#lesson-plan-menu label {
  width: 100%;
  font-size: 1rem;
}

#lesson-plan-menu input {
  width: 100%;
  height: 2rem;
  margin: .5rem 0rem .5rem 0rem;
}

#save {
  width: 75% !important;
  height: 3rem;
  color: white;
  font-size: 1.3rem;
  margin-top: 2rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

p {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #D09400;
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
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}

#newFolder h3 {
  color: #D09400;
  text-align: center;
}

#newFolder input {
  width: 40%;
  height: 1.5rem;
}

#add{
  height: 60%;
  background-color: #D09400;
  width: 25%;
  border: solid #120832 1px;
  border-radius: 10px;
  height: 1.5rem;
  font-size: .8rem;
  margin-top: 0rem;
  margin-left: 1rem;
  color: white;
  font-size: 1rem;

}

#lesson-plan-template {
  grid-row: 3/4;
  grid-column: 2/3;
  display: grid;
  grid-template-rows: 33vh 5vh 27vh;
  grid-template-columns: 100%;
}

#standards {
  grid-row: 1/2;
  grid-column: 1/2;
  display: grid;
  grid-template-rows: 4vh 8vh 3vh 15vh;
  grid-template-columns: 50% 50%;
}

#standards-title {
  grid-row: 1/2;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  font-size: 1.4rem;
}

#standards-title  h1{
  width: 100%;
}

#standards-menu {
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  flex-flow: row;
}

#standards-menu div {
  height: 10vh;
  width: 33vw;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#standards-menu h2 {
  text-align: center;
}

#standards-menu select {
  width: 75%;
  height: 1.5rem;
  margin-top: .8rem;
}

#standards-button {
  grid-row: 3/4;
  grid-column: 1/3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
}

#standards-button button {
  background-color: #D09400;
  width: 20%;
  color: white;
  border: solid #120832 1px;
  border-radius: 10px;
  height: 1.5rem;
  font-size: .8rem;
  margin-right: 4rem;
}

#standards-selected {
  grid-row: 4/6;
  grid-column: 1/3;
  display: grid;
  grid-template-rows: 3vh 15vh;
  grid-template-columns: 70vw;
}

#standards-selected h2 {
  grid-row:1/2;
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
  font-size: 1.2rem;
}

#standards-slider {
  width: 70vw;
  height: 15vh;
  overflow-y: scroll;
}

#standards-slider-inner {
  width: 100%;
  height: 100%;
  background-color: #120832;
  overflow-y: inherit;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
}

#standards-slider-inner div{
  width: 40%;
  height:80%;
  background-color: #AFADB3;
  margin-left: 1rem;
}

#standards-slider-inner h3 {
  width: 100%;
  font-size: .6rem;
  text-align: center;
  padding: .3rem;
  color: white;
}

#standards-slider-inner h4 {
  width: 100%;
  font-size: .7rem;
  text-align: left;
  padding: .3rem;
  color: white;
}


#date {
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  flex-flow: center;
  justify-content: flex-start;
  align-items: center;
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
  margin: .5rem 0rem .5rem 2rem;
}

#template >>> input {
  width: 90%;
  height: 2rem;
  border: solid black 1px;
  margin: .5rem 0rem .5rem 1rem;
}
#template >>> select {
  width: 90%;
  height: 2rem;
  margin: .5rem 0rem .5rem 1rem;
}


</style>
