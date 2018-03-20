<template>
    <div class="template-views">
      <h2> Pick Your Standards: </h2>
      <div id="standards">
        <form>
          <label for="standardsSet"> Pick a Standards Set </label>
          <select v-model="standardsSelected.standardsSet" name="standardsSet">
            <option value="">Select a Standards Set</option>
            <option value="CommonCoreEnglish">Common Core English</option>
            <option value="CommonCoreMath">Common Core Math</option>
            <option value="NextGenerationScience">Next Generation Science Standards</option>
          </select>
          <label for="gradeLevel"> Pick a Grade Level</label>
          <select v-model="standardsSelected.gradeLevel" name="gradeLevel">
            <option value="">Select a Grade Level</option>
            <option value="1">First Grade</option>
            <option value="2">Second Grade</option>
            <option value="3">Third Grade</option>
            <option value="4">Fourth Grade</option>
            <option value="5">Fifth Grade</option>
            <option value="6-7-8">Middle School (6, 7, 8)</option>
            <option value="9-10-11-12">High School</option>
          </select>
        </form>
      </div>
      <button id="next" v-on:click="changeTemplateStepNext">
        <h3>Next</h3>
        <img src="../../../static/arrowright.png" alt="simple-logo"/>
      </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Standards',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'templateStep',
    'standardsSelected'
  ]),
  methods: mapActions([
    'changeTemplateStepNext',
    'searchStandards',
  ]),
};
</script>

<style scoped>
.template-views {
  display: grid;
  grid-template-rows: 5vh 55vh 10vh;
  grid-template-columns: 35vw 35vw;
}

.template-views h2 {
  grid-row: 1/2;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  font-size: 1.5rem;
  font-family: Barlow;
  color:white;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#standards {
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#standards form {
  width: 60%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#standards label {
  font-size: 1.2rem;
  margin-bottom: .8rem;
}

#standards select {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  margin-bottom: 2rem;
}

#next {
  grid-row: 3/4;
  grid-column: 2/3;
  justify-self: center;
  align-self: start;
  height: 40%;
  width: 13vw;
  text-decoration: none;
  background-color:#939097;
  border: solid #120832 1px;
  border-radius: 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

#next h3 {
  color:#D09400 ;
  font-size: 1.2rem;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}
#next img {
  height: 60%;
  width: 15%;
  margin-left: .5rem;
}
</style>
