<template>
  <v-navigation-drawer v-model="isShown" temporary app>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../../assets/outdoor_logo.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <router-link v-if="user" to="/profile" tag="v-list-item">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.firstName }} {{ user.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </router-link>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item to="/rooms">
        <v-list-item-icon>
          <v-icon>mdi-cube-scan</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          Rooms
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/my-rooms" link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Rooms</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Starred</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: { shown: Boolean },
  data() {
    return {};
  },
  computed: {
    user() {
      if (!this.$store.getters.getUser) return;
      return this.$store.getters.getUser;
    },
    isShown: {
      get() {
        return this.shown ? this.shown : false;
      },
      set(drawerDismiss) {
        this.$emit("drawerDismiss", drawerDismiss);
        return drawerDismiss;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
