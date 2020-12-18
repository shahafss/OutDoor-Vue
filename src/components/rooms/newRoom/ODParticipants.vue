<template>
  <validation-provider
    slim
    ref="provider"
    name="participants"
    rules="required"
    v-slot="{ errors }"
  >
    <v-text-field
      autofocus
      type="number"
      v-model.number="participants"
      label="Participants"
      outlined
      clearable
      :error-messages="errors"
      @blur="$emit('err', { participants: errors })"
    ></v-text-field>
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
};
</script>
