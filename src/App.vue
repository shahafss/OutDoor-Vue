<template>
  <div>
    <OutDoorHeader></OutDoorHeader>
    <app-fade>
      <router-view />
    </app-fade>
  </div>
</template>

<script>
import Header from "./components/Header";
import AppFade from "./components/AppFade";

export default {
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
  components: {
    OutDoorHeader: Header,
    AppFade
  }
};
</script>

<style lang="scss"></style>
