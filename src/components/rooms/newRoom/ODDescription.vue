<template>
  <v-text-field
    v-model="description"
    outlined
    clearable
    label="Description"
    :counter="150"
  ></v-text-field>
</template>
<script>
export default {
  data() {
    return {
      description: "",
    };
  },
  watch: {
    description(description) {
      this.$emit("change", description);
    },
  },
};
</script>
