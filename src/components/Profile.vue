<template>
  <div>
    <h1>Profile page</h1>
    <h2>{{ email }}</h2>
    <hr />
    <button @click="onLogout" class="btn btn-danger">Logout</button>
  </div>
</template>

<script>
export default {
  computed: {
    email() {
      return !this.$store.getters.getUser
        ? false
        : this.$store.getters.getUser.email;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped></style>
