<template>
    <div class="template-views">
      <h2> Arrange Your Components In Order: </h2>
      <div id="arrange">
        <draggable id="drag-container"   @start="drag=true" @end="saveOrder">
         <div id="drag-box" v-for="element in arrangeComponentArray" :key="element.id">
            <h3>{{element.name}}</h3>
         </div>
        </draggable>
        <div id="save">
          <button v-on:click="saveOrderFinal" >Save Order</button>
          <p v-if="arrangeConfirm"> Order Saved!</p>
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
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Arrange',
  components: {
    draggable,
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'templateStep',
    'arrangeComponentArray',
    'arrangeConfirm',
  ]),
  methods: {
  ...mapActions([
    'changeTemplateStepBack',
    'changeTemplateStepNext',
    'arrangeComponentList',
    'saveOrderFinal',
    'restartTemplate',
  ]),
    saveOrder(evt) {
      this.$store.commit({
        type: 'saveOrder',
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex,
    });
  },
  },
  mounted(){
    this.arrangeComponentList();
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

#arrange {
  grid-row: 2/3;
  grid-column: 1/4;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 30% 40% 30%;
}

#key {
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#key img {
  width: 60%;
  height: 80%;
}

#save {
  grid-row: 1/2;
  grid-column: 3/4;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: center;

}

#save button {
  width: 70%;
  height: 3rem;
  color: white;
  font-size: 1.3rem;
  text-decoration: none;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
  margin-bottom: 3rem;
}

#save p {
  color: #D09400;
  height: 1rem;
  margin-top: -2rem;
  padding-bottom: 2rem;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#drag-container{
  grid-row: 1/2;
  grid-column: 2/3;
  width: 100%;
  height: 95%;
  overflow: scroll;
}


#drag-box {
  width: 100%;
  height: 2.5rem;
  border: solid black 1px;
  border-radius: 10px;
  margin: .5rem 0rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #120832;
}

#drag-box h3{
  font-size: 1.2rem;
  color: white;
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

  #save button {
    width: 90%;
    height: 1.7rem;
    font-size: 1rem;
    margin-bottom: 13rem;
  }

  #save p {
    margin-top: -13rem;
    padding-bottom: 13rem;
  }
}

</style>
