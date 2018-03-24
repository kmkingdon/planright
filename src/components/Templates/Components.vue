<template>
    <div class="template-views">
      <h2> Pick Your Components: </h2>
      <div id="components">
        <ul>
          <li v-for="component in lessonComponents">
            <input class="checkbox" type="checkbox" :value="component.id" v-model="selectedComponents"/>
            <h3>{{component.name}}</h3>
            <select v-on:change.prevent="saveChange" v-if="selectedComponents.includes(component.id)" :id="component.id" class="input" name="htmlType" >
              <option value="">Select Input </option>
              <option value="const">Permanent Fill</option>
              <option value="text">Text Box</option>
              <option value="select">Drop Down Menu</option>
            </select>
          </li>
        </ul>
        <div v-on:click="addModal.show = true" id="add-component">
          <h4>+</h4>
        </div>
      </div>
      <img v-on:click="restartTemplate" id="restart" src="../../../static/restart.png" alt="restart"/>
      <button id="next" v-on:click="changeTemplateStepNext">
        <h3>Next</h3>
        <img  src="../../../static/arrowright.png" alt="simple-logo"/>
      </button>
      <ModalAdd v-if="addModal.show" @close="addModal.show = false" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalAdd from '@/components/Templates/ModalAdd';

export default {
  name: 'Components',
  components: {
    ModalAdd,
  },
  data() {
    return {
      selectedComponents:[],
      htmlTypes:{
        const: [],
      },
    };
  },
  computed: mapGetters([
    'templateStep',
    'lessonComponents',
    'selectedComponentsList',
    'addModal',
  ]),
  methods: {
  ...mapActions([
    'changeTemplateStepBack',
    'changeTemplateStepNext',
    'getComponents',
    'restartTemplate',
  ]),
    saveChange(event){
      this.$store.dispatch('saveSelectedComponents', event)
    }
  },
  mounted(){
    this.getComponents();
  }
};
</script>


<style scoped>
.template-views {
  display: grid;
  grid-template-rows: 15vh 55vh;
  grid-template-columns: 10vw 40vw 20vw;
}

#restart {
  grid-row: 1/2;
  grid-column: 1/2;
  height: 60%;
  justify-self: center;
  align-self: center;
  cursor: pointer;
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

#components{
  grid-row: 2/3;
  grid-column: 1/4;
  display: grid;
  grid-template-rows: 45vh 10vh;
  grid-template-columns: 65vw 5vw;
}

#components ul {
  grid-row: 1/3;
  grid-column: 1/3;
  display: flex;
  flex-flow: row wrap;
  margin-left: 1rem;
}

#components li {
  display: flex;
  flex-flow: row;
  width: 32%;
  height: 1.7rem;
  margin: .3rem;
}

#components h3 {
  width: 50%;
  margin-left: .5rem;
  margin-bottom: .5rem;
  font-size: 1.1rem;
}

.checkbox {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: .5rem;
  border: solid black 1px;
  background-color: #D09400;
}

.input {
  width: 30%;
  height: 1.5rem;
}

#add-component {
  grid-row: 2/3;
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
  width: 2rem;
  height: 2rem;
  background-color:#495669;
  border: solid #120832 1px;
  border-radius: 3px;
  cursor: pointer;
}

#add-component h4{
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  font-size: 1.7rem;
}

</style>
