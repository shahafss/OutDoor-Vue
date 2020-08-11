<template>
  <div class="container-fluid">
    <form
      class="room-form"
      v-if="loggedInUser && isActive && currentRoom"
      @submit.prevent="saveRoom"
    >
      <input v-model="title" class="title" type="text" :disabled="!editMode" />
      <textarea
        v-model="description"
        class="description"
        type="text"
        :disabled="!editMode"
      />
      <div>
        <label for="participants"
          >Participants: {{ currentRoom.joinedUsers.length }}/</label
        >
        <input
          v-model="participants"
          id="participants"
          type="number"
          class="participants"
          :disabled="!editMode"
        />
      </div>
      <div class="joined-users">
        <div v-for="user in joinedUsers" :key="user">
          {{ user }}
        </div>
      </div>
      <div class="buttons">
        <button
          v-if="!isJoinedUser && !isFull"
          type="button"
          class="btn btn-success"
          @click="joinRoom()"
        >
          Join
        </button>
        <button
          v-else-if="!isAdmin && isJoinedUser"
          type="button"
          class="btn btn-default"
          @click="leaveRoom()"
        >
          Leave
        </button>
        <button
          v-if="isAdmin"
          type="button"
          class="btn btn-danger"
          @click="deleteRoom(currentRoom.id)"
        >
          Delete Room
        </button>
        <button v-if="!editMode" type="button" @click="editMode = !editMode">
          Edit
        </button>
        <button type="submit">save</button>
      </div>
    </form>
    <div v-else>
      <h1>Loading..</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomId: this.$route.params.id,
      tempTitle: "",
      tempDescription: "",
      tempParticipants: null,
      isActive: true,
      editMode: false
    };
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    this.user = this.$store.getters.getUser;
  },
  watch: {
    editMode(val) {
      console.log(val);
    }
  },
  computed: {
    //TODO move computed props to getters(if possible)
    rooms() {
      return this.$store.getters.getRooms;
    },
    currentRoom() {
      return this.rooms.find(room => room.id == this.roomId);
    },
    title() {
      return this.currentRoom ? this.currentRoom.title : false;
    },
    description() {
      return this.currentRoom ? this.currentRoom.description : false;
    },
    participants() {
      return this.currentRoom ? this.currentRoom.participants : false;
    },
    isAdmin() {
      return this.loggedInUser.id == this.currentRoom.admin;
    },
    isJoinedUser() {
      return this.joinedUsers.includes(this.$store.getters.getUser.email);
    },
    loggedInUser() {
      return this.$store.getters.getUser;
    },
    joinedUsers() {
      const joinedUsers = [];
      this.currentRoom.joinedUsers.forEach(userId => {
        joinedUsers.push(this.$store.state.auth.allUsers[userId].email);
      });
      return joinedUsers;
    },
    isFull() {
      return (
        this.currentRoom.participants == this.currentRoom.joinedUsers.length
      );
    }
  },
  methods: {
    saveRoom() {
      const updatedRoom = {};
      this.$store.dispatch("updateRoom");
      console.log("update room");
      this.editMode = false;
    },
    deleteRoom(id) {
      this.isActive = false;
      this.$store.dispatch("deleteRoom", id).then(
        setTimeout(() => {
          this.$router.push("/rooms");
        }, 1000)
      );
    },
    joinRoom() {
      this.$store.dispatch("joinUser", {
        roomId: this.currentRoom.id,
        userId: this.loggedInUser.id
      });
    },
    leaveRoom() {
      this.$store.dispatch("leaveUser", {
        roomId: this.currentRoom.id,
        userId: this.loggedInUser.id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.room-form {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 50px;
  background: transparent;
  border: transparent;
}
.description {
  font-size: 25px;
  background: transparent;
  border: transparent;
  resize: none;
  min-height: 8rem;
  overflow: auto;
}
.participants {
  width: 5rem;
  border: none;
  font-size: 25px;
  font-weight: 500;
}
label {
  font-size: 25px;
}
.joined-users {
  border: 1px solid black;
  width: 22rem;
  height: 10rem;
}
.buttons {
  margin-top: 2rem;
}
</style>
