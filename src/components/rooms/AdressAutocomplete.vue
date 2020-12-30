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
      v-slot="{ errors }"
    >
      <v-text-field
        ref="intputfield"
        class="od-input"
        :value="tempAddress"
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
  mounted() {
    if (this.autofocus) {
      setTimeout(() => {
        this.$refs.intputfield.focus();
      }, 500);
    }
  },
  props: ["address", "autofocus"],
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
