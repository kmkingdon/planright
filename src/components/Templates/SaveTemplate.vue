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
      <img v-on:click="restartTemplate" id="restart" src="../../../static/restart.png" alt="restart"/>
      <router-link id="next" v-if="saveTemplateConfirm" to="/lessonplan">
        To Lesson Plans
        <img src="../../../static/arrowright.png" alt="simple-logo"/>
      </router-link>
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
    'restartTemplate',
  ])
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
#next {
  grid-row: 1/2;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  height: 30%;
  width: 15vw;
  text-decoration: none;
  color: #D09400;
  font-size: 1.2rem;
  background-color:#495669;
  border: solid #120832 1px;
  border-radius: 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

#next img {
  height: 60%;
  width: 15%;
  margin-left: .5rem;
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

#save {
  grid-row: 2/3;
  grid-column: 1/4;
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
  margin-bottom: 2rem;
}

#save p {
  margin-top: -1rem;
  height: 1rem;
  color: #D09400;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

</style>
