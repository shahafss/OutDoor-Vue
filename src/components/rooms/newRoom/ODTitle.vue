<template>
  <v-text-field
    outlined
    clearable
    :counter="40"
    v-model="title"
    label="Title"
  ></v-text-field>
</template>
<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  watch: {
    title(title) {
      this.$emit("change", title);
    },
  },
};
</script>
