import db from "../../firebase";

const state = {
  rooms: []
};

const mutations = {
  CREATE_ROOM(state, room) {
    state.rooms.push({
      id: room.id,
      title: room.title,
      description: room.description,
      participants: room.participants
    });
  },
  DELETE_ROOM(state, id) {
    const index = state.rooms.findIndex(room => room.id == id);
    if (index >= 0) state.rooms.splice(index, 1);
  },
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
          if (roomData.title !== undefined) tempRooms.push(roomData);
        });
        commit("FETCH_ROOMS", tempRooms);
      });
  },
  createRoom: (context, room) => {
    db.collection("rooms")
      .add({
        title: room.title,
        description: room.description,
        participants: room.participants
      })
      .then(docRef => {
        context.commit("CREATE_ROOM", {
          id: docRef.id,
          title: docRef.title,
          description: docRef.description,
          participants: docRef.participants
        });
      });
  },
  deleteRoom: (context, id) => {
    db.collection("rooms")
      .doc(id)
      .delete()
      .then(() => {
        context.commit("DELETE_ROOM", id);
      });
  }
};

const getters = {
  getRooms: state => {
    return state.rooms;
  }
};

export default { state, mutations, actions, getters };
