<template>
  <validation-provider
    slim
    ref="provider"
    name="date"
    rules="required"
    v-slot="{ errors }"
  >
    <v-text-field
      autofocus
      outlined
      clearable
      type="date"
      :error-messages="errors"
      @blur="$emit('err', { date: errors })"
      v-model="date"
      label="Date"
    >
    </v-text-field>
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
};
</script>
