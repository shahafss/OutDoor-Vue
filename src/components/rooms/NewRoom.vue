<template>
  <div class="container-fluid">
    <h1>New Room</h1>
    <div class="new-room-form">
      <form @submit.prevent="createRoom">
        <div class="input">
          <label for="title">Room Title</label>
          <input v-model="roomTitle" type="text" placeholder="Title" />
        </div>
        <div class="input">
          <label for="description">Room Description</label>
          <input
            v-model="roomDescription"
            type="text"
            placeholder="Description"
          />
        </div>
        <div class="input">
          <label for="participants">Participants</label>
          <input
            v-model="roomParticipants"
            type="number"
            placeholder="Participants"
          />
        </div>
        <div class="submit">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
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
        .dispatch("addRoom", {
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

<style lang="scss" scoped>
.container-fluid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.new-room-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
.input {
  margin: 10px auto;
}
.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
