<template>
  <div class="container-fluid">
    <h1>New Activity</h1>
    <div class="new-room-form">
      <form @submit.prevent="createRoom">
        <div class="input">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="title"
            class="form-control"
            type="text"
            required
          />
        </div>
        <div class="input">
          <div class="form-group">
            <label for="sel1">Category:</label>
            <select v-model="category" class="form-control" id="sel1" required>
              <option>Sport</option>
              <option>Study</option>
              <option>Hangout</option>
              <option>Protest</option>
            </select>
          </div>
        </div>
        <div class="input">
          <label for="date">Date</label>
          <input
            v-model="date"
            type="datetime-local"
            id="date"
            class="form-control"
          />
        </div>
        <div class="input">
          <label for="description">Description</label>
          <input
            v-model="description"
            type="text"
            id="description"
            class="form-control"
          />
        </div>
        <div class="input">
          <label for="participants">Participants</label>
          <input
            id="participants"
            v-model="participants"
            type="number"
            placeholder="0"
            class="form-control"
          />
        </div>
        <div class="input">
          <label for="map">Address</label>
          <vue-google-autocomplete
            role="input"
            required
            v-model="address"
            id="map"
            classname="form-control"
            v-on:placechanged="getAddressData"
            country="il"
          >
          </vue-google-autocomplete>
        </div>
        <div class="submit">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  data() {
    return {
      title: "",
      category: null,
      date: "",
      description: "",
      participants: null,
      address: "",
    };
  },
  components: { VueGoogleAutocomplete },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
    },
    createRoom() {
      const tempDate = new Date(this.date).toDateString();
      console.log(tempDate);
      this.$store.dispatch("addRoom", {
        title: this.title,
        category: this.category,
        date: new Date(this.date).toLocaleTimeString(),
        description: this.description,
        participants: this.participants,
        address: {
          addressString: this.getAddressString(this.address),
          lat: this.address.latitude,
          lng: this.address.longitude,
        },
      });
      this.$store.dispatch("fetchRooms");
      const newRoom = this.getRooms.find(
        (room) => room.description == this.description
      );
      if (newRoom !== undefined) {
        this.$router.push("/room/" + newRoom.id);
      }
    },
    getAddressString(address) {
      const addressString = `${address.route} ${address.street_number}, ${address.locality}`;
      return addressString;
    },
  },
  computed: {
    getRooms() {
      return this.$store.getters.getRooms;
    },
  },
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
