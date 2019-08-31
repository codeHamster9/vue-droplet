/* eslint-disable no-param-reassign */
import db from '@/firebase';

export const types = {
  NAME: 'kids',
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
    SET_ACTIVE: 'setActive',
  },
  GETTERS: {},
};

const state = {
  kids: [],
  activeKid: null,
};

// const initialState = { ...state };

const actions = {
  async [types.ACTIONS.FETCH]({ commit }, userId) {
    try {
      const querySnapshot = await db
        .collection('kids')
        .where('userId', '==', userId)
        .get();

      const payload = querySnapshot.docs.map((doc) => {
        const { name, age, gender } = doc.data();
        return {
          name,
          age,
          gender,
          id: doc.id,
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
      await db
        .collection('kids')
        .doc(payload.id)
        .delete();
      commit(types.MUTATIONS.REMOVE, payload);
    } catch (error) {
      console.log(error);
    }
  },
  [types.ACTIONS.UPDATE]: (context, payload) => {
    try {
      const {
        name, age, gender, userId,
      } = payload;
      db.collection('kids')
        .doc(payload.id)
        .set({
          name, age, gender, userId,
        });
      context.commit(types.MUTATIONS.UPDATE, payload);
    } catch (e) {
      console.log(e);
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
  [types.MUTATIONS.SET_ACTIVE]: (_state, payload) => {
    _state.activeKid = payload;
  },
  [types.MUTATIONS.UPDATE]: ({ kids }, payload) => {
    const kid = kids.find(s => s.id === payload.id);
    kid.name = payload.name;
    kid.age = payload.age;
    kid.gender = payload.gender;
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
