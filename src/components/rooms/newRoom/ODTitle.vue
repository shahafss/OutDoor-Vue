<template>
  <validation-provider
    slim
    ref="provider"
    name="title"
    rules="required|minLength:6|maxLength:40"
    v-slot="{ errors }"
  >
    <v-text-field
      autofocus
      outlined
      clearable
      :counter="40"
      :error-messages="errors"
      @blur="$emit('err', { title: errors })"
      v-model="title"
      label="Title"
    ></v-text-field>
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
};
</script>
