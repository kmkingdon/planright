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
        <input id="login-submit" type="submit" value="Login" />
        <p>{{userData.warning}}</p>
        <h3 v-on:click="modalSignUp.show = true">Sign Up for an Account</h3>
      </form>
    </div>
    <ModalSignUp v-if="modalSignUp.show"  @close="modalSignUp.show = false" />
  </div>
</template>

<script>
import Header from '@/components/Header';
import { mapGetters, mapActions } from 'vuex'
import ModalSignUp from "@/components/ModalSignUp";

export default {
  name: 'Home',
  components: {
    Header,
    ModalSignUp,
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'loginData',
    'userData',
    'modalSignUp'
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
  align-self: center;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

#login form {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
  height: 90%;
  background-color: rgba(255,255,255,.5);
  margin-top: 2rem;
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
  width: 80%;
  height: 2rem;
  font-size: 1rem;
  margin: .4rem 0rem 1rem 0rem;
}

#login-submit {
  width: 50% !important;
  height: 2rem;
  background-color: #D09400;
  color: white;
  border: solid #120832 1px;
  border-radius: 10px;
  margin-bottom: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  text-decoration: none;
}
#login form p {
  margin-bottom: -1rem;
  height: 1rem;
  font-size: 1rem;
  color: #D09400;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

#login form h3 {
  margin-top: 3rem;
  font-size: 1.3rem;
  color: #120832;
}
</style>
