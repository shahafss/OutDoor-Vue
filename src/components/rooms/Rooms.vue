<template>
  <div class="container-fluid">
    <router-link to="/new-room" class="create-btn btn btn-primary" tag="button"
      >Create</router-link
    >
    <div class="filters">
      <div>
        <label class="checkbox-inline"
          ><input
            type="radio"
            name="catradio"
            @change="setFilter($event)"
            value="All"
            checked
          />All</label
        >
      </div>
      <div>
        <label class="checkbox-inline"
          ><input
            type="radio"
            name="catradio"
            @change="setFilter($event)"
            value="Sport"
          />Sport</label
        >
      </div>
      <div>
        <label class="checkbox-inline"
          ><input
            type="radio"
            name="catradio"
            value="Study"
            @change="setFilter($event)"
          />Study</label
        >
      </div>
      <label class="checkbox-inline"
        ><input
          type="radio"
          name="catradio"
          value="Hangout"
          @change="setFilter($event)"
        />Hangout</label
      >
      <div>
        <label class="checkbox-inline"
          ><input
            type="radio"
            name="catradio"
            value="Protest"
            @change="setFilter($event)"
          />Protest</label
        >
      </div>
    </div>
    <section class="rooms-container">
      <room
        v-for="room in getRooms"
        :key="room.id"
        :room="room"
        style="width:100%; padding:10px;"
        class="room"
      ></room>
    </section>
  </div>
</template>

<script>
import Room from "./Room";
export default {
  data() {
    return {
      filter: null
    };
  },
  components: {
    Room
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
          room => room.category == this.filter
        );
      } else {
        return this.$store.getters.getRooms;
      }
    }
  },
  methods: {
    setFilter(filter) {
      if (filter.target.value == "All") {
        this.filter = null;
      } else {
        this.filter = filter.target.value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
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
