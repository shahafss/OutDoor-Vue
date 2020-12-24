<template>
  <v-app>
    <v-main>
      <AppFade>
        <router-view></router-view>
      </AppFade>
    </v-main>
  </v-app>
</template>

<script>
import AppFade from "./components/utils/AppFade";

export default {
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
  components: {
    AppFade,
  },
};
</script>

<style lang="scss">
body,
html,
.v-application {
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  font-family: sans-serif;
}

a {
  text-decoration: none;
}
</style>
