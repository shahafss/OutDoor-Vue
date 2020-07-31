<template>
  <div>
    <div v-if="loggedInUser && isActive && currentRoom">
      <h1>{{ currentRoom.title }}</h1>
      <h2>{{ currentRoom.description }}</h2>
      <h2>Participants: {{ currentRoom.participants }}</h2>
      <hr />
      {{ currentRoom.joinedUsers }}
      <hr />
      {{ isAdmin }}
      <hr />
      <button
        v-if="isAdmin"
        class="btn btn-danger"
        @click="deleteRoom(currentRoom.id)"
      >
        Delete Room
      </button>
      <button class="btn btn-success" @click="joinRoom()">Join</button>
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
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchUser");
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
    loggedInUser() {
      return this.$store.state.auth.user; // getUser getter?
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
    getUserById(id) {},
    joinRoom() {
      this.$store.dispatch("joinUser", {
        roomId: this.currentRoom.id,
        userId: this.loggedInUser.id
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
