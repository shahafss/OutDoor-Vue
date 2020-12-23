<template>
  <validation-provider
    slim
    ref="provider"
    name="title"
    rules="required|minLength:6|maxLength:40"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      class="od-input"
      outlined
      clearable
      :counter="40"
      :success="valid"
      :error-messages="errors"
      @keydown.enter="next(valid)"
      v-model="title"
      label="Title"
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      outlined
      rounded
      color="indigo"
      @click.prevent="next(valid)"
      >Next</v-btn
    >
  </validation-provider>
</template>
<script>
import { ValidationProvider } from "vee-validate";

export default {
  data() {
    return {
      title: "",
    };
  },
  components: {
    ValidationProvider,
  },
  watch: {
    title(title) {
      this.$emit("change", title);
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
