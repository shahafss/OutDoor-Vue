<template>
  <div class="col-sm-6 col-md-4">
    <v-card
      class="mx-auto"
      height="100%"
      outlined
      :to="'/room/' + room.id"
      :class="{ disabled: isFull && !isJoinedUser }"
    >
      <div v-if="isFull" class="full-label">Full</div>

      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ room.category }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{ room.title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ room.description }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >Participants: {{ room.joinedUsers.length }}/{{
              room.participants
            }}</v-list-item-subtitle
          >
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text>
          Join
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["room"],
  computed: {
    isFull() {
      return this.room.participants == this.room.joinedUsers.length;
    },
    isJoinedUser() {
      return this.$store.getters.getUser
        ? this.room.joinedUsers.includes(this.$store.getters.getUser.id)
        : false;
    },
    category() {
      return this.room.category;
    },
  },
};
</script>

<style lang="scss" scoped>
.full-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  font-size: 25px;
  font-weight: 600;
  opacity: 80%;
  height: 4rem;
  position: absolute;
  top: 33%;
  left: 0;
  width: 100%;
}

.disabled {
  pointer-events: none;
}
</style>
