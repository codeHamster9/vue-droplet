import db from '@/firebase';

export const types = {};

const state = {
  smileys: [],
};

const actions = {
  async fetch({ commit }) {
    try {
      const querySnapshot = await db.collection('smileys').get();
      const payload = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        payload.push({ id: doc.id, ...data });
      });

      commit('addAll', payload);
    } catch (error) {
      console.log('fetch Error');
    }
  },
  async add(context, { color, date }) {
    try {
      const docRef = await db.collection('smileys').add({ color, date });

      context.commit('addOne', {
        id: docRef.id,
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
      context.commit('update', payload);
    } catch (error) {
      context.commit('update', {
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
      context.commit('removeOne', payload);
    } catch (error) {
      context.commit('addOne', payload);
    }
  },
};
const mutations = {
  addAll({ smileys }, payload) {
    smileys = payload;
  },
  addOne({ smileys }, payload) {
    smileys.push(payload);
  },
  removeOne({ smileys }, payload) {
    smileys = smileys.filter(i => i.date !== payload.date);
  },
  update({ smileys }, payload) {
    const smile = smileys.find(s => s.id === payload.id);
    smile.color = 'orange accent-2';
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
