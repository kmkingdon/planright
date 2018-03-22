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
          <p v-if="arrangeConfirm"> Order Saved!</p>
          <button v-on:click="saveOrderFinal" >Save Order</button>
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
  grid-template-rows: 8vh 55vh 8vh;
  grid-template-columns: 35vw 35vw;
}

.template-views h2 {
  grid-row: 1/2;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  font-size: 1.5rem;
  font-family: 'Nanum+Myeongjo';
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
  margin-bottom: .5rem;
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
  width: 12%;
  margin-left: .5rem;
}
</style>
