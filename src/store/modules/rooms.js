import db from "../../firebase";

const state = {
  rooms: []
};

const mutations = {
  FETCH_ROOMS(state, rooms) {
    state.rooms = rooms;
  }
};

const actions = {
  fetchRooms: ({ commit }) => {
    db.collection("rooms")
      .get()
      .then(querySnapshot => {
        let tempRooms = [];
        querySnapshot.forEach(doc => {
          const roomData = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            participants: doc.data().participants
          };
          tempRooms.push(roomData);
        });
        commit("FETCH_ROOMS", tempRooms);
      });
  }
};

const getters = {
  getRooms: state => {
    return state.rooms;
  }
};

export default { state, mutations, actions, getters };
