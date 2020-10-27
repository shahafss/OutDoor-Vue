<template>
  <v-navigation-drawer v-if="user" permanent expand-on-hover app>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/outdoor_logo.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <router-link to="/profile" tag="v-list-item">
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
      <router-link to="/rooms" tag="v-list-item">
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          Rooms
        </v-list-item-title>
      </router-link>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Shared with me</v-list-item-title>
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
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style lang="scss" scoped></style>
