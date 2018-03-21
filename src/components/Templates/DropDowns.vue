<template>
    <div class="template-views">
      <h2> Customize Template Components</h2>
      <div id="customize">
        <div id="const">
          <h3> Type Your Text for your Permanent Fill Components </h3>
          <ul>
            <li v-for="item in arrangeComponentArray" v-if="item.htmlType === 'const'">
              <h4 >{{item.name}}</h4>
              <input type="text" />
            </li>
          </ul>
        </div>
        <div id="select">
          <h3> Type Your Options for your Drop Downs </h3>
          <small>(separate with commas)</small>
          <ul>
            <li v-for="item in arrangeComponentArray" v-if="item.htmlType === 'select'">
              <h4 >{{item.name}}</h4>
              <input type="text" />
            </li>
          </ul>
        </div>
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
  name: 'DropDowns',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'templateStep',
    'arrangeComponentArray',
  ]),
  methods: mapActions([
    'changeTemplateStepBack',
    'changeTemplateStepNext',
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
  color: white;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#customize {
  grid-row: 2/3;
  grid-column: 1/3;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 50% 50%;
}

#const {
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#select {
  grid-row: 1/2;
  grid-column: 2/3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#customize h3 {
  width: 75%;
  font-size: 1.3rem;
  text-align: center;
  margin: 1rem 0rem;
}

#customize ul {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#customize li {
  width: 75%;
  height: 3rem;
  border: solid black 1px;
  margin: .5rem 0rem;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#customize input {
  width: 90%;
  margin-top: .4rem;
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
