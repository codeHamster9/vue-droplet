import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Vuetify);

const config = {
  apiKey: 'AIzaSyC-JqDPAYDMST3kuBkZgyV3k_BonrTCyqk',
  authDomain: 'vuetoo-6546b.firebaseapp.com',
  databaseURL: 'https://vuetoo-6546b.firebaseio.com',
  projectId: 'vuetoo-6546b',
  storageBucket: 'vuetoo-6546b.appspot.com',
  messagingSenderId: '636018148355',
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
  console.log(user);

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
