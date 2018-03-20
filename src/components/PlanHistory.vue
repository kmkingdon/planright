<template>
  <div id="plan-history">
    <Header />
    <Menu />
    <div id="current-view">
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
    };
  },
  computed: mapGetters([
  ]),
  methods: mapActions([
  ])
};
</script>


<style scoped>
#plan-history {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 10vw 20vw 20vw 20vw 20vw 10vw;
}


#current-view {
  grid-row: 3/4;
  grid-column: 1/end;

}
</style>
