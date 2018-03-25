<template>
  <div id="plan-history">
    <Header />
    <Menu />
    <div id="history-menu">
      <h2>Select a Folder:</h2>
      <form>
        <select v-model="lessonHistory.selectedFolder" name="templates">
          <option value="">Select a Folder</option>
          <option  v-for="folder in folders" :value="folder">{{folder}}</option>
        </select>
      </form>
      <div id="lessons">
        <div id="lessons-inner">
          <div v-for="lesson in lessonPlans" v-if="lesson.fileName === lessonHistory.selectedFolder" class="lesson-icon">
            <img v-on:click="selectLesson" :id="lesson.id" src="../../static/lesson.png" alt="lessonicon"/>
            <small>{{lesson.name}}</small>
          </div>
        </div>
      </div>
    </div>
    <div id="lesson-display">
      <div v-for="lesson in lessonPlans" v-if="lesson.id == lessonHistory.selectedLesson" id="lesson-display-inner">
        <h1>{{lesson.name}}</h1>
        <h2>Date Taught:{{lesson.dateTaught | formatDate}}</h2>
        <ul id="standards-view">
          <h2>Standards</h2>
          <li v-for="(value, key) in lesson.standards">
            <h3>{{value}}</h3>
            <h4>{{key}}</h4>
          </li>
        </ul>
        <ul id="components-view">
          <li v-for="(value, key) in lesson.lessonPlanData">
            <h3>{{key}}</h3>
            <h4>{{value}}</h4>
          </li>
        </ul>
        <div id="lesson-reflection-complete"  v-if="lesson.teacherReflection.actions !== undefined">
          <h5>Lesson Reflection</h5>
          <h6>Describe how you did your goal actions in this lesson:</h6>
          <p>{{lesson.teacherReflection.actions}}</p>
          <h6>What was successful with those actions in this lesson?</h6>
          <p>{{lesson.teacherReflection.progress}}</p>
          <h6>What would your like to improve next time you work on this lesson component after this lesson?</h6>
          <p>{{lesson.teacherReflection.improve}}</p>
        </div>
        <div v-if="lessonHistory.reflectionAdded" id="lesson-reflection">
          <h5>Reflect On Your Lesson:</h5>
          <div id="goal-review" v-for="goal in goals" v-if="goal.id === lessonHistory.reflectionGoal">
            <h6 >Your Goal:<br/> {{goal.name}} </h6>
            <h6 v-for="lesson in lessonComponents" v-if="lesson.id === goal.componentId">Lesson Component:<br/>{{lesson.name}}</h6>
            <p>You want to improve: <br/><br/>{{goal.goalData.improve}} </p>
            <p>You commited to the following actions: <br/><br/>{{goal.goalData.actions}} </p>
          </div>
          <form v-on:submit.prevent="addLessonReflection">
            <label for="actions">Describe how you did your goal actions in this lesson:</label>
            <input  required v-model="lessonReflection.actions" type="text" name="actions" >
            <label for="progress">What was successful with those actions in this lesson?</label>
            <input  required v-model="lessonReflection.progress" type="text" name="progress" >
            <label for="improve">What would your like to improve next time you work on this lesson component after this lesson?</label>
            <input  required v-model="lessonReflection.improve" type="text" name="improve" >
            <input id="save-reflection" type="submit" value="Save Reflection"/>
            <p id="reflection-confirm" v-if="saveLessonReflectionConfirm">Reflection Added!</p>
          </form>
        </div>
      </div>
    </div>
    <div id="lesson-menu">
      <h2>Export as PDF:</h2>
      <button v-on:click.prevent="createPDF" >Export Now</button>
      <h2>Add a Goal Reflection to Lesson Plan:</h2>
      <h3>Pick the goal:</h3>
      <select v-model="lessonHistory.reflectionGoal">
        <option value="">Select a Goal</option>
        <option v-for="goal in goals" :value="goal.id">{{goal.name}}</option>
      </select>
      <button v-on:click="addReflection">Add Reflection</button>
      <p id="warning" v-if="lessonHistory.warning">Please select a lesson and goal first.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import jsPDF  from "jspdf";
