<template>
  <validation-provider
    slim
    ref="provider"
    name="address"
    rules="required"
    v-slot="{ errors }"
  >
    <VueGooglePlaces
      :api-key="googleAPI"
      types="address"
      country="il"
      aria-placeholder=""
      style="width:100%;"
      @placechanged="onAddressChanged($event)"
    >
      <v-text-field
        autofocus
        :value="address"
        placeholder=""
        label="Address"
        type="text"
        outlined
        clearable
        :error-messages="errors"
        @blur="$emit('err', { address: errors })"
      ></v-text-field>
    </VueGooglePlaces>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  props: ["address", "disabled", "center"],
  data() {
    return {
      googleAPI: process.env.VUE_APP_GMAPS,
    };
  },
  components: {
    ValidationProvider,
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
