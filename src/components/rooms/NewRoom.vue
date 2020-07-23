<template>
  <div class="container-fluid">
    <h1>New Room</h1>
    <div class="inputs">
      <input v-model="roomTitle" type="text" placeholder="Title" />
      <input v-model="roomDescription" type="text" placeholder="Description" />
      <input
        v-model="roomParticipants"
        type="number"
        placeholder="Participants"
      />
    </div>
    <button @click="createRoom()">Create</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomTitle: "",
      roomDescription: "",
      roomParticipants: 0
    };
  },
  methods: {
    createRoom() {
      this.$store
        .dispatch("createRoom", {
          title: this.roomTitle,
          description: this.roomDescription,
          participants: this.roomParticipants
        })
        .then(
          this.$store.dispatch("fetchRooms"),
          setTimeout(() => {
            const newRoom = this.getRooms.find(
              room => room.description == this.roomDescription
            );
            console.log(newRoom.id);
            if (newRoom !== undefined) {
              this.$router.push("/room/" + newRoom.id);
            }
          }, 1000)
        );
    }
  },
  computed: {
    getRooms() {
      return this.$store.getters.getRooms;
    }
  }
};
</script>

<style lang="scss" scoped></style>
