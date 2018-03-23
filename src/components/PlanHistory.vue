<template>
  <div id="plan-history">
    <Header />
    <Menu />
    <div id="history-menu">
      <h2>Select a Folder:</h2>
      <form>
        <select v-model="selectedFolder" name="templates">
          <option value="">Select a Folder</option>
          <option  v-for="folder in folders" :value="folder">{{folder}}</option>
        </select>
      </form>
      <div id="lessons">
        <div id="lessons-inner">
          <div v-for="lesson in lessonPlans" v-if="lesson.fileName === selectedFolder" class="lesson-icon">
            <img v-on:click="selectLesson" :id="lesson.id" src="../../static/lesson.png" alt="lessonicon"/>
            <small>{{lesson.name}}</small>
          </div>
        </div>
      </div>
    </div>
    <div id="lesson-display">
      <div v-for="lesson in lessonPlans" v-if="lesson.id == selectedLesson" id="lesson-display-inner">
        <h1>{{lesson.name}}</h1>
        <h6>Date Taught:{{lesson.dateTaught.split("T")[0]}}</h6>
        <ul>
          <li v-for="(value, key) in lesson.lessonPlanData">
            <h3>{{key}}</h3>
            <h4>{{value}}</h4>
          </li>
        </ul>
      </div>
    </div>
    <div id="lesson-menu">
      <h2>Export as PDF:</h2>
      <button v-on:click.prevent="createPDF" >Export Now</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import jsPDF from 'jsPDF';

export default {
  name: 'PlanHistory',
  components: {
    Header,
    Menu
  },
  data() {
    return {
      selectedFolder:'',
      selectedLesson:0,
    };
  },
  computed: mapGetters([
    'folders',
    'lessonPlans',
  ]),
  methods:{
    ...mapActions([
      'getLessonTemplates',
      'getLessonPlans'
    ]),
    selectLesson(event){
      this.selectedLesson = event.target.id;
    },
    createPDF () {
      this.lessonPlans.forEach(lesson => {
        if(lesson.id == this.selectedLesson) {
            let pdfName = lesson.name;
            var doc = new jsPDF();
            doc.text(lesson.name, 20, 50);
            doc.save(pdfName + '.pdf');
          }
        });
    }
  },
  mounted(){
    this.getLessonTemplates();
    this.getLessonPlans();
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

#lesson-display-inner h6 {
  width:  100%;
  height: 4vh;
  text-align: center;
  font-size: 1rem;
  border: solid #AFADB3 1px;
}

#lesson-display-inner ul {
  width: 100%;
  height: 60vh;
}

#lesson-display-inner li {
  width: 100%;
  height: 10vh;
  border: solid #AFADB3 1px;
}

#lesson-display-inner h3 {
  font-size: 1rem;
  padding: .4rem 0rem 0rem 4rem;
  background-color: #AFADB3;
}

#lesson-display-inner h4 {
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
  margin: 2rem 0rem .7rem 0rem;
  font-size: 1.4rem;
}

#lesson-menu button {
  width: 60%;
  height: 2rem;
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}


</style>
