<template>
  <v-container :style="{ height: '100vh', overflowY: 'auto', display: 'flex' }">
    <div class="signup-form">
      <h1>Sign-Up!</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <v-text-field type="text" v-model="firstName" label="First Name">
          </v-text-field>
        </div>
        <div class="input">
          <v-text-field type="text" v-model="lastName" label="Last Name">
          </v-text-field>
        </div>
        <div class="input">
          <v-text-field type="text" v-model="username" label="User-Name">
          </v-text-field>
        </div>
        <v-radio-group row>
          <v-radio
            v-model="gender"
            label="Male"
            color="primary"
            value="m"
          ></v-radio>
          <v-radio
            v-model="gender"
            label="Female"
            color="primary"
            value="f"
          ></v-radio>
        </v-radio-group>
        <div class="input">
          <v-text-field type="date" label="Birth Date" v-model="birthday" />
        </div>
        <div class="input">
          <v-text-field type="email" v-model="email" label="E-Mail">
          </v-text-field>
        </div>
        <div class="input">
          <v-text-field type="password" v-model="password" label="Password">
          </v-text-field>
        </div>
        <div class="input">
          <v-text-field
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            label="Confirm Password"
          >
          </v-text-field>
        </div>
        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms" />
          <label for="terms">Accept Terms of Use</label>
        </div>
        <v-btn color="primary" type="submit" :style="{ marginTop: '2rem' }"
          >Submit</v-btn
        >
      </form>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      gender: null,
      password: "",
      confirmPassword: "",
      terms: false,
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        birthday: new Date(this.birthday),
        email: this.email,
        password: this.password,
        terms: this.terms,
      };
      this.$store.dispatch("signup", formData);
    },
  },
};
</script>

<style scoped>
.signup-form {
  width: 400px;
  height: fit-content;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
  margin-bottom: 2rem;
}

.gender-inputs {
  display: flex;
}
</style>
