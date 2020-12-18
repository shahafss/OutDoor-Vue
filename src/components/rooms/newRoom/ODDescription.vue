<template>
  <validation-provider
    slim
    ref="provider"
    name="description"
    rules="minLength:10|maxLength:150|required"
    v-slot="{ errors }"
  >
    <v-text-field
      autofocus
      v-model="description"
      :error-messages="errors"
      @blur="$emit('err', { description: errors })"
      outlined
      clearable
      label="Description"
      :counter="150"
    ></v-text-field>
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
};
</script>
