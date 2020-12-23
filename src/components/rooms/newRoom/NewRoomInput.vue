<template>
  <validation-provider
    slim
    ref="provider"
    :name="name"
    :rules="rules"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      class="od-input"
      outlined
      clearable
      :type="type"
      :counter="max"
      :success="valid"
      :error-messages="errors"
      @keydown.enter="next(valid)"
      v-model="inputVal"
      :label="name"
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
  props: ["name", "type", "max", "min", "required"],
  data() {
    return {
      inputVal: "",
    };
  },
  components: {
    ValidationProvider,
  },
  watch: {
    inputVal(val) {
      this.$emit("change", val);
    },
  },
  computed: {
    rules() {
      return `required${this.min ? "|minLength:" + this.min : ""}${
        this.max ? "|maxLength:" + this.max : ""
      }`;
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
