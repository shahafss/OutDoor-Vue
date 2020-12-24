<template>
  <ODNavbar :main="true">
    <v-card class="card">
      <img src="https://picsum.photos/300" class="profile-img" />
      <div v-if="user">
        <h1>{{ name }} ({{ user.username }})</h1>
        <div class="info-container">
          <h2 :style="{ marginTop: '2rem' }">Info</h2>
          <hr />
          <v-card-title
            class="card-title"
            :style="{ justifyContent: 'center' }"
            >{{ user.email }}</v-card-title
          >
        </div>
        <v-btn depressed color="error" @click="onLogout">
          Logout
        </v-btn>
      </div>
    </v-card>
  </ODNavbar>
</template>

<script>
import ODNavbar from "./ODNavbar";
export default {
  created() {
    this.$store.dispatch("fetchUsers");
  },
  components: {
    ODNavbar,
  },
  computed: {
    user() {
      if (!this.$store.getters.getUser) return;

      return this.$store.getters.getUser;
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

<style lang="scss" scoped>
.card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .profile-img {
    width: 10rem;
    height: 10rem;
    border: 2px solid #8eb8bdcc;
    border-radius: 50% !important;
    background: white;
    z-index: 10;
  }

  .card-title {
    justify-content: center;
  }
}
</style>
