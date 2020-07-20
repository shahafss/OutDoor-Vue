<template>
  <div>
    <room v-for="room in getRooms" :key="room.id" :room="room"></room>
  </div>
</template>

<script>
import Room from "./Room";
export default {
  components: {
    Room
  },
  created() {
    this.$store.dispatch("fetchRooms");
  },
  computed: {
    getRooms() {
      return this.$store.getters.getRooms;
    }
  }
};
</script>

<style lang="scss" scoped></style>
