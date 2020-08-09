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
        <div>
          {{ room.description }}
        </div>
        <div>
          Participants: {{ room.joinedUsers.length }}/{{ room.participants }}
        </div>
        <div class="pull-right">
          <router-link
            v-if="!isFull"
            :to="'/room/' + room.id"
            class="btn btn-success"
            tag="button"
          >
            Join
          </router-link>
          <button v-else class="btn btn-default" disabled>Full</button>
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
  cursor: pointer;
}
</style>
