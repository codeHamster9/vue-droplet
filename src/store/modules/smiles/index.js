import db from '@/firebase';

export const types = {};

const state = {
  smileys: [],
};

const actions = {
  fetch({
    commit,
  }) {
    db.collection('smileys')
      .get()
      .then((querySnapshot) => {
        const payload = [];

        querySnapshot.forEach((doc) => {
          payload.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        commit('addAll', payload);
      });
  },
  async add(context, {
    color,
    date,
  }) {
    try {
      const docRef = await db.collection('smileys')
        .add({
          color,
          date,
        });

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
      db.collection('smileys').doc(payload.id).set({
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
      db.collection('smileys').doc(payload.id).delete();
      context.commit('removeOne', payload);
    } catch (error) {
      context.commit('addOne', payload);
    }
  },
};

const mutations = {
  addAll(state, payload) {
    state.smileys = payload;
  },
  addOne(state, payload) {
    state.smileys.push(payload);
  },
  removeOne(state, payload) {
    state.smileys = state.smileys.filter(i => i.date !== payload.date);
  },
  update(state, payload) {
    const smile = state.smileys.find(s => s.id === payload.id);
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
