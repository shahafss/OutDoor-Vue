<template>
  <v-container style="padding: 0;">
    <ODNavbar
      @joinRequest="joinRoom()"
      @leaveRequest="leaveRoom()"
      @roomSaved="saveRoom($event)"
      @roomDeleted="deleteRoom()"
      :room="room"
    >
      <div class="view-container" v-if="room.title">
        <p
          class="description"
          :class="{ expanded: isDesExpanded }"
          ref="description"
        >
          {{ room.description }}
        </p>
        <transition name="fade">
          <v-btn
            v-if="desOverflown"
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
        </transition>
        <RoomViewChat
          :joinedUsers="joinedUsers"
          :currentRoom="room"
        ></RoomViewChat>

        <h4 v-if="room.address" style=" textAlign: center; marginTop: 2rem">
          {{ room.address.addressString }}
        </h4>
        <gmap-map
          v-if="room.address"
          class="activity-map"
          :center="{
            lat: room.address.lat,
            lng: room.address.lng,
          }"
          :zoom="16"
        >
          <GmapMarker
            :position="{ lat: room.address.lat, lng: room.address.lng }"
            :clickable="true"
            :draggable="true"
          />
        </gmap-map>
      </div>
      <div v-else>
        <h3 style="textAlign: center;">Loading..</h3>
      </div>
    </ODNavbar>
  </v-container>
</template>

<script>
import RoomViewChat from "./RoomViewChat";
import ODNavbar from "../nav/ODNavbar";

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
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    this.$store.dispatch("fetchRoom", this.roomId);
    setTimeout(() => {
      this.checkIfOverflown(this.$refs.description);
    }, 1000);
  },
  destroyed() {
    this.$store.dispatch("clearCurrentRoom");
  },
  components: {
    RoomViewChat,
    ODNavbar,
  },
  computed: {
    room() {
      return this.$store.getters.getRoom;
    },

    getAddress() {
      return this.room ? this.room.address : false;
    },

    isAdmin() {
      return this.loggedInUser.id == this.room.admin;
    },

    loggedInUser() {
      return this.$store.getters.getUser;
    },

    joinedUsers() {
      const allUsers = this.$store.state.auth.allUsers;
      if (!this.room.joinedUsers || !allUsers) return;

      const joinedUsers = [];
      this.room.joinedUsers.forEach((userId) => {
        const joinedUser = allUsers[userId];
        joinedUsers.push(joinedUser);
      });
      return joinedUsers;
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
      const updatedRoom = { ...this.room, ...editedData };
      updatedRoom.id = this.roomId;
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
      this.$store.dispatch("deleteRoom", this.roomId).then(() => {
        this.$router.push("/rooms");
      });
    },

    joinRoom() {
      this.$store.dispatch("joinUser", {
        roomId: this.roomId,
        userId: this.loggedInUser.id,
      });
    },

    leaveRoom() {
      this.$store.dispatch("leaveUser", {
        roomId: this.roomId,
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
        max-height: 2000px;
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
