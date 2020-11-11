import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import store from "./store/store";
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGooglePlaces from "vue-google-places";
import Vuetify from "vuetify";

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueGooglePlaces);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS,
    libraries: "places",
  },
});

new Vue({
  el: "#app",
  router,
  store,
  vuetify: new Vuetify(),

  render: (h) => h(App),
});
