<template>
  <VueGooglePlaces
    :api-key="googleAPI"
    types="address"
    country="il"
    aria-placeholder=""
    style="width:100%;"
    @placechanged="onAddressChanged($event)"
  >
    <validation-provider
      rules="required"
      slim
      ref="provider"
      name="address"
      v-slot="{ errors, valid }"
    >
      <v-text-field
        class="od-input"
        :value="tempAddress"
        :success="valid"
        placeholder=""
        label="Address"
        type="text"
        outlined
        clearable
        :error-messages="errors"
        @blur="$emit('err', { address: errors })"
      ></v-text-field>
    </validation-provider>
  </VueGooglePlaces>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  props: ["address"],
  data() {
    return {
      googleAPI: process.env.VUE_APP_GMAPS,
      tempAddress: "",
    };
  },
  components: {
    ValidationProvider,
  },
  methods: {
    onAddressChanged(addressData) {
      this.tempAddress = addressData.formatted_address;
      this.$emit("change", addressData);
    },
  },
};
</script>

<style lang="scss" scoped>
.od-input {
  width: 100%;
}
</style>
