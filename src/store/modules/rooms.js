import db from "../../firebase";
import axios from "axios";

const state = {
  rooms: [],
  room: {},
};

const mutations = {
  ADD_ROOM(state, room) {
    state.rooms.push(room);
  },
  DELETE_ROOM(state, id) {
    const index = state.rooms.findIndex((room) => room.id == id);
    if (index >= 0) state.rooms.splice(index, 1);
  },
  FETCH_ROOMS(state, rooms) {
    state.rooms = rooms;
  },
  FETCH_ROOM(state, room) {
    state.room = room;
  },
  UPDATE_ROOM(state, roomData) {
    if (roomData.roomIndex >= 0) {
      state.rooms.splice(roomData.roomIndex, 1);
      state.rooms.splice(roomData.roomIndex, 0, roomData.room);
    }
  },
};

const actions = {
  initRealtimeListeners({ commit }) {
    db.collection("rooms").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const source = change.doc.metadata.hasPendingWrites
            ? "Local"
            : "Server";

          if (source === "Server") {
            if (!state.rooms.some((room) => room.id == change.doc.id)) {
              commit("ADD_ROOM", {
                id: change.doc.id,
                title: change.doc.data().title,
                category: change.doc.data().category,
                date: change.doc.data().date,
                description: change.doc.data().description,
                participants: change.doc.data().participants,
                address: change.doc.data().address,
                joinedUsers: change.doc.data().joinedUsers,
                messages: change.doc.data().messages,
                admin: change.doc.data().admin,
              });
            }
          }
        }

        if (change.type === "modified") {
          const room = state.rooms.find((room) => room.id == change.doc.id);
          const roomIndex = state.rooms.indexOf(room);

          const roomData = {
            roomIndex: roomIndex,
            room: change.doc.data(),
          };
          roomData.room.id = change.doc.id;

          commit("UPDATE_ROOM", roomData);
          commit("FETCH_ROOM", roomData.room);
        }

        if (change.type === "removed") {
          commit("DELETE_ROOM", change.doc.id);
        }
      });
    });
  },

  fetchRooms: ({ commit }) => {
    axios.get(`${process.env.VUE_APP_API_LOCAL_URL}/rooms`).then((res) => {
      commit("FETCH_ROOMS", res.data.rooms);
    });
  },

  fetchRoom: ({ commit }, roomId) => {
    axios
      .get(`${process.env.VUE_APP_API_LOCAL_URL}/rooms/${roomId}`)
      .then((res) => {
        commit("FETCH_ROOM", res.data.room);
      });
  },

  addRoom: ({ commit }, room) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_API_LOCAL_URL}/create`, room).then(
        (res) => {
          commit("ADD_ROOM", room);
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  deleteRoom: ({ commit }, roomId) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${process.env.VUE_APP_API_LOCAL_URL}/delete/${roomId}`)
        .then(
          (res) => {
            commit("DELETE_ROOM", roomId);
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },
  updateRoom: (context, updatedRoom) => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${process.env.VUE_APP_API_LOCAL_URL}/update/${updatedRoom.id}`,
          updatedRoom
        )
        .then((res) => {
          resolve(res),
            (error) => {
              reject(error);
            };
        });
    });
  },
  joinUser: (context, joinData) => {
    const currentRoom = state.rooms.find((room) => room.id == joinData.roomId);

    if (currentRoom.participants > currentRoom.joinedUsers.length) {
      currentRoom.joinedUsers.push(joinData.userId);
      axios.put(
        `${process.env.VUE_APP_API_LOCAL_URL}/update/${joinData.roomId}`,
        currentRoom
      );
    }
  },
  leaveUser: (context, leaveData) => {
    const currentRoom = state.rooms.find((room) => room.id == leaveData.roomId);
    const index = currentRoom.joinedUsers.indexOf(leaveData.userId);
    currentRoom.joinedUsers.splice(index, 1);

    axios.put(
      `${process.env.VUE_APP_API_LOCAL_URL}/update/${leaveData.roomId}`,
      currentRoom
    );
  },
  postMessage: ({ commit }, messageData) => {
    const currentRoom = state.rooms.find(
      (room) => room.id == messageData.roomId
    );
    currentRoom.messages.push(messageData);

    return new Promise((resolve, reject) => {
      axios
        .put(
          `${process.env.VUE_APP_API_LOCAL_URL}/update/${messageData.roomId}`,
          currentRoom
        )
        .then((res) => {
          resolve(res),
            (error) => {
              reject(error);
            };
        });
    });
  },
};

const getters = {
  getRooms: (state) => {
    return state.rooms;
  },
  getRoom: (state) => {
    return state.room;
  },
};

export default { state, mutations, actions, getters };
