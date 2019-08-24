import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import smiles from '@/store/modules/smiles';
import kids from '@/store/modules/kids';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    smiles,
    kids,
  },
});
