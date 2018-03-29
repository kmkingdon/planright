<template>
    <div id="menu">
      <router-link to="/template">Design A Template</router-link>
      <router-link to="/lessonplan">Make/Edit Lesson Plans</router-link>
      <router-link to="/planhistory">Lesson Plan History</router-link>
      <router-link to="/goaldash">Goals and Reflections</router-link>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Menu',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
  ]),
  methods: mapActions([
  ])
};
</script>


<style scoped>


#menu {
  grid-row: 2/3;
  grid-column: 1/end;
  background-color: #939097;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
}

#menu a {
  height: 60%;
  width: 16vw;
  color: white;
  font-size: 1.3rem;
  text-decoration: none;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  #menu {
    grid-column: 1/2;
  }
  #menu a {
    height: 30%;
    width: 45%;
    font-size: 1rem;
  }
}

</style>
