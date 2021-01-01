<template>
  <validation-provider
    slim
    ref="provider"
    name="date"
    rules="required"
    v-slot="{ errors, valid }"
  >
    <v-date-picker
      v-model="date"
      :min="nowDate"
      full-width
      class="mt-4"
      elevation="5"
      :error-messages="errors"
    ></v-date-picker>
    <v-btn
      :disabled="!valid"
      outlined
      rounded
      color="indigo"
      @click="$emit('next')"
      >Next</v-btn
    >
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  data() {
    return {
      date: "",
    };
  },
  components: {
    ValidationProvider,
  },
  watch: {
    date(date) {
      this.$emit("change", date);
    },
  },
  computed: {
    nowDate() {
      return new Date()
        .toLocaleDateString("eng-GB")
        .split("/")
        .reverse()
        .join("-");
    },
  },
  methods: {
    next(valid) {
      if (valid) this.$emit("next");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  margin-top: 30px;
}
</style>
