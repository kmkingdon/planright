<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="$emit('close')">
            CLOSE
          </button>
          <h1>Add a Lesson Component</h1>
          <form v-on:submit.prevent="addLessonComponent">
            <label for="name">What is the name of the component?</label>
            <input required v-model="addModal.name" type="text" name="name"/>
            <input id="save-component" type="submit" value="Add Component"/>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ModalAdd',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'addModal',
  ]),
  methods: mapActions([
    'addLessonComponent',
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
  justify-content: flex-end;
  align-items: flex-end;
}

.modal-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 0rem 5rem 5rem 0rem;
}

.modal-container {
  width: 40vw;
  height: 30vh;
  background-color: #fff;
  border-radius: 2px;
  transition: all .3s ease;
  display: grid;
  grid-template-rows: 10% 10% 70%;
  grid-template-columns: 90% 10%;
}

.modal-container button {
  grid-row: 1/2;
  grid-column: 2/3;
}

.modal-container h1 {
  grid-row: 2/3;
  grid-column: 1/3;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}

.modal-container form {
  grid-row: 3/4;
  grid-column: 1/3;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

.modal-container label {
  width: 90%;
  text-align: left;
  font-size: 1.2rem;
  padding: 1rem;
}

.modal-container input {
  width: 80%;
  height: 2rem;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

#save-component {
  width: 50% !important;
  height: 2rem !important;
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
  .modal-mask {
    justify-content: center;
    align-items: center;;
  }

  .modal-wrapper {
    justify-content: center;
    align-items: center;
    margin: 0rem;
  }

  .modal-container {
    width: 90vw;
    height: 40vh;
    display: grid;
    grid-template-columns: 80% 20%;
  }

  .modal-container button {
    grid-row: 1/2;
    grid-column: 2/3;
    border: solid black 1px;
    font-size: .3rem;
  }

  .modal-container h1 {
    font-size: 1.2rem;
  }

  .modal-container label {
    font-size: .8rem;
  }

  .modal-container input {
    border: solid black 1px;
  }

}
</style>
