<template>
  <ODNavbar :main="true">
    <v-container fluid>
      <v-btn to="/new-room" color="blue" dark fixed bottom right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <div class="filters">
        <div v-for="filter in filters" :key="filter.category" class="filter">
          <v-checkbox
            :label="filter.category"
            :color="filter.color"
            :value="filter.category"
            v-model="checkedFilters"
            hide-details
          ></v-checkbox>
        </div>
      </div>
      <transition-group role="section" class="rooms-container" name="fade">
        <room
          v-for="room in getRooms"
          :key="room.id"
          :room="room"
          :style="{ width: '100%', padding: '10px' }"
          class="room"
        ></room>
      </transition-group>
    </v-container>
  </ODNavbar>
</template>

<script>
import Room from "./Room";
import ODNavbar from "../ODNavbar";

export default {
  data() {
    return {
      checkedFilters: [],
      filters: [
        { category: "Sport", color: "orange" },
        { category: "Hangout", color: "info" },
        { category: "Protest", color: "red" },
        { category: "Study", color: "#CE93D8" },
      ],
    };
  },
  components: {
    ODNavbar,
    Room,
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchRooms");
  },
  computed: {
    getRooms() {
      if (!this.checkedFilters.length) return this.$store.getters.getRooms;
      return this.$store.getters.getRooms.filter((room) =>
        this.checkedFilters.includes(room.category)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.container {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .filters {
    display: flex;
    border: 2px solid #add8e6;
    border-radius: 8px;
    padding: 10px;

    .filter {
      padding: 0 10px;
      .v-input {
        margin: 0;
      }
    }
  }

  .rooms-container {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    width: 100%;
    margin-top: 2rem;
    padding-right: 15px;
    padding-left: 15px;
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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
