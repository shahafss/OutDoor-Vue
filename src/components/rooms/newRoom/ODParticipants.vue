<template>
  <v-text-field
    type="number"
    v-model.number="participants"
    label="Participants"
    outlined
  ></v-text-field>
</template>
<script>
export default {
  data() {
    return {
      participants: "",
    };
  },
  watch: {
    participants(participants) {
      this.$emit("change", participants);
    },
  },
};
</script>
