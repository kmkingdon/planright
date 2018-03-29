<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button id="close" class="modal-default-button" @click="$emit('close')">
            CLOSE
          </button>
          <h1>Are you sure that you want to delete this lesson?</h1>
          <button v-on:click="deleteLesson" id="confirm">Yes, Delete the Lesson</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ModalDeleteLesson',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'deleteLessonModal',
  ]),
  methods: mapActions([
    'deleteLesson',
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
  width: 40vw;
  height: 20vh;
  background-color: #fff;
  border-radius: 2px;
  transition: all .3s ease;
  display: grid;
  grid-template-rows: 10% 45% 45%;
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

#confirm {
  grid-row: 3/4;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
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
    padding: 0rem 1rem;
  }

  #confirm {
    width: 70%;
    height: 2rem;
  }
}
</style>
