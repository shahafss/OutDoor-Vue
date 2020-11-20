<template>
  <v-app>
    <nav-drawer></nav-drawer>
    <v-main>
      <AppFade>
        <router-view></router-view>
      </AppFade>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer";
import AppFade from "./components/AppFade";

export default {
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
  components: {
    AppFade,
    NavDrawer,
  },
};
</script>

<style lang="scss">
body,
html {
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
}

a {
  text-decoration: none;
}
</style>
