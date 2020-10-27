<template>
  <v-container style="height:100%" fluid>
    <div class="view-container" v-if="loggedInUser && isActive && currentRoom">
      <!-- <section class="section-top"> -->
      <form class="room-form" @submit.prevent="saveRoom">
        <input
          :value="title"
          ref="title"
          class="title form-control"
          type="text"
          :disabled="!editMode"
        />
        <!-- {{ date }} -->
        <textarea
          :value="description"
          ref="description"
          class="description form-control"
          type="text"
          :disabled="!editMode"
        />
        <div>
          <vue-google-autocomplete
            v-model="getAddress.addressString"
            id="map"
            ref="address"
            classname="form-control"
            placeholder="Address"
            v-on:placechanged="getAddressData"
            country="il"
            :disabled="!editMode"
          >
          </vue-google-autocomplete>
        </div>
        <div style="display:flex; margin-top:1rem">
          <label for="participants"
            >Participants: {{ currentRoom.joinedUsers.length }}/</label
          >
          <input
            :value="participants"
            ref="participants"
            id="participants"
            type="number"
            class="participants"
            :disabled="!editMode"
          />
        </div>
        <div class="buttons">
          <transition name="fade">
            <div v-if="!editMode" class="user-buttons">
              <button
                v-if="!isJoinedUser && !isFull"
                type="button"
                class="btn btn-success"
                @click="joinRoom()"
              >
                Join
              </button>
              <button
                v-else-if="!isAdmin && isJoinedUser"
                type="button"
                class="btn btn-default"
                @click="leaveRoom()"
              >
                Leave
              </button>
              <button
                class="btn btn-primary edit-button"
                v-if="isAdmin && !editMode"
                type="button"
                @click.prevent="editMode = !editMode"
              >
                Edit
              </button>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="editMode" class="edit-buttons">
              <button class="btn btn-default" @click.prevent="cancel()">
                Cancel
              </button>
              <button class="btn btn-success" type="submit">
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteRoom(currentRoom.id)"
              >
                Delete Room
              </button>
            </div>
          </transition>
        </div>
      </form>
      <!-- </section> -->
      <!-- <transition name="list"> -->
      <!-- <section class="section-bottom" v-if="!editMode"> -->
      <div class="chat">
        <div class="chat-container">
          <div class="messages-container" ref="messages">
            <u class="messages">
              <li class="message" v-for="message in messages" :key="message.id">
                <div class="msg-time">{{ message.timestamp }}</div>
                <div class="msg-text">
                  <span :style="{ color: randomColor }">
                    {{ message.username }}:
                  </span>
                  <span>
                    {{ message.text }}
                  </span>
                </div>
              </li>
            </u>
          </div>
          <div v-if="isJoinedUser" class="user-input">
            <input
              class="msg-input"
              v-model="message"
              type="text"
              placeholder="message.."
            />
            <button
              class="btn btn-success btn-send"
              @click.prevent="sendMessage(message)"
            >
              Send
            </button>
          </div>
        </div>

        <div class="joined-users">
          <transition-group name="list">
            <div v-for="user in joinedUsers" :key="user" class="joined-user">
              {{ user }}
            </div>
          </transition-group>
        </div>
      </div>

      <gmap-map
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
      <!-- </section> -->
      <!-- </transition> -->
    </div>
    <div v-else>
      <h1>Loading..</h1>
    </div>
  </v-container>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  data() {
    return {
      roomId: this.$route.params.id,
      address: this.getAddress,
      isActive: true,
      editMode: false,
      message: "",
      scrollPosition: null,
      randomColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
  },
  components: { VueGoogleAutocomplete },
  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    this.scrollToBottom();
  },
  computed: {
    //TODO move computed props to getters(if possible)
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
    messages() {
      return this.currentRoom ? this.currentRoom.messages : false;
    },
  },
  methods: {
    getAddressData(addressData, placeResultData, id) {
      console.log("addressData>> ", addressData);
      this.address = addressData;
    },
    getAddressString(address) {
      const addressString = `${address.route} ${address.street_number}, ${address.locality}, ${address.country}`;
      return addressString;
    },
    sendMessage(message) {
      if (message == "") return;
      this.scrollToBottom();

      const date = new Date();
      const messageData = {
        text: message,
        username: this.$store.getters.getUser.username,
        timestamp: date.toLocaleTimeString(),
        roomId: this.currentRoom.id,
      };
      this.$store.dispatch("postMessage", messageData);
      this.message = "";
    },
    saveRoom() {
      const editedData = {
        title: this.$refs.title.value,
        description: this.$refs.description.value,
        address: {
          addressString: this.getAddressString(this.address),
          lat: this.address.latitude,
          lng: this.address.longitude,
        },
        participants: this.$refs.participants.value,
      };
      const updatedRoom = { ...this.currentRoom, ...editedData };
      this.$store.dispatch("updateRoom", updatedRoom);
      this.editMode = false;
    },
    cancel() {
      this.editMode = false;
    },
    deleteRoom(id) {
      this.isActive = false;
      this.$store.dispatch("deleteRoom", id).then(
        setTimeout(() => {
          this.$router.push("/rooms");
        }, 1000)
      );
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
    getMessageTime(timestamp) {
      const messageTime = new Date(timestamp);
      return messageTime;
    },
    scrollToBottom() {
      if (!this.$refs.messages) return;
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
// .section-top {
.view-container {
  position: relative;

  .room-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border: 1px solid black;
    border-radius: 4px;
    .title {
      text-align: center;
      font-size: 30px;
      height: 60px !important;
      margin-top: 0 !important;
      padding-top: 0;
      padding-bottom: 0;
    }
    .title:disabled {
      font-size: 50px !important;
    }
    .description {
      text-align: center;

      font-size: 25px;
      max-width: 78rem;
      max-height: 8rem;
    }
    .description:disabled {
      font-size: 25px;
      resize: none;
      min-height: 8rem;
      overflow: auto;
    }
    .participants {
      width: 50px;
      font-size: 25px;
      font-weight: 500;
      padding-right: 0;
      padding-left: 2px;
      height: 34px !important;
    }
    .participants:disabled {
      font-size: 25px;
      font-weight: 500;
    }

    .form-control:not(.participants) {
      max-width: 75rem;
      margin-top: 2rem;
      transition: all ease 0.5s;
    }
    .form-control:disabled {
      color: #333;
      background-color: #fff;
      border: none;
      box-shadow: none;
      height: auto;
    }
    .form-control:disabled:hover {
      cursor: default;
    }
    label {
      font-size: 25px;
    }
  }
  // }
  // .section-bottom {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-end;

  .chat {
    margin-top: 2rem;
    display: flex;
    height: 240px;
    width: 100%;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #e6ffff;
    box-shadow: 0 2px 3px #1a191971;

    .chat-container {
      flex: 4;

      .messages-container {
        display: flex;
        flex-direction: column-reverse;
        border: 1px solid green;
        border-radius: 4px;
        padding: 10px;
        overflow: auto;
        height: 80%;
        .messages {
          list-style-type: none;
          text-decoration: none;

          .message {
            width: fit-content;
            max-width: 100%;
            overflow-wrap: break-word;
            margin: 2px 0;
            border: 1px solid rgba(128, 128, 128, 0.288);
            border-radius: 4px;
            background-color: #fff;

            .msg-time {
              width: 100%;
              background-color: #90ee903b;
              text-align: right;
              font-size: 12px;
            }

            .msg-text {
              margin: 4px;
            }
          }
        }
      }

      .user-input {
        display: flex;
        margin-top: 0.6rem;

        .msg-input {
          flex: 8;
          padding: 0 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .btn-send {
          flex: 1;
          margin-left: 0.6rem;
        }
      }
    }

    .joined-users {
      flex: 1;
      border: 1px solid black;
      border-radius: 4px;
      margin-left: 0.6rem;
      box-shadow: 0 2px 3px #1a191971;

      .joined-user {
        margin-top: 0px;
        text-align: center;
        border: 1px solid #b3e5fc;
        border-radius: 8px;
        border-right: none;
        border-left: none;
        box-shadow: 0 2px 3px #1a191971;
        cursor: pointer;
      }
      .joined-user:hover {
        background-color: #ccc;
      }
      .joined-user:not(:first-of-type) {
        margin-top: 4px;
      }
    }
  }

  .activity-map {
    height: 200px;
    margin-top: 2rem;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
  }
  // }
  .buttons {
    position: fixed;
    top: 43px;
    right: 60px;

    .user-buttons {
      position: absolute;
      bottom: 0px;
    }

    .edit-buttons {
      display: flex;
      flex-direction: column;
    }
  }
}

@media (max-width: 640px) {
  .room-form {
    display: flex !important;
    flex-direction: column !important;
  }
  .joined-users {
    position: inherit !important;
  }
  .chat {
    position: inherit !important;
    width: 100% !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
}
</style>