import moment from 'moment';

export default {
  name: 'PlanHistory',
  components: {
    Header,
    Menu
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'folders',
    'lessonPlans',
    'lessonComponents',
    'goals',
    'lessonHistory',
    'lessonReflection',
    'saveLessonReflectionConfirm',
  ]),
  methods:{
    ...mapActions([
      'getLessonTemplates',
      'getLessonPlans',
      'getGoals',
      'addReflection',
      'getComponents',
      'addLessonReflection',
    ]),
    selectLesson(event){
      this.$store.dispatch('selectLesson', event)
    },
    createPDF () {

      this.lessonPlans.forEach(lesson => {
        if(lesson.id == this.lessonHistory.selectedLesson) {
            let date = lesson.dateTaught;
            let formatedDate= moment(String(date)).format('MM/DD/YYYY');
            let standardsArray= Object.entries(lesson.standards);
            let lessonPlanArray = Object.entries(lesson.lessonPlanData);
            let standardsLength = standardsArray.length;
            let lessonLength = lessonPlanArray.length + standardsArray.length;
            let lessonReflectionArray= Object.entries(lesson.teacherReflection)

            let pdfName = lesson.name;
            var doc = new jsPDF('p' ,'in');
            doc.text(lesson.name, .3, .5);
            doc.setFontSize(10);
            doc.text(`Lesson Taught On: ${formatedDate}`, .3, 1);
            doc.text("Standards:", .3, 1.4);
            for (var i = 0; i < standardsArray.length; i++) {
              doc.text(`${standardsArray[i][0]} : ${standardsArray[i][1]}`, .3, (1.6 + i/3))
            }
            for (var i = 0; i < lessonPlanArray.length; i++) {
              doc.text(`${lessonPlanArray[i][0]}`, .3, ((standardsLength + 1.4) + i/2))
              doc.text(`${lessonPlanArray[i][1]}`, .3, ((standardsLength + 1.6)+ i/2))
            }
            for (var i = 0; i < lessonReflectionArray.length; i++) {
              doc.text(`${lessonReflectionArray[i][0]}`, .3, ((lessonLength +.4) + i/2))
              doc.text(`${lessonReflectionArray[i][1]}`, .3, ((lessonLength +.6) + i/2))
            }
            doc.save(pdfName + '.pdf');
          }
        });
    }
  },
  mounted(){
    this.getLessonTemplates();
    this.getLessonPlans();
    this.getGoals();
    this.getComponents();
  },
  filters:{
    formatDate: function (value) {
      if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
      }
    }
  }
};
</script>


<style scoped>
#plan-history {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 20vw 60vw 20vw;
}

#history-menu {
  grid-row: 3/4;
  grid-column: 1/2;
  background-color: #AFADB3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#history-menu h2 {
  margin: 2rem 0rem .7rem 0rem;
  font-size: 1.4rem;
}

#history-menu form {
  width: 90%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#history-menu select {
  width: 100%;
  height: 2rem;
  margin: .5rem 0rem .5rem 0rem;
}

#lessons {
  width: 90%;
  height: 70%;
  background-color: white;
  margin-top: 1rem;
  overflow: scroll;
}

#lessons-inner {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.lesson-icon {
  width: 4rem;
  height: 4rem;
  margin: .5rem;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

.lesson-icon img{
  width: 80%;
  height: 80%;
}

.lesson-icon small {
  font-size: .5rem;
  width: 100%;
  text-align: center;
}

#lesson-display {
  grid-row: 3/4;
  grid-column: 2/3;
  overflow: scroll;
}

#lesson-display-inner {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-display-inner h1{
  width:  100%;
  height: 6vh;
  text-align: center;
  font-size: 1.8rem;
  padding-top: .6rem;
  border: solid #AFADB3 1px;
}

