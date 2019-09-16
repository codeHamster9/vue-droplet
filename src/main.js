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
import { isDebug } from './utils/helpers';

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
    if (isDebug) console.log('onAuthStateChanged', user);

    // const { email = 'idansagi@gmail.com' } = user;

    await store.dispatch('user/fetch', 'idansagi@gmail.com');
    new Vue({
      router,
      store,
      wait: new VueWait({ useVuex: true }),
      render: h => h(App),
    }).$mount('#app');
  } catch (e) {
    console.warn('Boot Time Error');
    console.error(e);
  }
});
