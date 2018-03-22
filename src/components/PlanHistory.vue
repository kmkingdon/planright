<template>
  <div id="plan-history">
    <Header />
    <Menu />
    <div id="history-menu">
      <h2>Select a Folder:</h2>
      <form>
        <select v-model="selectedFolder" name="templates">
          <option value="">Select a Folder</option>
          <option  v-for="folder in folders" :value="folder">{{folder}}</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

export default {
  name: 'PlanHistory',
  components: {
    Header,
    Menu
  },
  data() {
    return {
      selectedFolder:'',
    };
  },
  computed: mapGetters([
    'folders',
  ]),
  methods: mapActions([
  ]),
  mounted(){
    this.getLessonTemplates();
    this.getLessonPlans();
  }
};
</script>


<style scoped>
#plan-history {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 30vw 70vw;
}

#history-menu {
  grid-row: 3/4;
  grid-column: 1/2;
  background-color: #AFADB3;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#history-menu h2 {
  margin: 2rem 0rem .7rem 0rem;
  font-size: 1.4rem;
}

#history-menu form {
  width: 90%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#history-menu select {
  width: 100%;
  height: 2rem;
  margin: .5rem 0rem .5rem 0rem;
}
</style>
