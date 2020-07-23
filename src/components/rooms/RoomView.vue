<template>
  <div>
    <div v-if="isActive">
      <h1>{{ currentRoom.title }}</h1>
      <h2>{{ currentRoom.description }}</h2>
      <h2>Participants: {{ currentRoom.participants }}</h2>
      <hr />
      <button @click="deleteRoom(currentRoom.id)">Delete Room</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      rooms: [],
      isActive: true
    };
  },
  created() {
    this.$store.dispatch("fetchRooms");
  },
  beforeMount() {
    this.rooms = this.$store.getters.getRooms;
  },
  computed: {
    getRooms() {
      return this.$store.getters.getRooms;
    },
    currentRoom() {
      return this.getRooms.find(room => room.id == this.id);
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
