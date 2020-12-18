<template>
  <validation-provider
    slim
    ref="provider"
    name="category"
    rules="required"
    v-slot="{ errors }"
  >
    <v-select
      autofocus
      v-model="category"
      :items="categoryItems"
      label="Category"
      outlined
      :error-messages="errors"
      @blur="$emit('err', { category: errors })"
    ></v-select>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from "vee-validate";

export default {
  data() {
    return {
      category: null,
      categoryItems: ["Sport", "Study", "Hangout", "Protest"],
    };
  },
  components: {
    ValidationProvider,
  },
  watch: {
    category(category) {
      this.$emit("change", category);
    },
  },
};
</script>
