import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./components/auth/Login.vue";
import Signup from "./components/auth/Signup.vue";
import Rooms from "./components/rooms/Rooms.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import RoomView from "./components/rooms/RoomView.vue";
import NewRoom from "./components/rooms/NewRoom.vue";

import store from "./store/store";

Vue.use(VueRouter);

export const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/rooms",
    component: Rooms,
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile",
    component: Profile,
    beforeEnter(to, from, next) {
      if (store.state.auth.idToken) {
        next();
      } else {
        next("/login");
      }
    }
  },
  { path: "/room/:id", component: RoomView, name: "room" },
  { path: "/new-room", component: NewRoom }
];

export default new VueRouter({ mode: "history", routes });