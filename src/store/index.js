import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import smiles from '@/store/modules/smiles';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  modules: {
    user,
    smiles,
  },
});
