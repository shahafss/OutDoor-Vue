<template>
  <v-container>
    <v-btn to="/new-room" color="blue" dark fixed top right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-btn-toggle color="blue accent-3" mandatory>
      <v-btn value="All" @click="setFilter($event)">
        All
      </v-btn>

      <v-btn value="Sport" @click="setFilter($event)">
        Sport
      </v-btn>

      <v-btn value="Study" @click="setFilter($event)">
        Study
      </v-btn>

      <v-btn value="Hangout" @click="setFilter($event)">
        Hangout
      </v-btn>

      <v-btn value="Protest" @click="setFilter($event)">
        Protest
      </v-btn>
    </v-btn-toggle>
    <section class="rooms-container">
      <room
        v-for="room in getRooms"
        :key="room.id"
        :room="room"
        style="width:100%; padding:10px;"
        class="room"
      ></room>
    </section>
  </v-container>
</template>

<script>
import Room from "./Room";
export default {
  data() {
    return {
      filter: null,
    };
  },
  components: {
    Room,
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchRooms");
  },
  computed: {
    getRooms() {
      if (this.filter) {
        return this.$store.getters.getRooms.filter(
          (room) => room.category == this.filter
        );
      } else {
        return this.$store.getters.getRooms;
      }
    },
  },
  methods: {
    setFilter(filter) {
      if (filter.target.textContent.trim() == "All") {
        this.filter = null;
      } else {
        this.filter = filter.target.textContent.trim();
      }
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
