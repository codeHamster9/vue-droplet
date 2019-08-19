import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import store from '@/store';
import router from '@/router';
import db from '@/firebase';
import '@/registerServiceWorker';
import App from './App.vue';


Vue.config.productionTip = false;
Vue.use(Vuetify);


firebase.auth().onAuthStateChanged((user) => {
  db.collection('users')
    .where('email', '==', user.email)
    .get()
    .then((d) => {
      const doc = d.docs.pop();
      store.commit('user/saveUser', doc);
    });


  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
