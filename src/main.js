import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import store from '@/store';
import router from '@/router';

import '@/registerServiceWorker';
import App from './App.vue';


Vue.config.productionTip = false;
Vue.use(Vuetify);


firebase.auth().onAuthStateChanged(async (user) => {
  await store.dispatch('user/fetch', user.email);

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
