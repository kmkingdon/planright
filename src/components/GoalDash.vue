<template>
  <div id="goal-dashboard">
    <Header />
    <Menu />
    <div id="goal-menu" class="fadeIn">
      <h2>Make a New Goal:</h2>
      <button v-on:click="newGoal">New Goal</button>
      <h2>Open a Goal:</h2>
      <select v-model="goalData.id" name="goal">
        <option value="">Select a Goal</option>
        <option v-for="goal in goals" :value="goal.id">{{goal.name}}</option>
      </select>
      <h2 v-if="goalData.id > 0">Delete this Goal:</h2>
      <button v-if="goalData.id > 0" v-on:click="deleteGoalModal.show = true">Delete Goal</button>
    </div>
    <div id="goal-display" >
      <div v-if="goalData.id === 0" id="new-goal" class="fadeIn">
        <h1>Make a New Goal:</h1>
        <h2>Select a Component of Your Lesson Plan:</h2>
        <div id="component-select">
          <div id="component-select-inner">
            <div v-on:click="componentSelect"  v-for="component in lessonComponents" v-bind:class="{active:(goalData.component == component.id)}" :id="component.id">
              <h3 :id="component.id">{{component.name}}</h3>
            </div>
          </div>
        </div>
        <h3 v-for="component in lessonComponents" v-if="component.id == goalData.component">Your Goal Will Focus On: {{component.name}}</h3>
        <form v-on:submit.prevent="postGoal">
          <label for="name">What would you like to name this goal?</label>
          <textarea required v-model="goalData.name" type="text" name="name" ></textarea>
          <label for="strengths">What are your strengths with this part of your lesson plan?</label>
          <textarea  required v-model="goalData.strengths" type="text" name="strengths" ></textarea>
          <label for="improve">What would your like to improve in this part of your lesson plan?</label>
          <textarea required v-model="goalData.improve" type="text" name="improve" ></textarea>
          <label for="actions">What are at least two actions that you will take to make this improvement?</label>
          <textarea  required v-model="goalData.actions" type="text" name="actions" ></textarea>
          <input id="save-goal" type="submit" value="Save Goal"/>
        </form>
      </div>
      <div id="goal-view"  class="fadeIn" v-for="goal in goals" v-if="goalData.id === goal.id">
        <h1>{{goal.name}}</h1>
        <h2 v-for="component in lessonComponents" v-if="component.id === goal.componentId"> Your goal focusing on: {{component.name}}</h2>
        <ul>
          <li v-for="(key, value) in goal.goalData">
            <h3>{{value}}</h3>
            <h4>{{key}}</h4>
          </li>
        </ul>
        <div id="final-reflection" class="fadeIn" v-if="goal.goalFinalReflection === ''">
          <h6>Final Reflection</h6>
          <form v-on:submit.prevent="saveFinalReflection">
            <label for="reflection">How have the actions helped you improve this part of your teaching?</label>
            <textarea required v-model="goalData.reflection"  name="reflection"></textarea>
            <input type="submit" name="" value="Save Reflection">
            <p v-if="saveFinalReflectionConfirm">Final Reflection Saved!</p>
          </form>
        </div>
        <div id="final-reflection-complete" v-if="goal.goalFinalReflection !== ''">
          <h6>Final Reflection</h6>
          <p>{{goal.goalFinalReflection}}</p>
        </div>
      </div>
    </div>
    <ModalDeleteGoal v-if="deleteGoalModal.show"  @close="deleteGoalModal.show = false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import ModalDeleteGoal from "@/components/ModalDeleteGoal";


export default {
  name: 'GoalDash',
  components: {
    Header,
    Menu,
    ModalDeleteGoal,
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'lessonComponents',
    'goals',
    'goalData',
    'saveGoalConfirm',
    'saveFinalReflectionConfirm',
    'deleteGoalModal'
  ]),
  methods:{
    ...mapActions([
      'getLessonPlans',
      'getComponents',
      'getGoals',
      'postGoal',
      'saveFinalReflection',
    ]),
    newGoal(){
      this.$store.dispatch('selectGoal');
    },
    componentSelect(event){
      this.$store.dispatch('selectGoalComponent', event);
    }
  },
  mounted(){
    this.getLessonPlans();
    this.getComponents();
    this.getGoals();
  }
};
</script>


<style scoped>
#goal-dashboard {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 30vw 70vw;
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

#goal-menu select {
  width: 60%;
  height: 2rem;
  margin-top: 1rem;
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
  font-size: 1.5rem;
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

#new-goal textarea {
  width: 100%;
  height: 2.5rem;
  font-size: .8rem;
  padding-bottom: .4rem;
  border: solid #AFADB3 1px;
}

#save-goal {
  width: 30%;
  height: 2rem;
  color: white;
  font-size: 1.3rem;
  margin-top: 1rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

p {
  font-size: 1.2rem;
  color: #D09400;
  text-align: center;
  padding: .5rem;
}

#goal-view {
  width: 100%;
  height: 70vh;
}

#goal-view h1{
  width:  100%;
  height: 6vh;
  text-align: center;
  font-size: 1.8rem;
  padding-top: .6rem;
  border: solid #AFADB3 1px;
}

#goal-view h2 {
  width:  100%;
  height: 4vh;
  text-align: center;
  font-size: 1rem;
  border: solid #AFADB3 1px;
}

#goal-view ul {
  width: 100%;
  height: 30vh;
}

#goal-view li {
  box-sizing: border-box;
  width: 100%;
  height: 10vh;
  border: solid #AFADB3 1px;
}

#goal-view h3 {
  font-size: 1rem;
  padding: .4rem 0rem 0rem 4rem;
  background-color: #AFADB3;
}

#goal-view h4 {
  font-size: 1rem;
  text-align: center;
  padding: .3rem .5rem;
}

#final-reflection {
  width: 100%;
  height: 30vh;
  border: solid #AFADB3 1px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#final-reflection h6 {
  font-size: 1.6rem;
  padding-top: .6rem;
  color: #D09400;
}

#final-reflection form {
  width: 90%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#final-reflection label {
  width: 100%;
  text-align: left;
  font-size: 1.2rem;
  padding: .8rem 0rem;
}

#final-reflection textarea {
  width: 100%;
  height: 5vh;
  padding: .8rem 0rem;
}

#final-reflection input {
  width: 40%;
  height: 2rem;
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#final-reflection-complete {
  width: 100%;
  height: 30vh;
  border: solid #AFADB3 1px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#final-reflection-complete h6 {
  font-size: 1.6rem;
  padding-top: .6rem;
  color: #D09400;
}

#final-reflection-complete p {
  font-size: 1.2rem;
  padding: 1rem;
  color: black;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
}

</style>
