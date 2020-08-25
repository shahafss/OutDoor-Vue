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
        <div class="pull-right">
          <div v-if="isFull" class="full-label btn btn-default">Full</div>
        </div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  height: 20rem;
  cursor: pointer;

  .panel-body {
    height: 100%;
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
      bottom: 31px;
      margin-top: 2rem;
      width: fit-content;
      border: 1px solid rgba(0, 128, 0, 0.342);
      border-radius: 4px;
      padding: 3px;
    }

    .full-label {
      position: absolute;
      bottom: 31px;
      right: 31px;
    }
  }
}
</style>
