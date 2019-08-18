import db from '@/firebase';
import TYPES from '@/store/modules/smiles/types';
import mutations from './mutations';

export const types = {};

const state = {
  smileys: [],
};

const actions = {
  async fetch({ commit }) {
    try {
      const querySnapshot = await db.collection('smileys').get();

      const payload = querySnapshot.docs.map((doc) => {
        const { date, color, kidId } = doc.data();
        return {
          id: doc.id, date, color, kidId: kidId.id,
        };
      });

      commit(TYPES.MUTATIONS.ADD_ALL, payload);
    } catch (error) {
      console.log(error);
    }
  },
  async add(context, { color, date }) {
    try {
      const docRef = await db.collection('smileys').add({ color, date, kidId: 'TKOwf1s1dz2vaqtTaBG6' });

      context.commit(TYPES.MUTATIONS.ADD_ONE, {
        id: docRef.id,
        kidId: 'TKOwf1s1dz2vaqtTaBG6',
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
