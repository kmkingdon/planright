<template>
    <div class="template-views">
      <h2> Customize Template Components</h2>
      <div id="customize">
        <div id="const">
          <h3> Type Your Text for your Permanent Fill Components </h3>
          <ul>
            <li v-for="item in arrangeComponentArray" v-if="item.htmlType === 'const'">
              <h4 >{{item.name}}</h4>
              <input type="text" v-model="item.customization"/>
            </li>
          </ul>
        </div>
        <div id="select">
          <h3> Type Your Options for your Drop Downs </h3>
          <small>(separate with commas)</small>
          <ul>
            <li v-for="item in arrangeComponentArray" v-if="item.htmlType === 'select'">
              <h4 >{{item.name}}</h4>
              <input type="text" v-model="item.customization"/>
            </li>
          </ul>
        </div>
      </div>
      <img v-on:click="restartTemplate" id="restart" src="../../../static/restart.png" alt="restart"/>
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
    'restartTemplate',
  ]),
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

#customize {
  grid-row: 2/3;
  grid-column: 1/4;
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
  overflow:scroll;
}

#select {
  grid-row: 1/2;
  grid-column: 2/3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  overflow:scroll;
}

#customize h3 {
  width: 75%;
  font-size: 1.3rem;
  text-align: center;
  margin: 1rem 0rem 1rem 0rem;
}

#customize small {
  width: 75%;
  font-size: 1rem;
  text-align: center;
  margin: -1rem 0rem 1.1rem 0rem;
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

@media only screen and (max-width: 600px) {
  #restart {
    height: 40%;
  }

  .template-views {
    grid-template-rows: 15vh 75vh;
    grid-template-columns: 20vw 60vw 20vw;
  }

  .template-views h2 {
    font-size: 1.2rem;
  }

  #next {
    width: 15vw;
  }

  #next h3 {
    font-size: .8rem;
  }
  #next img {
    width: 20%;
  }

  #customize h3 {
    width: 90%;
    font-size: 1rem;
  }

  #customize small {
    width: 90%;
    font-size: .6rem;
  }

  #customize ul {
    width: 100%;
    overflow: scroll;
  }

  #customize li {
    width: 90%;
  }

  #customize input {
    border: solid black 1px;
    width: 90%;
  }
}

</style>
