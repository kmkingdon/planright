<template>
  <header>
    <img id="logo" src="../../static/planrightlogo.png" alt="simple-logo"/>
    <div v-if="settingsView" id="setting-menu">
      <h1>Welcome {{userName}}</h1>
      <h2> Account Settings </h2>
      <h3 v-on:click="modaledit.show = true"> Change Avatar </h3>
      <h4> Add Coach </h4>
      <h5 v-on:click="logout"> Logout </h5>
    </div>
    <div v-if="userData.userId !== 0" id="account-info">
      <img @click="openSettings" id="settings" src="../../static/arrow.png" alt="simple-logo"/>
      <img id="avatar" :src="userData.avatar" alt="simple-logo"/>
    </div>
    <ModalEditAccount v-if="modaledit.show"  @close="modaledit.show = false" />
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalEditAccount from "@/components/ModalEditAccount";
import decode from 'jwt-decode';

export default {
  name: 'Header',
  components: {
    ModalEditAccount
  },
  data() {
    return {
      userName : '',
    };
  },
  computed: mapGetters([
    'userData',
    'settingsView',
    'modaledit'
  ]),
  methods:{
    ...mapActions([
      'openSettings',
      'logout',
    ]),
    getTokenInfo() {
      let token = localStorage.getItem('token');
      let decodedToken= decode(token);
      this.userName = decodedToken.userName;
    }
  },
  mounted(){
    this.getTokenInfo();
  }
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
  grid-template-rows: 20% 30% 50%;
  grid-template-columns: 33% 33% 33%;
}

#setting-menu h1 {
  grid-row: 1/2;
  grid-column: 1/end;
  justify-self: center;
  align-self: center;
  font-size: 1.5rem;
  font-family: 'Nanum+Myeongjo';
  color: #D09400;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
  font-weight: bold;
  margin-top: .3rem;
}

#setting-menu h2 {
  grid-row: 2/3;
  grid-column: 1/end;
  font-family: 'Nanum+Myeongjo';
  color: #120832;
  justify-self: center;
  align-self: end;
  font-size: 1.3rem;
}

#setting-menu h3 {
  grid-row: 3/4;
  grid-column: 1/2;
  justify-self: center;
  align-self: center;
  color: white;
  cursor: pointer;
}

#setting-menu h4 {
  grid-row: 3/4;
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
  color: white;
  cursor: pointer;
}

#setting-menu h5 {
  grid-row: 3/4;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  color: white;
  cursor: pointer;
}


</style>
