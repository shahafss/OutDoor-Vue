<template>
  <v-container style="padding: 0;">
    <ODNavbar
      @joinRequest="joinRoom()"
      @leaveRequest="leaveRoom()"
      @roomSaved="saveRoom($event)"
      @roomDeleted="deleteRoom()"
      :room="currentRoom"
    >
      <div class="view-container" v-if="currentRoom">
        <p
          class="description"
          :class="{ expanded: isDesExpanded }"
          ref="description"
        >
          {{ description }}
        </p>

        <v-btn
          v-show="desOverflown"
          @click="isDesExpanded = !isDesExpanded"
          class="ma-2"
          outlined
          color="indigo"
        >
          {{ descBtnText }}
          <v-icon v-if="isDesExpanded" right dark>
            mdi-chevron-up
          </v-icon>
          <v-icon v-else right dark>
            mdi-chevron-down
          </v-icon>
        </v-btn>
        <RoomViewChat
          :joinedUsers="joinedUsers"
          :currentRoom="currentRoom"
        ></RoomViewChat>

        <h4 style=" textAlign: center; marginTop: 2rem">
          {{ currentRoom.address.addressString }}
        </h4>
        <gmap-map
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
        </gmap-map>
      </div>
      <div v-else>
        <h1>Loading..</h1>
      </div>
    </ODNavbar>
  </v-container>
</template>

<script>
import RoomViewChat from "./RoomViewChat";
import ODNavbar from "../ODNavbar";

export default {
  data() {
    return {
      roomId: this.$route.params.id,
      isDesExpanded: false,
      desOverflown: false,
    };
  },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    this.checkIfOverflown(this.$refs.description);
  },
  components: {
    RoomViewChat,
    ODNavbar,
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },

    currentRoom() {
      if (!this.rooms.length || !this.roomId) return;
      return this.rooms.find((room) => room.id == this.roomId);
    },

    title() {
      if (!this.currentRoom.title) return;

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
      const allUsers = this.$store.state.auth.allUsers;
      if (!this.currentRoom.joinedUsers.length || !allUsers) return;

      const joinedUsers = [];
      this.currentRoom.joinedUsers.forEach((userId) => {
        const joinedUser = allUsers[userId];
        joinedUsers.push(joinedUser);
      });
      return joinedUsers;
    },

    isFull() {
      return (
        this.currentRoom.participants == this.currentRoom.joinedUsers.length
      );
    },
    descBtnText() {
      return this.isDesExpanded ? "Read Less" : "Read More";
    },
  },
  methods: {
    checkIfOverflown(element) {
      if (!element) return;

      if (element.scrollHeight > element.clientHeight) this.desOverflown = true;
      else this.desOverflown = false;
    },

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
  height: 100%;
  max-width: unset;
  .toolbar-btn {
    margin: 0.3rem 1rem;
  }

  .view-container {
    padding: 0 20px;

    .description {
      margin-top: 2rem;
      max-height: 150px;
      text-align: center;
      font-size: 20px;
      overflow: hidden;
      transition: all 1s;

      &.expanded {
        height: fit-content;
        max-height: 430px;
      }
    }

    .activity-map {
      height: 200px;
      margin: 2rem 0;
      border: 1px solid black;
      border-radius: 8px;
      overflow: hidden;
    }
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
