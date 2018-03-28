<template>
  <div id="home" class="fadeInSlow">
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
    <div class="about" id="templates">
      <h3>CUSTOM TEMPLATES</h3>
      <img class="fadeIn" v-on:click="show.template = true" src="../../static/template.png" v-if="!show.template"/>
      <ul class="fadeIn" v-on:click="show.template = false" v-if="show.template">
        <li>Create custom lesson plan templates</li>
        <li>Include Common Core and Next Generation Science Standards</li>
        <li>Customize lesson plan component order, drop-down menus, and permanent filled areas.</li>
      </ul>
    </div>
    <div class="about" id="make">
      <h3>MAKE/EDIT LESSONS</h3>
      <img class="fadeIn" v-on:click="show.make = true" src="../../static/make.png" v-if="!show.make"/>
      <ul class="fadeIn" v-on:click="show.make = false" v-if="show.make">
        <li>Use custom templates to create new lesson plans</li>
        <li>Open old lesson plans to add changes</li>
        <li>Organize lessons in folders for easy access</li>
      </ul>
    </div>
    <div class="about" id="history">
      <h3>LESSON HISTORY</h3>
      <img class="fadeIn" v-on:click="show.history = true" src="../../static/history.png" v-if="!show.history"/>
      <ul class="fadeIn" v-on:click="show.history = false" v-if="show.history">
        <li>View old lesson plans with easy organization</li>
        <li>Add reflections based on your instructional goals to each lesson</li>
        <li>Export each lesson as a PDF</li>
      </ul>
    </div>
    <div class="about" id="goal">
      <h3>REFLECT & GOAL SET</h3>
      <img class="fadeIn" v-on:click="show.goal = true" src="../../static/goal.png" v-if="!show.goal"/>
      <ul class="fadeIn" v-on:click="show.goal = false" v-if="show.goal">
        <li>Create an instructional goal that focuses on one component of your lesson plan</li>
        <li>Use the goal to reflect on your practice in each lesson</li>
        <li>Make a final reflection at the end of your coaching cycle</li>
      </ul>
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
      show: {
        template: false,
        make: false,
        history: false,
        goal: false,
      }
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
  background-color: rgba(255,255,255,.7);
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

.about {
  width: 85%;
  height: 70%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(255,255,255,.7);
}

.about h3 {
  width: 100%;
  height: 3rem;
  padding-top:1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #495669;
  font-family: 'Nanum+Myeongjo';

}

.about img {
  width: 60%;
  cursor: pointer;
}

.about ul {
  width: 95%;
  list-style: circle;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.about li {
  width: 90%;
  font-size: .8rem;
  margin: .4rem 0rem 0rem .7rem;
  color:  #120832;
}

#templates {
  grid-row: 3/4;
  grid-column: 2/3;
  justify-self: center;
  align-self: center;
}

#make{
  grid-row: 3/4;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
}

#history {
  grid-row: 3/4;
  grid-column: 4/5;
  justify-self: center;
  align-self: center;
}

#goal {
  grid-row: 3/4;
  grid-column: 5/6;
  justify-self: center;
  align-self: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
  animation-duration: 2s;
}

.fadeInSlow {
  animation-name: fadeIn;
  animation-duration: 8s;
}
</style>
