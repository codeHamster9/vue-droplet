import db from '@/firebase';
import TYPES from '@/store/modules/smiles/types';
import mutations from './mutations';

const state = {
  smileys: [],
};

const actions = {
  [TYPES.ACTIONS.FETCH]: async ({ commit, rootState, dispatch }) => {
    const activeKidId = rootState.kids.activeKid;
    try {
      dispatch('wait/start', 'smiles.fetch', { root: true });
      const querySnapshot = await db
        .collection('smileys')
        .where('kidId', '==', activeKidId)
        .get();

      const payload = querySnapshot.docs.map((doc) => {
        const {
          date,
          value,
          kidId,
          status,
        } = doc.data();

        return {
          id: doc.id,
          date,
          value,
          kidId,
          status,
        };
      });

      commit(TYPES.MUTATIONS.ADD_ALL, payload);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch('wait/end', 'smiles.fetch', { root: true });
    }
  },
  [TYPES.ACTIONS.ADD]: async ({ commit, rootState }, { value, date }) => {
    const activeKidId = rootState.kids.activeKid;
    try {
      const newSmile = {
        value,
        date,
        kidId: activeKidId,
        status: 'unclaimed',
      };

      const docRef = await db
        .collection('smileys')
        .add(newSmile);

      commit(TYPES.MUTATIONS.ADD_ONE, { id: docRef.id, ...newSmile });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
  [TYPES.ACTIONS.UPDATE]: async ({ commit }, { value, id }) => {
    try {
      await db.collection('smileys')
        .doc(id)
        .update({ value });
      commit(TYPES.MUTATIONS.UPDATE, { value, id });
    } catch (error) {
      // commit(TYPES.MUTATIONS.UPDATE, { value: 1, id });
      console.error(error);
    }
  },
  [TYPES.ACTIONS.REMOVE]: async ({ commit }, payload) => {
    try {
      await db.collection('smileys')
        .doc(payload.id)
        .delete();
      commit(TYPES.MUTATIONS.REMOVE_ONE, payload);
    } catch (error) {
      // commit(TYPES.MUTATIONS.ADD_ONE, payload);
      console.error(error);
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
