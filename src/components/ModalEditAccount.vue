<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button id="close" class="modal-default-button" v-on:click="modalEdit.show = false">
            CLOSE
          </button>
          <h2>Pick an Avatar:</h2>
          <div id="component-select">
            <div id="component-select-inner">
              <img v-for="avatar in avatars" :id="avatar" :src=avatar v-bind:class="{active:(userData.avatar === avatar)}" v-on:click="selectAvatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ModalEditAcount',
  components: {
  },
  data() {
    return {
      avatars: ["../../static/1.png", "../../static/2.png" ,"../../static/3.png", "../../static/4.png", "../../static/5.png", "../../static/6.png", "../../static/7.png", "../../static/8.png", "../../static/9.png", "../../static/10.png"],
    };
  },
  computed: mapGetters([
    'modalEdit',
    'userData',
  ]),
  methods: {
    ... mapActions([
  ]),
    selectAvatar(event) {
      this.userData.avatar= event.target.id;
    }
  }
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
  height: 40vh;
  background-color: #fff;
  border-radius: 2px;
  transition: all .3s ease;
  display: grid;
  grid-template-rows: 5% 10% 60% 25%;
  grid-template-columns: 90% 10%;
}

#close {
  grid-row: 1/2;
  grid-column: 2/3;
}

.modal-container h2 {
  grid-row: 2/3;
  grid-column: 1/3;
  justify-self: center;
  align-self: center;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}

#component-select {
  grid-row: 3/4;
  grid-column: 1/3;
  width: 100%;
  height: 18vh;
  overflow-y: scroll;
}

#component-select-inner {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
}

#component-select img {
  width: 8vw;
  height: 14vh;
  border-radius: 5px;
  margin: .5rem;
  cursor: pointer;
}

#save-avatar {
  grid-row: 4/5;
  grid-column: 1/3;
  justify-self: center;
  align-self: start;
  width: 30%;
  height: 2rem;
  color: white;
  font-size: 1.2rem;
  background-color: #D09400;
  border: solid #120832 1px;
  border-radius: 10px;
  margin-bottom: 0rem;
}

.active {
  -webkit-filter: drop-shadow(1px 1px 0 #D09400)
                  drop-shadow(-1px -1px 0 #D09400);
  filter: drop-shadow(1px 1px 0 #D09400)
          drop-shadow(-1px -1px 0 #D09400);
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
</style>
