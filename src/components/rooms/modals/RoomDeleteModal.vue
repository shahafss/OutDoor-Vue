<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="250px">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
          Delete
        </v-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Delete Room</span>
        </v-card-title>
        <v-container>
          <p>Are you sure?</p>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="red" text @click="$emit('roomDeleted')">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.v-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
  }
}
</style>
