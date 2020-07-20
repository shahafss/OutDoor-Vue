<template>
  <div>
    <h1>{{ currentRoom.title }}</h1>
    <h2>{{ currentRoom.description }}</h2>
    <h2>Participants: {{ currentRoom.participants }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      rooms: []
    };
  },
  created() {
    this.rooms = this.$store.getters.getRooms;
    // console.log(this.rooms);
  },
  computed: {
    currentRoom() {
      return this.rooms.find(room => room.id == this.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
