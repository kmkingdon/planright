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
      <form>
        <label for="folder">What folder should the plan go in?</label>
        <select required name="folder">
          <option value="">Select a Folder</option>
          <option  v-for="folder in folders" :value="folder">{{folder}}</option>
        </select>
        <div id="newFolder">
          <h3>Make a New Folder</h3>
          <form>
            <input type="text" v-model="folderName" name="folder"/>
            <input id="add" type="submit" name="Add" v-on:click.prevent="addFolder"/>
          </form>
        </div>
        <label for="lessonName">What is the name of your lesson plan?</label>
        <input type="text" name="lessonName">
        <button name="button"> Save Lesson Plan</button>
        <p v-if="saveLessonConfirm"> Lesson Saved!</p>
      </form>
    </div>
    <div id="lesson-plan-template">
      <h1 v-for="template in lessonTemplates" v-if="template.id === templateId">{{template.name}}</h1>
      <div id="template" v-for="template in lessonTemplates" v-if="template.id === templateId" v-html="template.lessonTemplateString">
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
      folderName: '',
      templateId : 0,
    };
  },
  computed: mapGetters([
    'lessonTemplates',
    'lessonPlans',
    'folders',
    'saveLessonConfirm',
  ]),
  methods:{
    ...mapActions([
    'getLessonTemplates',
    'getLessonPlans',
    'addFolder',
  ]),
    addFolder(){
      console.log(this.folderName)
    this.$store.dispatch('addFolder', this.folderData)
    }
  },
  mounted(){
    this.getLessonTemplates();
    this.getLessonPlans();
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

#lesson-plan-menu button {
  width: 70%;
  height: 3rem;
  color: white;
  font-size: 1.3rem;
  margin-top: 2rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
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
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#lesson-plan-template h1 {
  margin: 1rem 0rem;
  font-size: 1.4rem;
}

#template {
  width: 100%;
  height: 90%;
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

#template >>> textarea {
  width: 90%;
  height: 2rem;
  margin: .5rem 0rem .5rem 1rem;
}
#template >>> select {
  width: 90%;
  height: 2rem;
  margin: .5rem 0rem .5rem 1rem;
}
#template >>> h1 {
  width: 90%;
  height: 2rem;
  border: solid black 1px;
  text-align: center;
  font-size: 1.2rem;
}

</style>
