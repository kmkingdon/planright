<template>
  <div id="template">
    <Header />
    <Menu />
    <div id="template-view">
      <aside>
        <h1> Design Your Template </h1>
        <div id="template-steps">
          <img class="checkboxes" v-if="templateStep === 1" src="../../static/checkbox.png" />
          <transition name="tada" enter-active-class="tada">
            <img class="checkboxes" v-if="templateStep > 1" src="../../static/checkboxcompleted.png" />
          </transition>
          <h2 v-bind:class="{active:(templateStep === 1)}"> Pick Your Standards </h2>
          <img class="checkboxes" v-if="templateStep <= 2" src="../../static/checkbox.png" />
          <transition name="tada" enter-active-class="tada">
            <img class="checkboxes" v-if="templateStep > 2" src="../../static/checkboxcompleted.png" />
          </transition>
          <h2 v-bind:class="{active:(templateStep === 2)}"> Pick Your Components </h2>
          <img class="checkboxes" v-if="templateStep <= 3" src="../../static/checkbox.png" />
          <transition name="tada" enter-active-class="tada">
            <img class="checkboxes" v-if="templateStep > 3" src="../../static/checkboxcompleted.png" />
          </transition>
          <h2 v-bind:class="{active:(templateStep === 3)}"> Arrange Your Components </h2>
          <img class="checkboxes" v-if="templateStep <= 4" src="../../static/checkbox.png" />
          <transition name="tada" enter-active-class="tada">
            <img class="checkboxes" v-if="templateStep > 4" src="../../static/checkboxcompleted.png" />
          </transition>
          <h2 v-bind:class="{active:(templateStep === 4)}"> Customize Components </h2>
          <img class="checkboxes" v-if="templateStep <= 5 && !saveTemplateConfirm" src="../../static/checkbox.png" />
          <transition name="tada" enter-active-class="tada">
            <img class="checkboxes" v-if="saveTemplateConfirm" src="../../static/checkboxcompleted.png" />
          </transition>
          <h2 v-bind:class="{active:(templateStep === 5)}"> Save Your Template</h2>
        </div>
      </aside>
      <div id="selected-template">
        <transition name="fade">
          <Standards v-if="templateStep === 1" />
          <Components v-if="templateStep === 2" />
          <Arrange v-if="templateStep === 3" />
          <DropDowns v-if="templateStep === 4" />
          <SaveTemplate v-if="templateStep === 5" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Standards from '@/components/Templates/Standards';
import Components from '@/components/Templates/Components';
import Arrange from '@/components/Templates/Arrange';
import DropDowns from '@/components/Templates/DropDowns';
import SaveTemplate from '@/components/Templates/SaveTemplate';

export default {
  name: 'Template',
  components: {
    Header,
    Menu,
    Standards,
    Components,
    Arrange,
    DropDowns,
    SaveTemplate,
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
    'templateStep',
    'saveTemplateConfirm',
  ]),
  methods: mapActions([
    'resetTemplateVariables',
  ]),
  mounted(){
    this.resetTemplateVariables();
  }
};
</script>


<style scoped>
#template {
  display: grid;
  grid-template-rows: 20vh 10vh 70vh;
  grid-template-columns: 10vw 20vw 20vw 20vw 20vw 10vw;
}

#template-view {
  display: grid;
  grid-template-rows: 70vh;
  grid-template-columns: 30vw 70vw;
}

#selected-template {
  grid-row: 1/2;
  grid-column: 2/3;
  background-image: url("../../static/template.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

aside {
  grid-row: 1/2;
  grid-column: 1/2;
  background-color: #AFADB3;
  display: grid;
  grid-template-rows: 15vh 55vh;
  grid-template-columns: 30vw;
}

aside h1 {
  grid-row: 1/2;
  grid-column: 1/end;
  justify-self: center;
  align-self: center;
  font-size: 2.2rem;
  font-family: 'Nanum+Myeongjo';
  color: white;
}

#template-steps {
  grid-row: 2/3;
  grid-column: 1/end;
  display: flex;
  flex-flow: row wrap;
}

.checkboxes {
  width: 3rem;
  height: 3rem;
  margin-left: 2rem;
}

#template-steps h2 {
  height: 3rem;
  width: 23vw;
  font-size: 1.4rem;
  margin-top: .7rem;
  color: #120832;
}

.active {
  color: white !important;
  font-weight: bold !important;
  text-shadow:
   -1px -1px 0 #120832,
    1px -1px 0 #120832,
    -1px 1px 0 #120832,
     1px 1px 0 #120832;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

.tada {
  animation-name: tada;
  animation-duration: 2s;
}

</style>
