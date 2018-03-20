import Vue from 'vue';
import store from './store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
