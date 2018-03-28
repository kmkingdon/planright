<template>
  <div id="dashboard">
    <Header />
    <Menu />
    <div id="current-view" class="fadeInSlow">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

export default {
  name: 'Dashboard',
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
#dashboard {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 10vw 20vw 20vw 20vw 20vw 10vw;
}


#current-view {
  grid-row: 3/4;
  grid-column: 1/end;
  background-image: url("../../static/dashboard.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeInSlow {
  animation-name: fadeIn;
  animation-duration: 8s;
}
</style>
