<template>
  <VueGooglePlaces
    :api-key="googleAPI"
    types="address"
    country="il"
    aria-placeholder=""
    @placechanged="onAddressChanged($event)"
  >
    <v-text-field
      :value="address"
      placeholder=""
      label="Address"
      type="text"
    ></v-text-field>
  </VueGooglePlaces>
</template>

<script>
export default {
  props: ["address", "disabled", "center"],
  data() {
    return {
      googleAPI: process.env.VUE_APP_GMAPS,
    };
  },
  methods: {
    onAddressChanged(addressData) {
      this.$emit("change", addressData);
    },
  },
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
