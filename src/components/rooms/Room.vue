<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
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
            :to="'/room/' + room.id"
            class="btn btn-success"
            tag="button"
          >
            Join
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["room"]
};
</script>

<style lang="scss" scoped></style>
