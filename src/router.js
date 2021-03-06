import VueRouter from "vue-router";

import Login from "./components/auth/Login.vue";
import Signup from "./components/auth/Signup.vue";
import Rooms from "./components/rooms/Rooms.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import MyRooms from "./components/MyRooms.vue";
import RoomView from "./components/rooms/RoomView.vue";
import NewRoom from "./components/rooms/newRoom/NewRoom.vue";
import ODNotFound from "./components/404/ODNotFound.vue";

import store from "./store/store";

export const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter(to, from, next) {
      if (!store.state.auth.idToken) {
        next();
      } else {
        next("/rooms");
      }
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    beforeEnter(to, from, next) {
      if (!store.state.auth.idToken) {
        next();
      } else {
        next("/rooms");
      }
    },
  },
  {
    path: "/rooms",
    name: "rooms",
    component: Rooms,
    beforeEnter(to, from, next) {
      setTimeout(() => {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/login");
        }
      }, 10);
    },
  },
  {
    path: "/room/:id",
    name: "room",
    component: RoomView,
    beforeEnter(to, from, next) {
      setTimeout(() => {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/login");
        }
      }, 10);
    },
  },
  {
    path: "/new-room",
    name: "newroom",
    component: NewRoom,
    beforeEnter(to, from, next) {
      setTimeout(() => {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/login");
        }
      }, 10);
    },
  },

  {
    path: "/my-rooms",
    name: "my-rooms",
    component: MyRooms,
    beforeEnter(to, from, next) {
      setTimeout(() => {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/login");
        }
      }, 10);
    },
  },

  {
    path: "/profile/:id",
    name: "profile",
    component: Profile,
    beforeEnter(to, from, next) {
      setTimeout(() => {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/login");
        }
      }, 10);
    },
  },
  {
    path: "/profile/",
    name: "userprofile",
    component: Profile,
    beforeEnter(to, from, next) {
      setTimeout(() => {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/login");
        }
      }, 10);
    },
  },
  { path: "*", name: "notfound", component: ODNotFound },
];

export default new VueRouter({ mode: "history", routes });
