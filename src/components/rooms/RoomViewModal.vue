<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
          Edit
        </v-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Room</span>
        </v-card-title>
        <v-container>
          <div>
            <div class="input-container">
              <v-text-field v-model="title" label="Title"></v-text-field>
            </div>
            <div class="input-container">
              <v-textarea
                outlined
                label="Description"
                v-model="description"
              ></v-textarea>
            </div>
            <div class="input-container">
              <v-text-field
                v-model="participants"
                label="Participants"
                type="number"
              ></v-text-field>
            </div>
            <div class="input-container">
              <v-text-field
                v-model="address"
                label="Address"
                type="text"
              ></v-text-field>
            </div>
            <!-- <div cols="12>
                <AdressAutocomplete
                  @address-changed="address = $event"
                  :address="getAddress ? getAddress.addressString : ``"
                  :center="true"
                ></AdressAutocomplete>
              </div> -->
          </div>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
// import AdressAutocomplete from "./AdressAutocomplete";
export default {
  props: ["room"],
  data() {
    return {
      title: this.room.title,
      description: this.room.description,
      participants: this.room.participants,
      address: this.room.address,
      dialog: false,
    };
  },
  components: {
    // AdressAutocomplete,
  },
  methods: {
    save() {
      this.dialog = false;
      const editedRoom = {
        title: this.title,
        description: this.description,
        participants: this.participants,
        address: this.address,
      };
      this.$emit("roomSaved", editedRoom);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 25px 35px;
}
</style>
