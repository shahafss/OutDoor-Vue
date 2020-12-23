<template>
  <validation-provider
    slim
    ref="provider"
    name="date"
    rules="required"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      class="od-input"
      :success="valid"
      outlined
      clearable
      type="date"
      :error-messages="errors"
      @keydown.enter="next(valid)"
      v-model="date"
      label="Date"
    >
    </v-text-field>
    <v-btn
      :disabled="!valid"
      outlined
      rounded
      color="indigo"
      @click="next(valid)"
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
  methods: {
    next(valid) {
      if (valid) this.$emit("next");
    },
  },
};
</script>
<style lang="scss" scoped>
.od-input {
  width: 100%;
}
</style>
