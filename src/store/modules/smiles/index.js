import db from '@/firebase';
import TYPES from '@/store/modules/smiles/types';
import mutations from './mutations';

const state = {
  smileys: [],
};

const actions = {
  async fetch({ commit, rootState }) {
    const activeKidId = rootState.kids.activeKid;

    try {
      const querySnapshot = await db
        .collection('smileys')
        .where('kidId', '==', activeKidId)
        .get();

      const payload = querySnapshot.docs.map((doc) => {
        const { date, color, kidId } = doc.data();
        return {
          id: doc.id,
          date,
          color,
          kidId,
        };
      });

      commit(TYPES.MUTATIONS.ADD_ALL, payload);
    } catch (error) {
      console.log(error);
    }
  },
  async add({ commit, rootState }, { color, date }) {
    const activeKidId = rootState.kids.activeKid;
    try {
      const docRef = await db
        .collection('smileys')
        .add({ color, date, kidId: activeKidId });

      commit(TYPES.MUTATIONS.ADD_ONE, {
        id: docRef.id,
        kidId: activeKidId,
        color,
        date,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
  update(context, payload) {
    try {
      db.collection('smileys')
        .doc(payload.id)
        .set({
          color: 'orange accent-2',
          date: payload.date,
        });
      context.commit(TYPES.MUTATIONS.UPDATE, payload);
    } catch (error) {
      context.commit(TYPES.MUTATIONS.UPDATE, {
        ...payload,
        color: 'yellow darken-1',
      });
    }
  },
  remove(context, payload) {
    try {
      db.collection('smileys')
        .doc(payload.id)
        .delete();
      context.commit(TYPES.MUTATIONS.REMOVE_ONE, payload);
    } catch (error) {
      context.commit(TYPES.MUTATIONS.ADD_ONE, payload);
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
