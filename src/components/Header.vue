<template>
  <header>
    <img id="logo" src="../../static/planrightlogo.png" alt="simple-logo"/>
    <div v-if="settingsView" id="setting-menu">
      <h2> Account Settings </h2>
      <h3> Edit Account </h3>
      <h4> Add Coach </h4>
      <h5> Another Option </h5>
      <h6> Another Option </h6>
    </div>
    <div v-if="authorized" id="account-info">
      <img @click="openSettings" id="settings" src="../../static/arrow.png" alt="simple-logo"/>
      <img id="avatar" src="../../static/avatar.jpg" alt="simple-logo"/>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
    };
  },
  computed: mapGetters([
    'authorized', 'settingsView'
  ]),
  methods: mapActions([
    'openSettings'
  ])
};
</script>


<style scoped>
header{
  grid-row: 1/2;
  grid-column: 1/end;
  background-color: #495669;
  display: grid;
  grid-template-rows: 20vh;
  grid-template-columns: 20vw 60vw 20vw;
}

#logo {
  grid-row: 1/2;
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
  height: 90%;
  -webkit-filter: drop-shadow(1px 1px 0 #AFADB3)
                  drop-shadow(-1px -1px 0 #AFADB3);
  filter: drop-shadow(1px 1px 0 #AFADB3)
          drop-shadow(-1px -1px 0 #AFADB3);
}

#account-info {
  grid-row: 1/2;
  grid-column: 3/4;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  padding-left: .5rem;
  align-items: center;
}

#avatar {
  height: 60%;
  -webkit-filter: drop-shadow(1px 1px 0 #D09400)
                  drop-shadow(-1px -1px 0 #D09400);
  filter: drop-shadow(1px 1px 0 #D09400)
          drop-shadow(-1px -1px 0 #D09400);
}

#settings {
  margin-right: 1rem;
  height: 30%;
  cursor: pointer;
}

#setting-menu {
  grid-row: 1/2;
  grid-column: 2/3;
  width: 60%;
  height: 80%;
  background-color: #939097;
  justify-self: end;
  align-self: center;
  border: solid black 1px;
  display: grid;
  grid-template-rows: 30% 35% 35%;
  grid-template-columns: 50% 50%;
}

#setting-menu h2 {
  grid-row: 1/2;
  grid-column: 1/end;
  font-family: 'Nanum+Myeongjo';
  color: white;
  justify-self: center;
  align-self: center;
  font-size: 1.4rem;
  font-weight: bold;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#setting-menu h3 {
  grid-row: 2/3;
  grid-column: 1/2;
  justify-self: start;
  align-self: center;
  margin-left: 2rem;
  color: #120832;
}

#setting-menu h4 {
  grid-row: 3/4;
  grid-column: 1/2;
  justify-self: start;
  align-self: center;
  margin-left: 2rem;
  color: #120832;
}

#setting-menu h5 {
  grid-row: 2/3;
  grid-column: 2/3;
  justify-self: start;
  align-self: center;
  margin-left: 2rem;
  color: #120832;
}

#setting-menu h6 {
  grid-row: 3/4;
  grid-column: 2/3;
  justify-self: start;
  align-self: center;
  margin-left: 2rem;
  color: #120832;
}


</style>
