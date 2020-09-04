<template>
  <div class="container-fluid">
    <h1>New Room</h1>
    <div class="new-room-form">
      <form @submit.prevent="createRoom">
        <div class="input">
          <label for="title">Room Title</label>
          <input
            id="title"
            v-model="roomTitle"
            class="form-control"
            type="text"
            placeholder="Title"
          />
        </div>
        <div class="input">
          <label for="description">Room Description</label>
          <input
            id="description"
            class="form-control"
            v-model="roomDescription"
            type="text"
            placeholder="Description"
          />
        </div>
        <div class="input">
          <label for="participants">Participants</label>
          <input
            id="participants"
            v-model="roomParticipants"
            type="number"
            placeholder="0"
            class="form-control"
          />
        </div>
        <div class="input">
          <label for="map">Address</label>
          <vue-google-autocomplete
            v-model="address"
            id="map"
            classname="form-control"
            placeholder="Address"
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
      roomTitle: "",
      roomDescription: "",
      roomParticipants: null,
      address: ""
    };
  },
  components: { VueGoogleAutocomplete },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
    },
    createRoom() {
      this.$store
        .dispatch("addRoom", {
          title: this.roomTitle,
          description: this.roomDescription,
          participants: this.roomParticipants,
          address: {
            addressString: this.getAddressString(this.address),
            lat: this.address.latitude,
            lng: this.address.longitude
          }
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
    },
    getAddressString(address) {
      const addressString =
        address.route + " " + address.street_number + ", " + address.locality;
      return addressString;
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
