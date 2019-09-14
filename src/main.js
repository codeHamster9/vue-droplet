import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import VueFilterDateFormat from 'vue-filter-date-format';
import VueWait from 'vue-wait';
import firebase from '@/firebase';
import store from '@/store';
import router from '@/router';
import '@/registerServiceWorker';
import App from './App.vue';

Vue.use(VueFilterDateFormat);
Vue.use(VueWait);

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'fa',
  },
});


firebase.auth().onAuthStateChanged(async (user) => {
  try {
    await store.dispatch('user/fetch', user.email || 'idansagi@gmail.com');
  } catch (error) {
    console.log(error);
  } finally {
    new Vue({
      router,
      store,
      wait: new VueWait({ useVuex: true }),
      render: h => h(App),
    }).$mount('#app');
  }
});
