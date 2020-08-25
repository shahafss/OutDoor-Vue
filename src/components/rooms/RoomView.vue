<template>
  <div class="container-fluid">
    hey scroll: {{ scrollPosition }}
    <form
      class="room-form"
      v-if="loggedInUser && isActive && currentRoom"
      @submit.prevent="saveRoom"
    >
      <input
        :value="title"
        ref="title"
        class="title"
        type="text"
        :disabled="!editMode"
      />
      <textarea
        :value="description"
        ref="description"
        class="description"
        type="text"
        :disabled="!editMode"
      />
      <div>
        <label for="participants"
          >Participants: {{ currentRoom.joinedUsers.length }}/</label
        >
        <input
          :value="participants"
          ref="participants"
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
      <div class="chat">
        <div class="messages-container" ref="messages">
          <u class="messages">
            <li class="message" v-for="message in messages" :key="message.id">
              {{ message.username }}: {{ message.text }}
              <span>{{ message.timestamp }}</span>
            </li>
          </u>
        </div>
        <div class="user-input">
          <input v-model="message" type="text" placeholder="message.." />
          <button @click="sendMessage(message)">Send</button>
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
        <button
          v-if="isAdmin && !editMode"
          type="button"
          @click.prevent="editMode = !editMode"
        >
          Edit
        </button>
        <button v-if="editMode" type="submit">Save</button>
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
      isActive: true,
      editMode: false,
      message: "",
      scrollPosition: null
    };
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    this.user = this.$store.getters.getUser;
    window.addEventListener("scroll", this.updateScroll);
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
    },
    messages() {
      return this.currentRoom ? this.currentRoom.messages : false;
    }
  },
  methods: {
    updateScroll() {
      // console.log("refs>", this.$refs);
      this.scrollPosition = window.scrollY;
    },
    sendMessage(message) {
      const messageData = {
        text: message,
        username: this.$store.getters.getUser.username,
        timestamp: new Date(),
        roomId: this.currentRoom.id
      };
      this.$store.dispatch("postMessage", messageData);
      this.message = "";
    },
    saveRoom() {
      const editedData = {
        title: this.$refs.title.value,
        description: this.$refs.description.value,
        participants: this.$refs.participants.value
      };
      const updatedRoom = { ...this.currentRoom, ...editedData };
      this.$store.dispatch("updateRoom", updatedRoom);
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
.chat {
  margin-top: 1rem;
  padding: 10px;
  border: 1px solid black;

  .messages-container {
    border: 1px solid green;
    padding: 10px;
    overflow: auto;
    max-height: 15rem;
    .messages {
      list-style-type: none;
      text-decoration: none;

      .message {
        padding: 2px;
        margin: 2px 0;
        border: 1px solid rgba(128, 128, 128, 0.288);
        border-radius: 4px;
        background-color: lightcyan;
      }
    }
  }
  .user-input {
    margin-top: 1rem;
  }
}

.buttons {
  margin-top: 2rem;
}
</style>
