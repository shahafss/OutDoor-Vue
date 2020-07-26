import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import store from "./store/store";
import router from "./router";

Vue.use(VueRouter);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
