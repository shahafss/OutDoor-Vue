<template>
  <div class="container-fluid">
    <h1>New Activity</h1>
    <div class="new-room-form">
      <form @submit.prevent="createRoom">
        <v-text-field v-model="title" label="Title"></v-text-field>
        <v-select
          v-model="category"
          :items="categoryItems"
          label="Category"
        ></v-select>
        <v-menu
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date"></v-date-picker>
        </v-menu>
        <v-text-field v-model="description" label="Description"></v-text-field>
        <v-text-field
          type="number"
          v-model="participants"
          label="Participants"
        ></v-text-field>
        <AdressAutocomplete
          @address-changed="address = $event"
          :address="getAddress.addressString"
        ></AdressAutocomplete>
        <v-btn type="submit" outlined rounded color="indigo">
          Create
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import AdressAutocomplete from "./AdressAutocomplete";

export default {
  created() {
    this.$store.dispatch("fetchUsers");
  },
  data() {
    return {
      title: "",
      category: null,
      date: "",
      description: "",
      participants: null,
      address: "",
      categoryItems: ["Sport", "Study", "Hangout", "Protest"],
    };
  },
  components: { AdressAutocomplete },
  methods: {
    createRoom() {
      const activityDate = new Date(this.date).toLocaleDateString();
      this.$store
        .dispatch("addRoom", {
          title: this.title,
          category: this.category,
          date: activityDate,
          description: this.description,
          participants: this.participants,
          messages: [],
          address: {
            addressString: this.getAddressString(this.address),
            lat: this.address ? this.address.latitude : this.getAddress.lat,
            lng: this.address ? this.address.longitude : this.getAddress.lng,
          },
          admin: this.$store.state.auth.user.id,
          joinedUsers: [this.$store.state.auth.user.id],
        })
        .then(
          (res) => {
            this.$router.push("/room/" + res.data);
          },
          (error) => {
            console.log("createRoom error>> ", error);
          }
        );
    },
    getAddressString(address) {
      return address
        ? address.formatted_address
        : this.getAddress.addressString;
    },
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },
    getAddress() {
      return this.currentRoom ? this.currentRoom.address : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  display: flex;
  flex-direction: column;
  align-items: center;
  .new-room-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;

    .v-google-places {
      width: 100%;
    }
  }
}
</style>
