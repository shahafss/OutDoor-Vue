<template>
  <div>
    <div style="marginRight: 3.5rem;">
      <div class="time">
        <span>Start:</span>
        <ODTimeInput @timeSelect="setStart($event)"></ODTimeInput>
      </div>

      <div class="time" style="marginTop: 1rem;">
        <span>End:</span>
        <ODTimeInput @timeSelect="setEnd($event)"></ODTimeInput>
      </div>
    </div>
    <v-btn outlined rounded color="indigo" @click="$emit('next')">Next</v-btn>
  </div>
</template>

<script>
import ODTimeInput from "../../ODTimeInput";

export default {
  data() {
    return {
      time: {
        start: {
          hour: "",
          minute: "",
        },
        end: {
          hour: "",
          minute: "",
        },
      },
      selectedMinute: "",
      showHours: false,
      showMinutes: false,
    };
  },
  components: {
    ODTimeInput,
  },
  methods: {
    setStart(time) {
      this.time.start.hour = time.hour;
      this.time.start.minute = time.minute;
      this.$emit("change", this.time);
    },
    setEnd(time) {
      this.time.end.hour = time.hour;
      this.time.end.minute = time.minute;
      this.$emit("change", this.time);
    },
  },
};
</script>

<style lang="scss" scoped>
.time {
  display: flex;
  align-items: center;

  span {
    width: 40px;
    text-align: end;
    margin-right: 1rem;
  }
}

.v-btn {
  margin-top: 32px;
}
</style>
