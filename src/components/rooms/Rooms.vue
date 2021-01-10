<template>
  <ODNavbar :main="true">
    <v-container fluid>
      <v-btn to="/new-room" color="blue" dark fixed bottom right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <RoomsFilters @filterChange="filters = $event"></RoomsFilters>
      <transition-group role="section" class="rooms-container" name="fade">
        <room
          v-for="room in rooms"
          :key="room.id"
          :room="room"
          class="room"
        ></room>
      </transition-group>
    </v-container>
  </ODNavbar>
</template>

<script>
import Room from "./Room";
import ODNavbar from "../nav/ODNavbar";
import RoomsFilters from "./RoomsFilters";

export default {
  data() {
    return {
      filters: [],
    };
  },
  components: {
    ODNavbar,
    Room,
    RoomsFilters,
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchRooms");
  },
  computed: {
    rooms() {
      const rooms = this.$store.getters.getRooms.filter((room) => room.active);

      return this.filters.length
        ? rooms.filter((room) => this.filters.includes(room.category))
        : rooms.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

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
        0px 5px 8px 0px rgba(0, 0, 0, 0.14),
        0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
    }
  }
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
  transition: opacity 0.3s;
}
.fade-leave-active {
  position: absolute;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-move {
  transition: transform 1s ease;
}
</style>
