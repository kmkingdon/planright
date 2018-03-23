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
        <h2>{{lesson.name}}</h2>
        <h2> Date Taught: {{lesson.dateTaught.split("T")[0]}}</h2>
        <ul>
          <li v-for="(value, key) in lesson.lessonPlanData">
            <h3>{{key}}</h3>
            <h3>{{value}}</h3>
          </li>
        </ul>
      </div>
    </div>
    <div id="lesson-menu">
      <h2>Export as PDF:</h2>
      <button>Export Now</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

export default {
  name: 'PlanHistory',
  components: {
    Header,
    Menu
  },
  data() {
    return {
      selectedFolder:'',
      selectedLesson: 0,
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
