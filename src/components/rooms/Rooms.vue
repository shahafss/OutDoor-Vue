<template>
  <div class="container-fluid">
    <p v-if="email">Your email address: {{ email }}</p>
    <router-link to="/new-room" class="create-btn btn btn-primary" tag="button"
      >Create</router-link
    >
    <div class="rooms-container">
      <room v-for="room in getRooms" :key="room.id" :room="room"></room>
    </div>
  </div>
</template>

<script>
import Room from "./Room";
export default {
  components: {
    Room
  },
  created() {
    this.$store.dispatch("fetchUser");
    this.$store.dispatch("fetchRooms");
  },
  computed: {
    email() {
      return !this.$store.getters.getUser
        ? false
        : this.$store.getters.getUser.email;
    },
    getRooms() {
      return this.$store.getters.getRooms;
    }
  }
};
</script>

<style lang="scss" scoped>
.rooms-container {
  margin-top: 2rem;
  padding-right: 15px;
  padding-left: 15px;
}

.container-fluid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
