<template>
  <div id="login">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <v-text-field
            type="email"
            v-model="email"
            label="Email"
          ></v-text-field>
        </div>
        <div class="input">
          <v-text-field
            type="password"
            v-model="password"
            label="Password"
          ></v-text-field>
        </div>
        <div>
          <span
            >Dont have an account?
            <router-link to="/signup">Register</router-link></span
          >
        </div>
        <v-btn type="submit" outlined rounded color="indigo">
          Submit
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
.input {
  margin: 10px auto;
}
.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}
</style>
