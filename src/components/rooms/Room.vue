<template>
  <div>
    <v-card
      class="room-container"
      outlined
      :to="'/room/' + room.id"
      :class="{ disabled: isFull && !isJoinedUser }"
    >
      <v-badge bordered avatar overlap :color="icon.color" :icon="icon.icon">
        <div>
          <div v-if="isFull" class="full-label">Full</div>

          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline-container">
                <div class="overline mb-2">
                  {{ room.category }}
                </div>
                <div class="overline mb-2">
                  {{ date }}
                </div>
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
              <v-list-item-subtitle
                >active: {{ room.active }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >progress: {{ inProgress }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >starts: {{ room.startTime }}</v-list-item-subtitle
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
          color: "#CE93D8",
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
  mounted() {
    if (this.room.active && !this.isActive) {
      this.room.active = false;
      this.$store.dispatch("updateRoom", this.room);
    }
  },
  computed: {
    isActive() {
      const nowDate = new Date();
      const roomDate = new Date(this.room.date);
      if (roomDate > nowDate) {
        return true;
      }
      if (this.isToday(roomDate) && this.inProgress) {
        const endTime = Date.parse(
          "01/01/2011 " +
            new Date("01/01/2021 " + this.room.endTime).toLocaleTimeString()
        );

        if (this.nowTime < endTime) {
          return true;
        }
      }
      return false;
    },

    inProgress() {
      if (!this.isToday(new Date(this.room.date))) return false;

      const startTime = Date.parse(
        "01/01/2011 " +
          new Date("01/01/2021 " + this.room.startTime).toLocaleTimeString()
      );

      const endTime = Date.parse(
        "01/01/2011 " +
          new Date("01/01/2021 " + this.room.endTime).toLocaleTimeString()
      );

      return this.nowTime > startTime && this.nowTime < endTime;
    },

    isFull() {
      return this.room.participants == this.room.joinedUsers.length;
    },

    isJoinedUser() {
      return this.$store.getters.getUser
        ? this.room.joinedUsers.includes(this.$store.getters.getUser.id)
        : false;
    },

    date() {
      return new Date(this.room.date).toLocaleDateString("eng-GB");
    },

    category() {
      return this.room.category;
    },

    nowTime() {
      return Date.parse("01/01/2011 " + new Date().toLocaleTimeString());
    },

    icon() {
      return this.icons.find((icon) => icon.category == this.room.category);
    },
  },
  methods: {
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.room-container {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2) !important;
  min-height: 200px;
  max-height: 200px;
  max-width: 400px;

  .v-badge {
    display: block;
    position: unset;
    .full-label {
      background-color: #bb8ac8;
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

    .overline-container {
      display: flex;
      justify-content: space-between;
    }
  }
}

.disabled {
  pointer-events: none;
}
</style>
