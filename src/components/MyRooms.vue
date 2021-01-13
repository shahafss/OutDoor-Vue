<template>
  <ODNavBar :main="true">
    <h1 style="text-align: center;">My Rooms</h1>
    <v-tabs v-model="tab" background-color="indigo" fixed-tabs dark>
      <v-tabs-slider color="white"></v-tabs-slider>

      <v-tab v-for="item in tabItems" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item.tab">
        <transition-group class="rooms-container" role="section" name="fade">
          <room
            v-for="room in tab === 0 ? createdRooms : joinedRooms"
            :key="room.id"
            :room="room"
            class="room"
          ></room>
        </transition-group>
        <h4 class="empty-msg" v-if="item.tab === 'Created' && !createdRooms">
          You didn't create any room yet..
        </h4>
        <h4 class="empty-msg" v-if="item.tab === 'Joined' && !joinedRooms">
          You didn't join any room yet..
        </h4>
      </v-tab-item>
    </v-tabs-items>
  </ODNavBar>
</template>

<script>
import ODNavBar from "./nav/ODNavbar";
import Room from "../components/rooms/Room";

export default {
  data() {
    return {
      tab: null,
      tabItems: [
        {
          tab: "Created",
        },
        { tab: "Joined" },
      ],
    };
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchRooms");
  },
  components: {
    ODNavBar,
    Room,
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    rooms() {
      return this.$store.getters.getRooms;
    },
    createdRooms() {
      if (!this.user) return;
      const createdRooms = this.rooms.filter(
        (room) => room.admin == this.user.id
      );
      return createdRooms;
    },
    joinedRooms() {
      const joinedRooms = this.rooms
        .filter((room) => room.joinedUsers.includes(this.user.id))
        .filter((room) => room.admin !== this.user.id);
      return joinedRooms;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tabs {
  max-width: 30rem;
  border-radius: 25px;
  margin: auto;
}
.rooms-container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  width: 100%;
  margin-top: 2rem;
  padding-right: 15px;
  padding-left: 15px;

  .room {
    border-radius: 4px;
    margin: 0.5rem;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
  }
}

.empty-msg {
  text-align: center;
}

@media (max-width: 768px) {
  .rooms-container {
    grid-template-columns: 50% 50% !important;
  }
}

@media (max-width: 375px) {
  .rooms-container {
    grid-template-columns: 100% !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
