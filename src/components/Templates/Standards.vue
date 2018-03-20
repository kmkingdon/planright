<template>
    <div class="template-views">
      <h2> Pick Your Standards: </h2>
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
    'templateStep'
  ]),
  methods: mapActions([
    'changeTemplateStepNext',
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
  font-size: 1.5rem;
  font-family: Barlow;
  color:white;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
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
