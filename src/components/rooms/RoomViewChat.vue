<template>
  <div class="chat-container">
    <div class="chat" ref="chatContainer">
      <div class="messages-container">
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
        <v-text-field
          :style="{ width: '100%' }"
          solo
          hide-details
          @keydown.enter="sendMessage(message)"
          v-model="message"
          type="text"
          placeholder="message.."
        />
        <v-btn
          :style="{ height: '100%' }"
          color="success"
          class="btn-send"
          @click="sendMessage(message)"
        >
          Send
        </v-btn>
      </div>
    </div>

    <div class="joined-users">
      <transition-group name="list">
        <router-link
          v-for="user in joinedUsers"
          :to="'/profile/' + user.id"
          :key="user.id"
          tag="div"
          class="joined-user"
        >
          {{ user.username }}
        </router-link>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["joinedUsers", "currentRoom"],
  data() {
    return {
      message: "",
      scrollPosition: null,
      randomColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
  },
  mounted() {
    this.scrollToBottom();
  },
  computed: {
    messages() {
      return this.currentRoom ? this.currentRoom.messages : false;
    },
    isJoinedUser() {
      if (!this.joinedUsers) return;
      return this.joinedUsers.some(
        (user) => user.id == this.$store.getters.getUser.id
      );
    },
  },
  methods: {
    sendMessage(message) {
      if (message == "") return;

      const date = new Date();
      const messageData = {
        text: message,
        username: this.$store.getters.getUser.username,
        timestamp: date.toLocaleTimeString(),
        roomId: this.currentRoom.id,
      };

      this.$store.dispatch("postMessage", messageData).then(() => {
        this.scrollToBottom();
      });

      this.message = "";
    },
    getMessageTime(timestamp) {
      const messageTime = new Date(timestamp);
      return messageTime;
    },

    scrollToBottom() {
      if (!this.$refs.chatContainer) return;
      this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
    },
  },
};
</script>
<style lang="scss" scoped>
$white: #ffffff;

.chat-container {
  margin-top: 2rem;
  display: flex;
  height: 240px;
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: #e1f5fe;
  box-shadow: 0 2px 3px #1a191971;

  .chat {
    display: flex;
    flex: 4;
    flex-direction: column;

    .messages-container {
      display: flex;
      flex-direction: column-reverse;
      height: 100%;
      border: 1px solid green;
      border-radius: 4px;
      background-color: $white;
      padding: 10px;
      overflow: auto;

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
          background-color: $white;

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

      .btn-send {
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
    background-color: $white;

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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
