<template>
  <ODNavbar :main="true">
    <div>
      <h1 style="textAlign:center;">New Activity</h1>

      <div>
        <v-tabs :vertical="isMobile" v-model="tab" class="tabs">
          <v-tab v-for="item in tabItems" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </div>

      <ValidationObserver
        class="observer"
        ref="observer"
        v-slot="{ invalid, validated }"
      >
        <v-tabs-items class="tabs-content" v-model="tab">
          <v-tab-item v-for="item in tabItems" :key="item.tab">
            <div class="tab-content">
              <v-form @submit.prevent>
                <keep-alive>
                  <component
                    ref="inputcomp"
                    class="form-input"
                    @change="setRoomProp($event)"
                    @next="next()"
                    :is="item.component"
                    :type="item.type"
                    :required="item.required"
                    :min="item.min"
                    :max="item.max"
                    :name="item.tab"
                    :autofocus="true"
                  ></component>
                </keep-alive>
              </v-form>
            </div>
          </v-tab-item>
        </v-tabs-items>
        <v-btn
          v-if="tab == 6"
          @click="createRoom(newRoom)"
          outlined
          rounded
          color="indigo"
          :disabled="invalid || !validated"
        >
          Create
        </v-btn>
      </ValidationObserver>
    </div>
  </ODNavbar>
</template>

<script>
import ODNavbar from "../../nav/ODNavbar";
import { ValidationObserver } from "vee-validate";

import AdressAutocomplete from "../AdressAutocomplete";
import NewRoomInput from "./NewRoomInput";
import ODCategory from "./ODCategory";
import ODDate from "./ODDate";
import ODTime from "./ODTime";

export default {
  created() {
    this.$store.dispatch("fetchUsers");
  },
  data() {
    return {
      tab: null,
      newRoom: {
        title: "",
        description: "",
        participants: null,
        date: "",
        time: {
          start: { hour: "", minute: "", ampm: "" },
          end: { hour: "", minute: "", ampm: "" },
        },
        category: null,
        address: "",
      },
      tabItems: [
        {
          tab: "Title",
          component: NewRoomInput,
          type: "text",
          required: true,
          min: 6,
          max: 40,
        },
        {
          tab: "Description",
          component: NewRoomInput,
          type: "text",
          required: true,
          min: 10,
          max: 150,
        },
        {
          tab: "Participants",
          component: NewRoomInput,
          type: "number",
          required: true,
        },
        {
          tab: "Date",
          component: ODDate,
          required: true,
        },
        {
          tab: "Time",
          component: ODTime,
        },
        { tab: "Category", component: ODCategory },
        { tab: "Address", component: AdressAutocomplete },
      ],
    };
  },
  components: {
    NewRoomInput,
    ODNavbar,
    ODCategory,
    ODDate,
    ODTime,
    AdressAutocomplete,
    ValidationObserver,
  },
  methods: {
    setRoomProp(change) {
      switch (this.tab) {
        case 0:
          this.newRoom.title = change;
          break;
        case 1:
          this.newRoom.description = change;
          break;
        case 2:
          this.newRoom.participants = change;
          break;
        case 3:
          this.newRoom.date = change;
          break;
        case 4:
          this.newRoom.time.start.hour = change.start.hour;
          this.newRoom.time.start.minute = change.start.minute;
          this.newRoom.time.end.hour = change.end.hour;
          this.newRoom.time.end.minute = change.end.minute;
          this.newRoom.time.start.ampm = change.start.ampm;
          this.newRoom.time.end.ampm = change.end.ampm;
          break;
        case 5:
          this.newRoom.category = change;
          break;
        case 6:
          this.newRoom.address = change;
          break;
      }
    },

    createRoom(newRoom) {
      const activityDate = new Date(newRoom.date);

      this.$store
        .dispatch("addRoom", {
          title: newRoom.title,
          category: newRoom.category,
          date: activityDate,
          startTime: `${newRoom.time.start.hour}:${newRoom.time.start.minute} ${newRoom.time.start.ampm}`,
          endTime: `${newRoom.time.end.hour}:${newRoom.time.end.minute} ${newRoom.time.end.ampm}`,
          description: newRoom.description,
          participants: newRoom.participants,
          messages: [],
          address: {
            addressString: this.getAddressString(newRoom.address),
            lat: newRoom.address
              ? newRoom.address.latitude
              : this.getAddress.lat,
            lng: newRoom.address
              ? newRoom.address.longitude
              : this.getAddress.lng,
          },
          admin: this.$store.state.auth.user.id,
          joinedUsers: [this.$store.state.auth.user.id],
          active: true,
        })
        .then(
          (res) => {
            if (res.status == 201)
              this.$router.push("/room/" + res.data.roomId);
          },
          (error) => {
            console.log("createRoom error>> ", error);
          }
        );
    },
    getAddressString(address) {
      return address
        ? address.formatted_address
        : this.getAddress.addressString;
    },
    next() {
      this.tab <= 5 ? this.tab++ : (this.tab = 0);
    },
  },
  computed: {
    getAddress() {
      return this.currentRoom ? this.currentRoom.address : false;
    },
    isMobile() {
      return this.$vuetify.breakpoint.width <= 700 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  .v-tab {
    // pointer-events: none;
  }

  .tabs {
    display: flex;
    justify-content: center;
  }
  .observer {
    display: flex;
    flex-direction: column;
    align-items: center;

    .tabs-content {
      margin-top: 2rem;

      .form-input {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .tab-content {
        width: 20rem;
      }
    }
  }
}
</style>
