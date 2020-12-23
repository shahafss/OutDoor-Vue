<template>
  <validation-provider
    slim
    ref="provider"
    name="participants"
    rules="required"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      class="od-input"
      :success="valid"
      type="number"
      v-model.number="participants"
      label="Participants"
      @keydown.enter="next(valid)"
      outlined
      clearable
      :error-messages="errors"
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
      participants: "",
    };
  },
  components: {
    ValidationProvider,
  },
  watch: {
    participants(participants) {
      this.$emit("change", participants);
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
