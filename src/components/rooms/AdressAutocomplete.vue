<template>
  <VueGooglePlaces
    :api-key="googleAPI"
    types="address"
    country="il"
    @placechanged="onAddressChanged($event)"
  >
    <input
      style="width: inherit;"
      :class="{ center: center }"
      :disabled="disabled"
      :value="address"
      type="text"
    />
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
      this.$emit("address-changed", addressData);
    },
  },
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
