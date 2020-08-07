<template>
  <div>
    <div v-if="loggedInUser && isActive && currentRoom">
      <h1>{{ currentRoom.title }}</h1>
      <h2>{{ currentRoom.description }}</h2>
      <h2>
        Participants: {{ currentRoom.joinedUsers.length }}/{{
          currentRoom.participants
        }}
      </h2>
      <hr />
      <div v-for="user in joinedUsers" :key="user">
        {{ user }}
      </div>
      <hr />
      is admin: {{ isAdmin }}
      <div>is joined: {{ isJoinedUser }}</div>
      <div>is full: {{ isFull }}</div>
      <hr />
      <div class="buttons">
        <button
          v-if="!isJoinedUser && !isFull"
          class="btn btn-success"
          @click="joinRoom()"
        >
          Join
        </button>
        <button
          v-else-if="!isAdmin && isJoinedUser"
          class="btn btn-default"
          @click="leaveRoom()"
        >
          Leave
        </button>
        <button
          v-if="isAdmin"
          class="btn btn-danger"
          @click="deleteRoom(currentRoom.id)"
        >
          Delete Room
        </button>
      </div>
    </div>
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
      isActive: true
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
  computed: {
    //TODO move computed props to getters(if possible)
    rooms() {
      return this.$store.getters.getRooms;
    },
    currentRoom() {
      return this.rooms.find(room => room.id == this.roomId);
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

<style lang="scss" scoped></style>
