<template>
  <div class="time-container">
    <div class="input-container">
      <input
        class="input-time"
        v-model="selectedHour"
        @focus="showHourPicker = !showHourPicker"
        @blur="hideHr()"
        readonly
      />
      <AppFade>
        <v-card class="picker" v-show="showHourPicker">
          <v-list class="picker-list">
            <v-list-item
              v-for="num in hours"
              :key="num"
              @click="selectedHour = num"
              :class="{ selected: selectedHour == num }"
              class="picker-item"
            >
              {{ num }}
            </v-list-item>
          </v-list>
        </v-card>
      </AppFade>
    </div>
    <span>:</span>
    <div class="input-container">
      <input
        class="input-time"
        v-model="selectedMinute"
        @focus="showMinutePicker = !showMinutePicker"
        @blur="hideMin()"
        readonly
      />
      <AppFade>
        <v-card class="picker" v-show="showMinutePicker">
          <v-list class="picker-list">
            <v-list-item
              v-for="num in minutes"
              :key="num"
              @click="selectedMinute = num"
              :class="{ selected: selectedMinute == num }"
              class="picker-item"
            >
              {{ num }}
            </v-list-item>
          </v-list>
        </v-card>
      </AppFade>
    </div>
  </div>
</template>

<script>
import AppFade from "./utils/AppFade";
export default {
  data() {
    return {
      time: {
        hour: "",
        minute: "",
      },
      selectedHour: "",
      selectedMinute: "",
      showHourPicker: false,
      showMinutePicker: false,
      hours: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      minutes: ["00", "10", "20", "30", "40", "50"],
    };
  },
  components: {
    AppFade,
  },
  created() {
    this.selectedHour = "01";
    this.selectedMinute = "00";
  },
  watch: {
    selectedHour(val) {
      this.time.hour = val;
      this.$emit("timeSelect", this.time);
    },
    selectedMinute(val) {
      this.time.minute = val;
      this.$emit("timeSelect", this.time);
    },
  },
  methods: {
    hideHr() {
      setTimeout(() => {
        this.showHourPicker = false;
      }, 100);
    },
    hideMin() {
      setTimeout(() => {
        this.showMinutePicker = false;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-container {
  align-items: center;
  display: flex;
  span {
    margin: 0 0.5rem;
    font-size: 24px;
  }
  .input-container {
    position: relative;
    border-radius: 4px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px 0px rgba(0, 0, 0, 0.14) !important;
    .input-time {
      width: 5rem;
      height: 3rem;
      border: 1px solid black;
      text-align: center;
      border-radius: 4px;
    }
  }
  .input-container:hover {
    background-color: #cccc;
  }
  .picker {
    position: absolute;
    z-index: 99;
    top: -60%;

    .picker-list {
      height: 10rem;
      width: 5rem;
      overflow: auto;
      padding: 0;

      .picker-item {
        justify-content: center;
        border-bottom: 1px solid #5a5858cc;
        background-color: white;

        &.selected {
          background-color: #cccc;
        }
      }
      .time:hover {
        cursor: pointer;
        transition: background-color 0.3s ease;
        background-color: #cccc;
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
