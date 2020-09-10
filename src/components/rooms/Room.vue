<template>
  <div class="col-sm-6 col-md-4">
    <router-link
      :to="'/room/' + room.id"
      tag="div"
      :disabled="isFull && !isJoinedUser"
      :event="!isFull || isJoinedUser ? 'click' : ''"
      class="panel panel-success"
    >
      <div class="panel-heading">
        <h3 class="panel-title">{{ room.title }}</h3>
      </div>
      <div class="panel-body">
        <div class="description">
          {{ room.description }}
        </div>
        <div class="participants">
          Participants: {{ room.joinedUsers.length }}/{{ room.participants }}
        </div>
        <div v-if="isFull" class="full-label">Full</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["room"],
  computed: {
    isFull() {
      return this.room.participants == this.room.joinedUsers.length;
    },
    isJoinedUser() {
      if (this.$store.getters.getUser)
        return this.room.joinedUsers.includes(this.$store.getters.getUser.id);
    },
    category() {
      return this.room.category;
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  height: 20rem;
  box-shadow: 0 2px 3px #ccc;
  display: flex;
  flex-direction: column;

  cursor: pointer;

  .panel-body {
    height: 100%;
    position: relative;
    .description {
      min-height: 2rem;
      max-height: 9rem;
      overflow-y: scroll;
      border: 1px solid rgba(0, 128, 0, 0.342);
      border-radius: 4px;
      padding: 3px;
    }

    .participants {
      position: absolute;
      bottom: 0;
      margin-top: 2rem;
      width: fit-content;
      border: 1px solid rgba(0, 128, 0, 0.342);
      border-radius: 4px 4px 0 0;
      padding: 3px;
      border-bottom: none;
    }

    .full-label {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ccc;
      font-size: 25px;
      font-weight: 600;
      opacity: 80%;
      height: 4rem;
      position: absolute;
      top: 33%;
      left: 0;
      width: 100%;
    }
  }
}
</style>
