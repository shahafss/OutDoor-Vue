<template>
  <div>
    <OutDoorHeader></OutDoorHeader>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
  components: {
    OutDoorHeader: Header
  }
};
</script>

<style lang="scss"></style>
