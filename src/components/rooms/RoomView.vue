<template>
  <v-container style="padding: 0;">
    <v-app-bar
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="toolbar-btn"
        style="borderRadius:30px;"
        v-if="!isJoinedUser && !isFull"
        color="success"
        @click="joinRoom()"
      >
        Join
      </v-btn>
      <v-btn
        class="toolbar-btn"
        style="borderRadius:30px;"
        v-else-if="!isAdmin && isJoinedUser"
        color="primary"
        @click="leaveRoom()"
      >
        Leave
      </v-btn>

      <div class="participants-container">
        <v-icon>mdi-account-multiple</v-icon>
        <div class="participants">
          {{ currentRoom.joinedUsers.length }}/{{ currentRoom.participants }}
        </div>
      </div>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list v-if="isAdmin">
            <v-list-item link>
              <RoomViewModal
                v-if="isAdmin"
                @roomSaved="saveRoom($event)"
                :room="currentRoom"
              ></RoomViewModal>
            </v-list-item>
            <v-list-item @click="deleteRoom()" link>
              Delete
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item link>
              Report room
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="600"
    >
      <div class="view-container" v-if="currentRoom">
        <p class="description">{{ description }}</p>
        <RoomViewChat
          :joinedUsers="joinedUsers"
          :currentRoom="currentRoom"
        ></RoomViewChat>

        <h4 style=" textAlign: center; marginTop: 2rem">
          {{ currentRoom.address.addressString }}
        </h4>
        <div class="activity-map">
          Google Map
          <!-- <gmap-map
          v-if="getAddress"
          class="activity-map"
          :center="{
            lat: getAddress.lat,
            lng: getAddress.lng,
          }"
          :zoom="16"
        >
          <GmapMarker
            :position="{ lat: getAddress.lat, lng: getAddress.lng }"
            :clickable="true"
            :draggable="true"
          />
        </gmap-map> -->
        </div>
      </div>
      <div v-else>
        <h1>Loading..</h1>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import RoomViewModal from "./RoomViewModal";
import RoomViewChat from "./RoomViewChat";

export default {
  data() {
    return {
      roomId: this.$route.params.id,
    };
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchUsers");
  },
  components: {
    RoomViewModal,
    RoomViewChat,
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },

    currentRoom() {
      return this.rooms.find((room) => room.id == this.roomId);
    },

    title() {
      return this.currentRoom ? this.currentRoom.title : false;
    },

    date() {
      return this.currentRoom ? this.currentRoom.date : false;
    },

    description() {
      return this.currentRoom ? this.currentRoom.description : false;
    },

    participants() {
      return this.currentRoom ? this.currentRoom.participants : false;
    },

    getAddress() {
      return this.currentRoom ? this.currentRoom.address : false;
    },

    isAdmin() {
      return this.loggedInUser.id == this.currentRoom.admin;
    },

    isJoinedUser() {
      return this.joinedUsers.includes(this.$store.getters.getUser.username);
    },

    loggedInUser() {
      return this.$store.getters.getUser;
    },

    joinedUsers() {
      const joinedUsers = [];
      this.currentRoom.joinedUsers.forEach((userId) => {
        const joinedUser = this.$store.state.auth.allUsers[userId].username
          ? this.$store.state.auth.allUsers[userId].username
          : this.$store.state.auth.allUsers[userId].email;
        joinedUsers.push(joinedUser);
      });
      return joinedUsers;
    },

    isFull() {
      return (
        this.currentRoom.participants == this.currentRoom.joinedUsers.length
      );
    },
  },
  methods: {
    saveRoom(editedData) {
      const updatedRoom = { ...this.currentRoom, ...editedData };
      this.$store.dispatch("updateRoom", updatedRoom).then(
        (res) => {
          this.editMode = false;
        },
        (error) => {
          console.log("saveRoom error> ", error);
        }
      );
    },

    deleteRoom() {
      this.$store.dispatch("deleteRoom", this.currentRoom.id).then(() => {
        this.$router.push("/rooms");
      });
    },

    joinRoom() {
      this.$store.dispatch("joinUser", {
        roomId: this.currentRoom.id,
        userId: this.loggedInUser.id,
      });
    },

    leaveRoom() {
      this.$store.dispatch("leaveUser", {
        roomId: this.currentRoom.id,
        userId: this.loggedInUser.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .toolbar-btn {
    margin: 0.3rem 1rem;
  }
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
  }
}

.participants-container:hover {
  border-color: #ff0000;
}

.view-container {
  padding: 0 20px;

  .description {
    margin-top: 2rem;
    height: 150px;
    text-align: center;
    font-size: 20px;
    overflow: scroll;
  }

  .activity-map {
    height: 200px;
    margin: 2rem 0;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
  }
}

@media (max-width: 640px) {
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
