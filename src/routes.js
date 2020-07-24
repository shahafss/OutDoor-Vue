import Login from "./components/auth/Login.vue";
import Signup from "./components/auth/Signup.vue";
import Rooms from "./components/rooms/Rooms.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import RoomView from "./components/rooms/RoomView.vue";
import NewRoom from "./components/rooms/NewRoom.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/rooms", component: Rooms },
  { path: "/profile", component: Profile },
  { path: "/room/:id", component: RoomView, name: "room" },
  { path: "/new-room", component: NewRoom }
];
