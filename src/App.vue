<template>
  <v-app>
    <drawer></drawer>
    <v-main>
      <AppFade>
        <router-view></router-view>
      </AppFade>
    </v-main>
    <!-- <v-footer app> -->
    <!-- -->
    <!-- </v-footer> -->
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import AppFade from "./components/AppFade";

export default {
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
  components: {
    AppFade,
    Drawer,
  },
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
