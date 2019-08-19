/* eslint-disable no-param-reassign */
export const types = {
  ACTIONS: {
    LOGIN: 'login',
    LOGOUT: 'logout',
  },
  MUTATIONS: {
    SAVE_USER: 'saveUser',
    RESET_STATE: 'resetState',
  },
  GETTERS: {},
};

const state = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  kids: null,
};

const initialState = { ...state };

const actions = {};

const mutations = {
  [types.MUTATIONS.SAVE_USER]: (_state, payload) => {
    const {
      email, firstName, lastName,
    } = payload.data();

    const kids = payload.data().kids.map(k => k.id);
    const userId = payload.id;

    _state.userId = userId;
    _state.firstName = firstName;
    _state.lastName = lastName;
    _state.email = email;
    _state.kids = kids;
  },
  [types.RESET_STATE]: (_state) => {
    Object.keys(_state).forEach((key) => {
      _state[key] = initialState[key];
    });
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
