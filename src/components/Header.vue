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
        <router-link to="/login" tag="li"><a>Login</a></router-link>
        <router-link to="/signup" tag="li"><a>Sign-Up</a></router-link>
        <router-link to="/profile" tag="li"><a>Profile</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
