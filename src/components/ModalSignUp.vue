<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button id="close" class="modal-default-button" @click="$emit('close')">
            CLOSE
          </button>
          <h1>Register for a Plan Right Account:</h1>
          <form v-on:submit.prevent="signUp">
            <label for="username">What is your name?</label>
            <input required v-model="signUpData.username" type="text" name="username" placeholder="First and Last Name">
            <label for="email">What is your email?</label>
            <input required type="email" v-model="signUpData.email" name="email" placeholder="Email">
            <label for="password">Password</label>
            <input required v-model="signUpData.password" type="password" name="password">
            <label for="password-confirm">Confirm Password</label>
            <input required v-model="signUpData.passwordConfirm" type="password" name="password">
            <small v-if="signUpData.passwordConfirm !== signUpData.password && signUpData.passwordConfirm !==''">Passwords do not match!</small>
            <small v-if="signUpData.passwordConfirm === signUpData.password && signUpData.passwordConfirm !==''">Passwords Match!</small>
            <input id="save" type="submit" name="submit" value="Sign Up">
            <p>{{signUpData.warning}}</p>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ModalSignUp',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'modalSignUp',
    'signUpData'
  ]),
  methods: mapActions([
    'signUp',
  ]),
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 60vw;
  height: 60vh;
  background-color: #fff;
  border-radius: 2px;
  transition: all .3s ease;
  display: grid;
  grid-template-rows: 5% 10% 85%;
  grid-template-columns: 90% 10%;
}

#close {
  grid-row: 1/2;
  grid-column: 2/3;
}

.modal-container h1 {
  grid-row: 2/3;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}

.modal-container form {
  grid-row: 3/4;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  width: 80%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

.modal-container label {
  width: 100%;
  font-size: 1.2rem;
  text-align: left;
}

.modal-container input {
  width: 100%;
  height: 2rem;
  border: solid black 1px;
  margin: .5rem 0rem 1rem 0rem;
}

.modal-container small{
  color: red;
  margin-top: -.8rem;
}

#save {
  width: 50%;
  height: 2rem;
  color: white;
  font-size: 1.3rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
  margin-bottom: 0rem;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media only screen and (max-width: 600px) {
  .modal-container {
    width: 90vw;
    height: 80vh;
    grid-template-columns: 80% 20%;
  }

}
</style>
