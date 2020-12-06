<template>
  <v-select
    v-model="category"
    :items="categoryItems"
    label="Category"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      category: null,
      categoryItems: ["Sport", "Study", "Hangout", "Protest"],
    };
  },
  watch: {
    category(category) {
      this.$emit("change", category);
    },
  },
};
</script>
