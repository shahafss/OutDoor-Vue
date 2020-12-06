<template>
  <v-text-field v-model="description" label="Description"></v-text-field>
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
