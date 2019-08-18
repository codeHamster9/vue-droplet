import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import store from '@/store';
import router from '@/router';
import '@/firebase';
import '@/registerServiceWorker';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Vuetify);


firebase.auth().onAuthStateChanged((user) => {
  console.log(user);

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
