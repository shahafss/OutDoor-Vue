import db from "../../firebase";
import globalStore from "../store";

const state = {
  rooms: []
};

const mutations = {
  CREATE_ROOM(state, room) {
    state.rooms.push({
      id: room.id,
      title: room.title,
      description: room.description,
      participants: room.participants,
      admin: room.admin,
      joinedUsers: room.joinedUsers
    });
  },
  DELETE_ROOM(state, id) {
    const index = state.rooms.findIndex(room => room.id == id);
    if (index >= 0) state.rooms.splice(index, 1);
  },
  FETCH_ROOMS(state, rooms) {
    state.rooms = rooms;
  },
  UPDATE_JOINED_USERS(state, joinedUsersData) {
    const index = state.rooms.indexOf(joinedUsersData.currentRoom);
    state.rooms[index].joinedUsers = joinedUsersData.joinedUsers;
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
            participants: doc.data().participants,
            admin: doc.data().admin,
            joinedUsers: doc.data().joinedUsers
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
        participants: room.participants,
        admin: globalStore.state.auth.user.id,
        joinedUsers: [globalStore.state.auth.user.id]
      })
      .then(docRef => {
        context.commit("CREATE_ROOM", {
          id: docRef.id,
          title: docRef.title,
          description: docRef.description,
          participants: docRef.participants,
          admin: globalStore.state.auth.user.id,
          joinedUsers: [globalStore.state.auth.user.id]
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
  },
  joinUser: ({ commit }, joinData) => {
    const currentRoom = state.rooms.find(room => room.id == joinData.roomId);
    const joinedUsers = currentRoom.joinedUsers;
    if (currentRoom.participants > currentRoom.joinedUsers.length) {
      joinedUsers.push(joinData.userId);

      db.collection("rooms")
        .doc(joinData.roomId)
        .update({ joinedUsers: joinedUsers });

      commit("UPDATE_JOINED_USERS", {
        currentRoom: currentRoom,
        joinedUsers: joinedUsers
      });
    }

    // listen to data change on firestore // TODO
    // db.collection("rooms")
    //   .doc(joinData.roomId)
    //   .onSnapshot(doc => {

    //   });
  },
  leaveUser: ({ commit }, leaveData) => {
    const currentRoom = state.rooms.find(room => room.id == leaveData.roomId);
    const joinedUsers = currentRoom.joinedUsers;
    const index = joinedUsers.indexOf(leaveData.userId);
    joinedUsers.splice(index, 1);

    db.collection("rooms")
      .doc(leaveData.roomId)
      .update({ joinedUsers: joinedUsers });

    commit("UPDATE_JOINED_USERS", {
      currentRoom: currentRoom,
      joinedUsers: joinedUsers
    });

    // listen to data change on firestore //TODO
    // db.collection("rooms")
    //   .doc(leaveData.roomId)
    //   .onSnapshot(doc => {});
  }
};

const getters = {
  getRooms: state => {
    return state.rooms;
  }
};

export default { state, mutations, actions, getters };
