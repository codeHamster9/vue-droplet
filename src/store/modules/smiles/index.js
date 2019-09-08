import db from '@/firebase';
import TYPES from '@/store/modules/smiles/types';
import mutations from './mutations';

const state = {
  smileys: [],
};

const actions = {
  async fetch({ commit, rootState, dispatch }) {
    const activeKidId = rootState.kids.activeKid;
    try {
      dispatch('wait/start', 'smiles.fetch', { root: true });
      const querySnapshot = await db
        .collection('smileys')
        .where('kidId', '==', activeKidId)
        .get();

      const payload = querySnapshot.docs.map((doc) => {
        const { date, value, kidId } = doc.data();
        return {
          id: doc.id,
          date,
          value,
          kidId,
        };
      });

      commit(TYPES.MUTATIONS.ADD_ALL, payload);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch('wait/end', 'smiles.fetch', { root: true });
    }
  },
  async add({ commit, rootState }, { value, date }) {
    const activeKidId = rootState.kids.activeKid;
    try {
      const docRef = await db
        .collection('smileys')
        .add({ value, date, kidId: activeKidId });

      commit(TYPES.MUTATIONS.ADD_ONE, {
        id: docRef.id,
        kidId: activeKidId,
        value,
        date,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
  update({ rootState, commit }, payload) {
    const activeKidId = rootState.kids.activeKid;
    try {
      db.collection('smileys')
        .doc(payload.id)
        .set({
          kidId: activeKidId,
          value: payload.value,
          date: payload.date,
        });
      commit(TYPES.MUTATIONS.UPDATE, payload);
    } catch (error) {
      commit(TYPES.MUTATIONS.UPDATE, {
        ...payload,
        value: 1,
      });
    }
  },
  remove({ commit }, payload) {
    try {
      db.collection('smileys')
        .doc(payload.id)
        .delete();
      commit(TYPES.MUTATIONS.REMOVE_ONE, payload);
    } catch (error) {
      commit(TYPES.MUTATIONS.ADD_ONE, payload);
    }
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
