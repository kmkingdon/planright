<template>
    <div class="template-views">
      <h2> Save Your Template </h2>
      <div id="save">
        <form>
          <label for="templateName"> Name Your Template </label>
          <input v-model="templateName" type="text" name="templateName"/>
          <button>Save Template </button>
          <p v-if="saveTemplateConfirm"> Template Saved!</p>
        </form>
      </div>
      <button id="back" v-on:click="changeTemplateStepBack">
        <img  src="../../../static/arrow.png" alt="simple-logo"/>
        <h3>Back</h3>
      </button>
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
      templateName: '',
    };
  },
  computed: mapGetters([
    'templateStep',
    'templateName',
    'saveTemplateConfirm',
  ]),
  methods: mapActions([
    'changeTemplateStepBack',
  ])
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
  font-size: 1.7rem;
  font-family: Barlow;
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
  font-size: 1.2rem;
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
  width: 15%;
  margin-right: .5rem;
}

</style>
