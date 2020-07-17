<template>
  <div>
    <OutDoorHeader></OutDoorHeader>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    OutDoorHeader: Header
  },
  created() {
    this.$store.dispatch("initRooms");
  }
};
</script>

<style lang="scss"></style>
