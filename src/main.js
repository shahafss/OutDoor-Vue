import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import store from "./store/store";
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAuuPYLZG4AGm2Kd8G6NwtIrE2H0JjgNpw",
    libraries: "places",
  },
});

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
