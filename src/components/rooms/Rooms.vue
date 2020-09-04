<template>
  <div class="container-fluid">
    <router-link to="/new-room" class="create-btn btn btn-primary" tag="button"
      >Create</router-link
    >
    <section class="rooms-container">
      <room
        v-for="room in getRooms"
        :key="room.id"
        :room="room"
        style="width:100%; padding:10px;"
        class="room"
      ></room>
    </section>
  </div>
</template>

<script>
import Room from "./Room";
export default {
  components: {
    Room
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchUsers");
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
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;

  margin-top: 2rem;
  padding-right: 15px;
  padding-left: 15px;
}

.container-fluid {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .rooms-container {
    grid-template-columns: 50% 50%;
  }
}
</style>
