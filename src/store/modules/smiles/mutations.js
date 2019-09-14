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
  [TYPES.MUTATIONS.UPDATE]: ({ smileys }, { value, id }) => {
    const smile = smileys.find(s => s.id === id);
    smile.value = value;
  },
};
