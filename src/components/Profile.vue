<template>
  <div class="container-fluid">
    <h1>{{ name }} ({{ userName }})</h1>
    <h2>{{ email }}</h2>
    <hr />
    <v-btn depressed color="error" @click="onLogout">
      Logout
    </v-btn>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchUsers");
  },
  computed: {
    user() {
      return !this.$store.getters.getUser ? false : this.$store.getters.getUser;
    },
    userName() {
      return !this.user ? false : this.user.username;
    },
    name() {
      return !this.user
        ? false
        : this.user.firstName + " " + this.user.lastName;
    },
    email() {
      return !this.$store.getters.getUser
        ? false
        : this.$store.getters.getUser.email;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
