/* eslint-disable no-param-reassign */
import db from '@/firebase';

export const types = {
  ACTIONS: {
    FETCH: 'fetch',
    CREATE: 'create',
    DELETE: 'delete',
    UPDATE: 'update',
  },
  MUTATIONS: {
    ADD: 'add',
    REMOVE: 'remove',
    UPDATE: 'update',
    SAVE: 'save',
    RESET: 'reset',
  },
  GETTERS: {},
};

const state = {
  kids: [],
};

// const initialState = { ...state };

const actions = {
  async [types.ACTIONS.FETCH]({ commit }, userId) {
    try {
      const querySnapshot = await db.collection('kids')
        .where('userId', '==', userId)
        .get();

      const payload = querySnapshot.docs.map((doc) => {
        const { name, age, gender } = doc.data();
        return {
          name, age, gender, id: doc.id,
        };
      });

      commit(types.MUTATIONS.SAVE, payload);
    } catch (error) {
      console.log(error);
    }
  },
  [types.ACTIONS.CREATE]: async ({ commit }, payload) => {
    try {
      const docRef = await db.collection('kids').add(payload);
      commit(types.MUTATIONS.ADD, { ...payload, id: docRef.id });
    } catch (error) {
      console.log(error);
    }
  },
  [types.ACTIONS.DELETE]: async ({ commit }, payload) => {
    try {
      await db.collection('kids')
        .doc(payload.id)
        .delete();
      commit(types.MUTATIONS.REMOVE, payload);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  [types.MUTATIONS.SAVE]: (_state, payload) => {
    _state.kids = payload;
  },
  [types.MUTATIONS.ADD]: (_state, payload) => {
    _state.kids.push(payload);
  },
  [types.MUTATIONS.REMOVE]: (_state, payload) => {
    _state.kids = _state.kids.filter(k => k.id !== payload.id);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
