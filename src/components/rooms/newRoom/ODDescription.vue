<template>
  <validation-provider
    slim
    ref="provider"
    name="description"
    rules="minLength:10|maxLength:150|required"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      class="od-input"
      v-model="description"
      :error-messages="errors"
      :success="valid"
      :counter="150"
      @keydown.enter="next(valid)"
      outlined
      clearable
      label="Description"
    ></v-text-field>
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
      description: "",
    };
  },
  components: {
    ValidationProvider,
  },
  watch: {
    description(description) {
      this.$emit("change", description);
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
