/* eslint-disable no-param-reassign */
import TYPES from './types';

export default {
  [TYPES.MUTATIONS.ADD_ALL]: (state, payload) => {
    state.smileys = payload;
  },
  [TYPES.MUTATIONS.ADD_ONE]: ({ smileys }, payload) => {
    smileys.push(payload);
  },
  [TYPES.MUTATIONS.REMOVE_ONE]: (state, payload) => {
    state.smileys = state.smileys.filter(i => i.date !== payload.date);
  },
  [TYPES.MUTATIONS.UPDATE]: ({ smileys }, payload) => {
    const smile = smileys.find(s => s.id === payload.id);
    smile.color = 'orange accent-2';
  },
};
