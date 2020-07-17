import rooms from "../../data/rooms";

const state = {
  rooms: []
};

const mutations = {
  SET_ROOMS(state, rooms) {
    state.rooms = rooms;
  }
};

const actions = {
  initRooms: ({ commit }) => {
    commit("SET_ROOMS", rooms);
  }
};

const getters = {
  getRooms: state => {
    return state.rooms;
  }
};

export default { state, mutations, actions, getters };
