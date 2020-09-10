<template>
  <div id="signup">
    <div class="signup-form">
      <h1>Sign-Up!</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="user-name">User Name</label>
          <input v-model="username" type="text" id="user-name" />
        </div>
        <div class="input">
          <label for="first-name">First Name</label>
          <input v-model="firstName" type="text" id="first-name" />
        </div>
        <div class="input">
          <label for="last-name">Last Name</label>
          <input v-model="lastName" type="text" id="last-name" />
        </div>
        <div class="gender-inputs">
          <div class="form-check">
            <input
              v-model="gender"
              class="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="m"
            />
            <label class="form-check-label" for="male">
              Male
            </label>
          </div>
          <div class="form-check" style="margin-left:1rem">
            <input
              v-model="gender"
              class="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="f"
            />
            <label class="form-check-label" for="female">
              Female
            </label>
          </div>
        </div>
        <div class="input">
          <label for="age">Your Age</label>
          <input type="date" id="birthday" v-model="birthday" />
        </div>
        <div class="input">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
          />
        </div>
        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms" />
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
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
      terms: false
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
        terms: this.terms
      };
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>

<style scoped>
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.gender-inputs {
  display: flex;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
