<template>
  <v-card :style="{ height: '100%', 'border-radius': 0 }">
    <v-app-bar
      color="#fcb69f"
      dark
      :prominent="!main"
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon
        @click.stop="drawerShown = !drawerShown"
      ></v-app-bar-nav-icon>
      <h3 class="title">{{ title }}</h3>

      <v-spacer></v-spacer>

      <template v-if="!main">
        <v-btn
          class="toolbar-btn"
          style="borderRadius:30px;"
          v-if="!isJoinedUser && !isFull"
          color="success"
          @click="$emit('joinRequest')"
        >
          Join
        </v-btn>
        <v-btn
          class="toolbar-btn"
          style="borderRadius:30px;"
          v-else-if="!isAdmin && isJoinedUser"
          color="primary"
          @click="$emit('leaveRequest')"
        >
          Leave
        </v-btn>

        <div class="participants-container">
          <v-icon>mdi-account-multiple</v-icon>
          <div class="participants">
            {{ participantsStr }}
          </div>
        </div>

        <v-btn icon>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list v-if="isAdmin">
              <v-list-item link>
                <RoomEditModal
                  v-if="isAdmin"
                  @roomSaved="$emit('roomSaved', $event)"
                  :room="room"
                ></RoomEditModal>
              </v-list-item>
              <v-list-item link>
                <RoomDeleteModal
                  v-if="isAdmin"
                  @roomDeleted="$emit('roomDeleted')"
                >
                </RoomDeleteModal>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item link>
                Report room
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>
    <NavDrawer
      @drawerDismiss="drawerShown = $event"
      :shown="drawerShown"
    ></NavDrawer>
    <v-sheet
      :style="{
        maxHeight: `${main ? '90' : '80'}vh`,
        height: '100%',
        overflowY: 'auto',
      }"
    >
      <v-container style="height: 100%;"><slot></slot></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import RoomEditModal from "./rooms/modals/RoomEditModal";
import RoomDeleteModal from "./rooms/modals/RoomDeleteModal";
import NavDrawer from "../components/NavDrawer";
export default {
  props: ["main", "room"],
  data() {
    return {
      drawerShown: false,
    };
  },
  components: {
    NavDrawer,
    RoomEditModal,
    RoomDeleteModal,
  },
  computed: {
    title() {
      if (this.main) return "OutDoor";

      return this.room ? this.room.title : "OutDoor";
    },
    participantsStr() {
      if (!this.room.joinedUsers) return;
      return `${this.room.joinedUsers.length}/${this.room.participants}`;
    },
    isFull() {
      if (!this.room.joinedUsers) return;
      return this.room.participants == this.room.joinedUsers.length;
    },
    isAdmin() {
      if (!this.room || !this.$store.getters.getUser) return;
      return this.$store.getters.getUser.id == this.room.admin;
    },

    isJoinedUser() {
      if (!this.room.joinedUsers || !this.$store.getters.getUser) return;
      return this.room.joinedUsers.includes(this.$store.getters.getUser.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0.5rem 0;
  line-height: 1;
}
.participants-container {
  border-radius: 8px;
  border: 2px solid white;
  padding: 0 4px;
  display: flex;
  margin-top: 0.3rem;
  transition: border 1s ease;

  i {
    border-right: 1px solid white;
  }

  .participants {
    padding: 0 4px;
    text-align: center;
    align-self: center;
    font-size: 23px;
    white-space: nowrap;
  }
}

.participants-container:hover {
  border-color: #ff0000;
}
</style>
