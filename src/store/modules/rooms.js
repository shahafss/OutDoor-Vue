import db from "../../firebase";
import globalStore from "../store";

const state = {
  rooms: []
};

const mutations = {
  ADD_ROOM(state, room) {
    state.rooms.push({
      id: room.id,
      title: room.title,
      description: room.description,
      participants: room.participants,
      joinedUsers: room.joinedUsers,
      admin: room.admin,
      timestamp: new Date()
    });
  },
  DELETE_ROOM(state, id) {
    const index = state.rooms.findIndex(room => room.id == id);
    if (index >= 0) state.rooms.splice(index, 1);
  },
  FETCH_ROOMS(state, rooms) {
    state.rooms = rooms;
  },
  UPDATE_ROOM(state, roomData) {
    if (roomData.roomIndex >= 0) {
      state.rooms.splice(roomData.roomIndex, 1);
      state.rooms.splice(roomData.roomIndex, 0, roomData.room);
    }
  }
};

const actions = {
  initRealtimeListeners({ commit }) {
    db.collection("rooms").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const source = change.doc.metadata.hasPendingWrites
            ? "Local"
            : "Server";

          if (source === "Server") {
            if (!state.rooms.some(room => room.id == change.doc.id)) {
              commit("ADD_ROOM", {
                id: change.doc.id,
                title: change.doc.data().title,
                description: change.doc.data().description,
                participants: change.doc.data().participants,
                joinedUsers: change.doc.data().joinedUsers,
                admin: change.doc.data().admin
              });
            }
          }
        }

        if (change.type === "modified") {
          const room = state.rooms.find(room => room.id == change.doc.id);
          const roomIndex = state.rooms.indexOf(room);

          const roomData = {
            roomIndex: roomIndex,
            room: change.doc.data()
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
    db.collection("rooms")
      .get()
      .then(querySnapshot => {
        let tempRooms = [];
        querySnapshot.forEach(doc => {
          const roomData = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            participants: doc.data().participants,
            admin: doc.data().admin,
            joinedUsers: doc.data().joinedUsers,
            timestamp: doc.data().timestamp
          };
          if (roomData.title !== undefined) tempRooms.push(roomData);
        });

        tempRooms.sort((a, b) => new Date(a.timestamp - b.timestamp)).reverse();
        commit("FETCH_ROOMS", tempRooms);
      });
  },
  addRoom: ({ commit }, room) => {
    db.collection("rooms")
      .add({
        title: room.title,
        description: room.description,
        participants: room.participants,
        admin: globalStore.state.auth.user.id,
        joinedUsers: [globalStore.state.auth.user.id],
        timestamp: new Date()
      })
      .then(docRef => {
        commit("ADD_ROOM", {
          id: docRef.id,
          title: docRef.title,
          description: docRef.description,
          participants: docRef.participants,
          admin: globalStore.state.auth.user.id,
          joinedUsers: [globalStore.state.auth.user.id]
        });
      });
  },
  deleteRoom: ({ commit }, id) => {
    db.collection("rooms")
      .doc(id)
      .delete()
      .then(() => {
        commit("DELETE_ROOM", id);
      });
  },
  updateRoom: (context, updatedRoom) => {
    const currentRoomId = state.rooms.find(room => room.id == updatedRoom.id)
      .id;
    db.collection("rooms")
      .doc(currentRoomId)
      .update(updatedRoom);
  },
  joinUser: (context, joinData) => {
    const currentRoom = state.rooms.find(room => room.id == joinData.roomId);
    const joinedUsers = currentRoom.joinedUsers;
    if (currentRoom.participants > currentRoom.joinedUsers.length) {
      joinedUsers.push(joinData.userId);

      db.collection("rooms")
        .doc(joinData.roomId)
        .update({ joinedUsers: joinedUsers });
    }
  },
  leaveUser: (context, leaveData) => {
    const currentRoom = state.rooms.find(room => room.id == leaveData.roomId);
    const joinedUsers = currentRoom.joinedUsers;
    const index = joinedUsers.indexOf(leaveData.userId);
    joinedUsers.splice(index, 1);

    db.collection("rooms")
      .doc(leaveData.roomId)
      .update({ joinedUsers: joinedUsers });
  }
};

const getters = {
  getRooms: state => {
    return state.rooms;
  }
};

export default { state, mutations, actions, getters };
