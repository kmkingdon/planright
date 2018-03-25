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
            <option value="6">Sixth Grade</option>
            <option value="7">Seventh Grade</option>
            <option value="8">Eighth Grade</option>
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
  grid-template-rows: 15vh 55vh;
  grid-template-columns: 10vw 40vw 20vw;
}

.template-views h2 {
  grid-row: 1/2;
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
  font-size: 2.2rem;
  font-family: 'Nanum+Myeongjo';
  color: #495669;
  font-weight: bold;
}

#next {
  grid-row: 1/2;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  height: 30%;
  width: 13vw;
  text-decoration: none;
  background-color:#495669;
  border: solid #120832 1px;
  border-radius: 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

#next h3 {
  color: #D09400;
  font-size: 1.2rem;
}
#next img {
  height: 60%;
  width: 15%;
  margin-left: .5rem;
}

#standards {
  grid-row: 2/3;
  grid-column: 1/4;
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
  font-size: 1.4rem;
  margin-bottom: .8rem;
}

#standards select {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  margin-bottom: 2rem;
}




</style>
