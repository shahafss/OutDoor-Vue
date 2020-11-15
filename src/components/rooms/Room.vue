<template>
  <div>
    <v-card
      class="mx-auto"
      minHeight="200px"
      minWidth="200px"
      outlined
      :to="'/room/' + room.id"
      :class="{ disabled: isFull && !isJoinedUser }"
    >
      <v-badge avatar :color="icon.color" :icon="icon.icon" overlap>
        <div>
          <div v-if="isFull" class="full-label">Full</div>

          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                {{ room.category }}
              </div>
              <v-list-item-title class="headline mb-1">
                {{ room.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                room.description
              }}</v-list-item-subtitle>
              <v-list-item-subtitle
                >Participants: {{ room.joinedUsers.length }}/{{
                  room.participants
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-badge>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["room"],
  data() {
    return {
      icons: [
        { category: "Sport", icon: "mdi-basketball", color: "#ffa600" },
        {
          category: "Study",
          icon: "mdi-book-open-blank-variant",
          color: "#bb8ac8",
        },
        {
          category: "Hangout",
          icon: "mdi-account-group-outline",
          color: "#1f74ff",
        },
        {
          category: "Protest",
          icon: "mdi-alert-octagram-outline",
          color: "#ff4745",
        },
      ],
    };
  },
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
    icon() {
      return this.icons.find((icon) => icon.category == this.room.category);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-badge {
  display: block;
  position: unset;
}

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
