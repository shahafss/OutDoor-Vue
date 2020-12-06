<template>
  <v-text-field v-model="date" label="Date" type="date"></v-text-field>
</template>
<script>
export default {
  data() {
    return {
      date: "",
    };
  },
  watch: {
    date(date) {
      this.$emit("change", date);
    },
  },
};
</script>
