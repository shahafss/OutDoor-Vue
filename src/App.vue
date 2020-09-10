<template>
  <div style="height:100%">
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

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
}
</style>
