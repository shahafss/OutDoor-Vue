<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid"></div>
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand" href="#">OutDoor</router-link>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav nav">
        <router-link activeClass="active" tag="li" to="/rooms"
          ><a>Rooms</a></router-link
        >
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <router-link v-if="!auth" to="/login"><a>Login</a></router-link>
        </li>
        <li>
          <router-link v-if="!auth" to="/signup"><a>Sign-Up</a></router-link>
        </li>
        <li>
          <router-link v-if="auth" to="/profile"><a>Profile</a></router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss" scoped></style>
