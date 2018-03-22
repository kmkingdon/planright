<template>
    <div class="template-views">
      <h2> Save Your Template </h2>
      <div id="save">
        <form>
          <label for="templateName"> Name Your Template </label>
          <input v-model="names.templateName" type="text" name="templateName"/>
          <button v-on:click.prevent="saveTemplate">Save Template </button>
          <p v-if="saveTemplateConfirm"> Template Saved!</p>
        </form>
      </div>
      <button id="back" v-on:click="changeTemplateStepBack">
        <img  src="../../../static/arrow.png" alt="simple-logo"/>
        <h3>Back</h3>
      </button>
      <router-link id="next" v-if="saveTemplateConfirm" to="/lessonplan">To Lesson Plans</router-link>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SaveTemplate',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'templateStep',
    'names',
    'saveTemplateConfirm',
  ]),
  methods: mapActions([
    'changeTemplateStepBack',
    'saveTemplate',
  ])
};
</script>


<style scoped>
.template-views {
  display: grid;
  grid-template-rows: 8vh 55vh 8vh;
  grid-template-columns: 35vw 35vw;
}

.template-views h2 {
  grid-row: 1/2;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  font-size: 1.7rem;
  font-family: 'Nanum+Myeongjo';
  color:white;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#save {
  grid-row: 2/3;
  grid-column: 1/3;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#save form {
  width: 60%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#save label {
  font-size: 1.4rem;
  margin-bottom: .8rem;
}

#save input {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  margin-bottom: 2rem;
}

#save button {
  width: 50%;
  height: 3rem;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#save p {
  margin-top: 1rem;
  color: #D09400;
}

#back{
  grid-row: 3/4;
  grid-column: 1/2;
  justify-self: center;
  align-self: start;
  height: 50%;
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

#back h3{
  color:#D09400 ;
  font-size: 1.3rem;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#back img {
  height: 60%;
  width: 12%;
  margin-right: .5rem;
}

#next {
  grid-row: 3/4;
  grid-column: 2/3;
  justify-self: center;
  align-self: start;
  height: 50%;
  width: 13vw;
  text-decoration: none;
  background-color:#939097;
  border: solid #120832 1px;
  border-radius: 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  color:#D09400 ;
  text-decoration: none;
  font-size: 1.2rem;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

</style>