#lesson-display-inner h2 {
  width:  100%;
  height: 4vh;
  text-align: center;
  font-size: 1rem;
  padding-top: .5rem;
  border: solid #AFADB3 1px;
}

#standards-view {
  width: 100%;
  border: solid #AFADB3 1px;
}

#standards-view h2{
  width: 100%;
  height: 2vh;
  font-size: 1rem;
  border: none;
}

#standards-view ul {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#standards-view li{
  width: 90%;
  margin-left: 2rem;
  list-style: circle;
  border: none;
}

#standards-view h3{
  width: 100%;
  font-size: .8rem;
  margin: .4rem 0rem;
}

#standards-view h4{
  width: 100%;
  font-size: .6rem;
  margin-bottom: .5rem;
}

#components-view {
  width: 100%;
}

#components-view ul {
  width: 100%;
}

#components-view li {
  width: 100%;
  height: 10vh;
  border: solid #AFADB3 1px;
}

#components-view h3 {
  font-size: 1rem;
  padding: .4rem 0rem 0rem 4rem;
  background-color: #AFADB3;
}

#components-view h4 {
  font-size: 1rem;
  text-align: center;
  padding: .3rem .5rem;
}

#lesson-menu {
  grid-row: 3/4;
  grid-column: 3/4;
  background-color: #AFADB3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-menu h2 {
  margin: 2rem .5rem 1rem .5rem;
  font-size: 1.4rem;
  text-align: center;
}

#lesson-menu h3 {
  margin: 1rem .5rem .5rem .5rem;
  font-size: 1.1rem;
  text-align: center;
}
#lesson-menu select{
  width: 70%;
  height: 2rem;
  margin: .5rem .5rem 1rem .5rem;
  border: solid #120832 1px;
}

#lesson-menu button {
  width: 70%;
  height: 3rem;
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#warning {
  font-size: 1.2rem;
  color: white;
  text-align: center;
  padding: .5rem;
}

#lesson-reflection {
  width: 100%;
  border: solid #D09400 3px;
}

#lesson-reflection h5 {
  width:  100%;
  height: 7vh;
  text-align: center;
  color:  #D09400;
  font-size: 1.4rem;
  padding-top: .6rem;
}

#goal-review {
  width: 100%;
  height: 20vh;
  display: grid;
  grid-template-rows: 7vh 13vh;
  grid-template-columns: 50% 50%;
  border-top: solid #D09400 3px;
  border-bottom: solid #D09400 3px;
}

#goal-review  h6{
  width: 100%;
  text-align: center;
  padding: 0rem .5rem;
  font-size: 1.2rem;
}

#goal-review p {
  width: 100%;
  text-align: left;
  padding: 0rem .5rem;
}

#lesson-reflection form {
  width: 100%;
  height: 43vh;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-reflection label {
  width: 90%;
  text-align: left;
  font-size: 1.2rem;
  padding: .8rem 0rem;
}

#lesson-reflection input {
  width: 90%;
  height: 1.5rem;
  font-size: 1rem;
  padding-bottom: .4rem;
  border: solid #AFADB3 1px;
}

#save-reflection {
  width: 30% !important;
  height: 2rem !important;
  color: white;
  font-size: 1.3rem !important;
  margin: 1rem 0rem 1rem 0rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#reflection-confirm {
  font-size: 1.2rem;
  color: #D09400;
  text-align: center;
  padding: .5rem;
}

#lesson-reflection-complete {
  width: 100%;
  border: solid #D09400 3px;
}

#lesson-reflection-complete h5 {
  width:  100%;
  height: 7vh;
  text-align: center;
  color:  #D09400;
  font-size: 1.4rem;
  padding-top: .6rem;
}

#lesson-reflection-complete  h6{
  width: 100%;
  text-align: left;
  padding: .5rem 1rem;
  font-size: 1.2rem;
}

#lesson-reflection-complete p {
  width: 100%;
  text-align: center;
  padding: 1rem 1rem;
}


</style>
