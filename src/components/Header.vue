<template>
  <header>
    <router-link id="logo" to="/dashboard"><img  src="../../static/planrightlogo.png" alt="simple-logo"/></router-link>
    <div v-if="settingsView" id="setting-menu" class="slideInRight">
      <h1>Welcome {{userName}}</h1>
      <h2> Account Settings </h2>
      <h3 v-on:click="modaledit.show = true"> Change Avatar </h3>
      <h4> Add Coach </h4>
      <h5 v-on:click="logout"> Logout </h5>
    </div>
    <div v-if="userData.userId === 0" id="hook" class="slideInRightSlow">
      <h1>Lesson Planning Made Easy</h1>
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
      'getUserPreferences'
    ]),
    getTokenInfo() {
      let token = localStorage.getItem('token');
      let decodedToken= decode(token);
      this.userName = decodedToken.userName;
    }
  },
  mounted(){
    this.getTokenInfo();
    this.getUserPreferences();
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
}

#logo img {
  height: 18vh;
  -webkit-filter: drop-shadow(1px 1px 0 #AFADB3)
                  drop-shadow(-1px -1px 0 #AFADB3);
  filter: drop-shadow(1px 1px 0 #AFADB3)
          drop-shadow(-1px -1px 0 #AFADB3);
}

#account-info {
  grid-row: 1/2;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

#hook {
  grid-row: 1/2;
  grid-column: 2/4;
  justify-self: start;
  align-self: center;
  color: white;
  font-size: 4rem;
  font-family: 'Nanum+Myeongjo';
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;

}

#avatar {
  height: 15vh;
  -webkit-filter: drop-shadow(1px 1px 0 #D09400)
                  drop-shadow(-1px -1px 0 #D09400);
  filter: drop-shadow(1px 1px 0 #D09400)
          drop-shadow(-1px -1px 0 #D09400);
}

#settings {
  height: 8vh;
  padding-right: .5rem;
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
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}

#setting-menu h4 {
  grid-row: 3/4;
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}

#setting-menu h5 {
  grid-row: 3/4;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}


@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInRight {
  animation-name: slideInRight;
  animation-duration: 1s;
}

.slideInRightSlow {
  animation-name: slideInRight;
  animation-duration: 3s;
}

@media only screen and (max-width: 600px) {
  header{
    grid-template-columns: 33vw 33vw 33vw;
  }

  #logo {
    justify-self: center;
    align-self: center;
  }

  #logo img {
    height: 12vh;
  }

  #hook {
    font-size: 1.8rem;
    text-align: center;
  }

  #avatar {
    height: 10vh;
  }

  #settings {
    height: 6vh;
  }

  #setting-menu {
    grid-row: 1/2;
    grid-column: 1/3;
    width: 90%;
    z-index: 1;
  }

  #setting-menu h1 {
    font-size: 1.3rem;
  }

  #setting-menu h2 {
    font-size: 1.1rem;
  }

  #setting-menu h3 {
    font-size: .6rem;
  }

  #setting-menu h4 {
    font-size: .6rem;
  }

  #setting-menu h5 {
    font-size: .6rem;
  }
}
</style>
