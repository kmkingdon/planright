<template>
    <div class="template-views">
      <h2> Arrange Your Components In Order: </h2>
      <div id="arrange">
        <div id="key">
          <img src="../../../static/key.png" alt="key"/>
        </div>
        <draggable id="drag-container" v-model="arrangeComponentArray"  @start="drag=true" @end="saveOrder">
         <div id="drag-box" v-for="element in arrangeComponentArray" :key="element.id">
            <h3>{{element.name}}</h3>
         </div>
        </draggable>
        <div id="save">
          <button v-on:click="saveOrderFinal" >Save Order</button>
          <p v-if="arrangeConfirm"> Order Saved!</p>
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

#arrange {
  grid-row: 2/3;
  grid-column: 1/3;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20% 60% 20%;
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
  width: 80%;
  height: 80%;
}

#save {
  grid-row: 1/2;
  grid-column: 3/4;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#save button {
  width: 90%;
  height: 3rem;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
}

#save p {
  margin-top: 1rem;
  color: #D09400;
}

#drag-container{
  grid-row: 1/2;
  grid-column: 2/3;
  width: 100%;
  height: 95%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #AFADB3;
  overflow: scroll;
}


#drag-box {
  width: 60%;
  height: 2.5rem;
  border: solid black 1px;
  border-radius: 10px;
  margin: .5rem 0rem;
  text-align: center;
  background-color: #120832;
}

#drag-box h3{
  font-size: 1.2rem;
  color: white;
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
