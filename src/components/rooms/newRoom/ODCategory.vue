<template>
  <validation-provider
    slim
    ref="provider"
    name="category"
    rules="required"
    v-slot="{ errors, valid }"
  >
    <v-select
      class="od-input"
      v-model="category"
      :success="valid"
      :items="categoryItems"
      :error-messages="errors"
      @keydown.enter="next(valid)"
      label="Category"
      outlined
    ></v-select>
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
