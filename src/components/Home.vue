<template>
  <div id="home">
    <Header />
    <div id="login">
      <form v-on:submit.prevent="login">
        <h2> Sign In </h2>
        <label class="labels" for="username"> Email</label>
        <input v-model="loginData.email" type="text" name="username"/>
        <label class="labels" for="password"> Password </label>
        <input v-model="loginData.password" type="password" name="password"/>
        <input type="submit" value="Login" />
        <p>{{userData.warning}}</p>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'loginData',
    'userData'
  ]),
  methods: mapActions([
    'login'
  ])
};
</script>


<style scoped>
#home {
  display: grid;
  grid-template-rows: 20vh 50vh 30vh;
  grid-template-columns: 10vw 20vw 20vw 20vw 20vw 10vw;
  background-image: url("../../static/home.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#login {
  grid-row: 2/3;
  grid-column: 2/6;
  width: 100%;
  height: 100%;
  justify-self: center;
  align-self: end;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#login form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  background-color: rgba(255,255,255,.5);
}

#login h2 {
  font-family: Barlow;
  font-size: 1.5rem;
  margin: .5rem 0rem 1rem 0rem;
}

.labels {
  width: 100%;
  font-family: Barlow;
  font-size: 1rem;
  text-align: center;
}

#login form input {
  width: 90%;
  font-size: 1rem;
  margin-bottom: 2rem;
}

#login-submit {
  width: 50%;
  height: 2rem;
  background-color: #D09400;
  color: white;
  border: solid black 1px;
  border-radius: 5px;
  margin-bottom: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  text-decoration: none;
}
</style>
