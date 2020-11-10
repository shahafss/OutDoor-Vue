import db from "../../firebase";
import globalStore from "../store";

import axios from "axios";

const state = {
  rooms: [],
  currentRoom: {},
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
  FETCH_ROOM(state, currentRoom) {
    state.currentRoom = currentRoom;
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
        }

        if (change.type === "removed") {
          commit("DELETE_ROOM", change.doc.id);
        }
      });
    });
  },

  fetchRooms: ({ commit }) => {
    axios
      .get("http://localhost:5001/outdoor-vue/us-central1/app/api/rooms")
      .then((res) => {
        commit("FETCH_ROOMS", res.data);
      });
  },

  fetchRoom: ({ commit }, roomId) => {
    axios
      .get(
        `http://localhost:5001/outdoor-vue/us-central1/app/api/rooms/${roomId}`
      )
      .then((res) => {
        commit("FETCH_ROOM", res.data);
      });
  },

  addRoom: ({ commit }, room) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:5001/outdoor-vue/us-central1/app/api/create",
          room
        )
        .then(
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
        .delete(
          `http://localhost:5001/outdoor-vue/us-central1/app/api/delete/${roomId}`
        )
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
    const currentRoomId = state.rooms.find((room) => room.id == updatedRoom.id)
      .id;
    db.collection("rooms")
      .doc(currentRoomId)
      .update(updatedRoom);
  },
  joinUser: (context, joinData) => {
    const currentRoom = state.rooms.find((room) => room.id == joinData.roomId);
    const joinedUsers = currentRoom.joinedUsers;
    if (currentRoom.participants > currentRoom.joinedUsers.length) {
      joinedUsers.push(joinData.userId);

      db.collection("rooms")
        .doc(joinData.roomId)
        .update({ joinedUsers: joinedUsers });
    }
  },
  leaveUser: (context, leaveData) => {
    const currentRoom = state.rooms.find((room) => room.id == leaveData.roomId);
    const joinedUsers = currentRoom.joinedUsers;
    const index = joinedUsers.indexOf(leaveData.userId);
    joinedUsers.splice(index, 1);

    db.collection("rooms")
      .doc(leaveData.roomId)
      .update({ joinedUsers: joinedUsers });
  },
  postMessage: ({ commit }, messageData) => {
    const currentRoom = state.rooms.find(
      (room) => room.id == messageData.roomId
    );
    const messages = currentRoom.messages;
    messages.push(messageData);

    db.collection("rooms")
      .doc(messageData.roomId)
      .update({ messages: messages });
  },
};

const getters = {
  getRooms: (state) => {
    return state.rooms;
  },
  getCurrentRoom: (state) => {
    return state.currentRoom;
  },
};

export default { state, mutations, actions, getters };
