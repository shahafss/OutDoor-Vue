<template>
  <div>
    <h1>Profile page</h1>
    <hr />
    <button @click="onLogout" class="btn btn-danger">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped></style>
