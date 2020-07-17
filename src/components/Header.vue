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
        <li class="dropdown">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="flase"
            >Save & Load <span class="caret"></span
          ></a>
          <ul class="dropdown-menu">
            <li><a href="#">Save Data</a></li>
            <li><a href="#">Load Data</a></li>
          </ul>
        </li>
        <router-link to="/profile" tag="li"><a>Profile</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
