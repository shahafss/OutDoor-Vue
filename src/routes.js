import Rooms from "./components/rooms/Rooms.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import RoomView from "./components/rooms/RoomView.vue";
import NewRoom from "./components/rooms/NewRoom.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/rooms", component: Rooms },
  { path: "/profile", component: Profile },
  { path: "/room/:id", component: RoomView, name: "room" },
  { path: "/new-room", component: NewRoom }
];
