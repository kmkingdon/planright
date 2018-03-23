<template>
  <div id="goal-dashboard">
    <Header />
    <Menu />
    <div id="goal-menu">
      <h2>Make a New Goal</h2>
      <button v-on:click="newGoal">New Goal</button>
    </div>
    <div id="goal-display">
      <div v-if="goalSelected === 0" id="new-goal">
        <h1>Make a New Goal:</h1>
        <h2>Select a Component of Your Lesson Plan:</h2>
        <div id="component-select">
          <div id="component-select-inner">
            <div v-on:click="componentSelect"  v-for="component in lessonComponents" v-bind:class="{active:(componentSelected == component.id)}" :id="component.id">
              <h3 :id="component.id">{{component.name}}</h3>
            </div>
          </div>
        </div>
        <h3 v-for="component in lessonComponents" v-if="component.id == componentSelected">Your Goal Will Focus On: {{component.name}}</h3>
        <form>
          <label for="strengths">What are your strengths with this part of your lesson plan?</label>
          <input type="text" name="strengths" value="">
          <label for="improve">What would your like to improve in this part of your lesson plan?</label>
          <input type="text" name="improve" value="">
          <label for="actions">What are at least two actions that you will take to make this improvement?</label>
          <input type="text" name="actions" value="">
          <input id="save-goal" type="submit" value="Save Goal"/>
        </form>
      </div>
    </div>
    <div id="reflection-menu">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

export default {
  name: 'GoalDash',
  components: {
    Header,
    Menu
  },
  data() {
    return {
      goalSelected: NaN,
      componentSelected: 0,
    };
  },
  computed: mapGetters([
    'lessonComponents'
  ]),
  methods:{
    ...mapActions([
      'getLessonPlans',
      'getComponents',
    ]),
    newGoal(){
      this.goalSelected = 0;
    },
    componentSelect(event){
      console.log(event.target)
      this.componentSelected = event.target.id;
    }
  },
  mounted(){
    this.getLessonPlans();
    this.getComponents();
  }
};
</script>


<style scoped>
#goal-dashboard {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 20vw 60vw 20vw;
}

#goal-menu {
  grid-row: 3/4;
  grid-column: 1/2;
  background-color: #AFADB3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#goal-menu h2 {
  margin: 2rem 0rem .7rem 0rem;
  font-size: 1.4rem;
}

#goal-menu button {
  width: 60%;
  height: 2rem;
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#goal-display {
  grid-row: 3/4;
  grid-column: 2/3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#new-goal {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#new-goal h1 {
  width: 100%;
  height: 3vh;
  font-size: 1.2rem;
  margin-top: .8rem;
  text-align: center;
}

#new-goal h2 {
  width: 100%;
  height: 3vh;
  font-size: 1.2rem;
  margin-top: .8rem;
  text-align: center;
}

#component-select {
  width: 100%;
  height: 10vh;
  overflow-y: scroll;
}

#component-select-inner {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
}

#component-select div {
  width: 12vw;
  height: 8vh;
  border: solid #120832 1px;
  background-color: #120832;
  border-radius: 5px;
  margin: .5rem;
  cursor: pointer;
}

#component-select div h3 {
  width: 12vw;
  text-align: center;
  margin-top: .7rem;
  color: white;
}

#new-goal h3 {
  width: 100%;
  text-align: center;
}

.active {
  border: solid #D09400 1px !important;
  background-color: #D09400 !important;
}

#new-goal form {
  width: 90%;
  margin-top: 1.5rem;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#new-goal label {
  width: 100%;
  text-align: left;
  font-size: 1.2rem;
  padding: .8rem 0rem;
}

#new-goal input {
  width: 100%;
  height: 1.5rem;
  font-size: 1rem;
  padding-bottom: .8rem;
  border: solid #AFADB3 1px;
}

#save-goal {
  width: 30% !important;
  height: 2.7rem !important;
  color: white;
  font-size: 1.3rem !important;
  margin-top: 1.5rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#reflection-menu {
  grid-row: 3/4;
  grid-column: 3/4;
  background-color: #AFADB3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
