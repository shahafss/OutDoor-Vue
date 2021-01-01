<template>
  <div>
    <div id="bg">
      <img src="https://picsum.photos/id/190/1024/683" alt="" />
    </div>
    <div class="container">
      <h1>How did you get here..?</h1>
      <router-link to="/rooms">
        <v-btn rounded outlined color="green">
          <v-icon right dark>
            mdi-arrow-left-circle
          </v-icon>
          Back to browse rooms
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#bg {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 50%;
    min-height: 50%;
  }
}
.container {
  background-color: transparent;
  position: absolute;
  width: 100%;
  color: white;
  margin-top: 6rem;

  h1 {
    white-space: nowrap;
  }

  .v-btn {
    margin-top: 2rem;

    .v-icon {
      margin: 0;
      margin-right: 10px;
    }
  }
}
</style>
