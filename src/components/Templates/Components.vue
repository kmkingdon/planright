<template>
    <div class="template-views">
      <h2> Components </h2>
      <div id="components">
        <ul>
          <li v-for="component in lessonComponents">
            <input class="checkbox" type="checkbox" :value="component.id" v-model="selectedComponents"/>
            <h3>{{component.name}}</h3>
            <select v-if="selectedComponents.includes(component.id)" :id="component.id" class="input" name="htmlType" v-model="htmlTypes" >
              <option value="">Select Input </option>
              <option value="const">Permanent Fill</option>
              <option value="text">Text Box</option>
              <option value="select">Drop Down Menu</option>
            </select>
          </li>
        </ul>
      </div>
      <button id="back" v-on:click="changeTemplateStepBack">
        <img  src="../../../static/arrow.png" alt="simple-logo"/>
        <h3>Back</h3>
      </button>
      <button id="next" v-on:click="changeTemplateStepNext">
        <h3>Next</h3>
        <img  src="../../../static/arrowright.png" alt="simple-logo"/>
      </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Components',
  components: {
  },
  data() {
    return {
      selectedComponents:[],
      htmlTypes:{
        const: [],
      }
    };
  },
  computed: mapGetters([
    'templateStep',
    'lessonComponents',
  ]),
  methods: mapActions([
    'changeTemplateStepBack',
    'changeTemplateStepNext',
    'getComponents'
  ]),
  mounted(){
    this.getComponents();
  }
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

#components{
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  flex-flow: row wrap;
}

#components ul {
  display: flex;
  flex-flow: row wrap;
}

#components li {
  display: flex;
  flex-flow: row;
  width: 32%;
  height: 1.7rem;
  margin: .3rem;
}

#components h3 {
  width: 45%;
  margin-left: .5rem;
  margin-bottom: .5rem;
  font-size: 1rem;
}

.checkbox {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: .5rem;
}

.input {
  width: 35%;
  height: 1.5rem;
}

#next{
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

#back{
  grid-row: 3/4;
  grid-column: 1/2;
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

#next h3{
  color:#D09400 ;
  font-size: 1.3rem;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}
#back h3{
  color:#D09400 ;
  font-size: 1.3rem;
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

#back img {
  height: 60%;
  width: 15%;
  margin-right: .5rem;
}

</style>
