<template>
  <ODNavbar :main="true">
    <div class="container">
      <h1 style="textAlign:center;">New Activity</h1>

      <div>
        <v-tabs :vertical="isMobile ? true : false" v-model="tab" class="tabs">
          <v-tab v-for="item in tabItems" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </div>

      <ValidationObserver
        class="observer"
        ref="observer"
        v-slot="{ handleSubmit }"
      >
        <v-tabs-items class="tabs-content" v-model="tab">
          <v-tab-item v-for="item in tabItems" :key="item.tab">
            <div class="tab-content" @keydown.enter="tab++">
              <keep-alive>
                <component
                  @change="setRoomProp($event)"
                  @err="handleError($event)"
                  :is="steps[tab]"
                ></component>
              </keep-alive>
            </div>
          </v-tab-item>
        </v-tabs-items>
        <div class="buttons">
          <v-btn
            v-if="tab == 5"
            @click.prevent="handleSubmit(createRoom(newRoom))"
            outlined
            rounded
            color="indigo"
            :disabled="!isValid"
          >
            Create
          </v-btn>
          <v-btn
            class="btn-next"
            v-if="tab != 5"
            @click="next()"
            outlined
            rounded
            color="indigo"
          >
            Next
          </v-btn>
        </div>
      </ValidationObserver>
    </div>
  </ODNavbar>
</template>

<script>
import ODNavbar from "../../ODNavbar";
import { ValidationObserver } from "vee-validate";

import AdressAutocomplete from "../AdressAutocomplete";
import ODTitle from "./ODTitle";
import ODDescription from "./ODDescription";
import ODParticipants from "./ODParticipants";
import ODDate from "./ODDate";
import ODCategory from "./ODCategory";

export default {
  created() {
    this.$store.dispatch("fetchUsers");
  },
  data() {
    return {
      inputErrors: {
        title: [],
        description: [],
        participants: [],
        date: [],
        category: [],
        address: [],
      },
      tab: null,
      newRoom: {
        title: "",
        description: "",
        participants: null,
        date: "",
        category: null,
        address: "",
      },
      steps: [
        ODTitle,
        ODDescription,
        ODParticipants,
        ODDate,
        ODCategory,
        AdressAutocomplete,
      ],
      tabItems: [
        { tab: "Title" },
        { tab: "Description" },
        { tab: "Participants" },
        { tab: "Date" },
        { tab: "Category" },
        { tab: "Address" },
      ],
    };
  },
  components: {
    ODNavbar,
    AdressAutocomplete,
    ODTitle,
    ODDescription,
    ODParticipants,
    ODDate,
    ODCategory,
    ValidationObserver,
  },
  methods: {
    handleError(errors) {
      this.inputErrors = { ...this.inputErrors, ...errors };
    },
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
          this.newRoom.category = change;
          break;
        case 5:
          this.newRoom.address = change;
          break;
      }
    },

    next() {
      this.tab <= 4 ? this.tab++ : (this.tab = 0);
    },
    createRoom(newRoom) {
      this.$refs.observer.validateWithInfo().then((succ) => {
        console.log("succ", succ);
        if (succ) {
          const activityDate = new Date(newRoom.date).toLocaleDateString(
            "en-GB"
          );
          this.$store
            .dispatch("addRoom", {
              title: newRoom.title,
              category: newRoom.category,
              date: activityDate,
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
        }
      });
    },
    getAddressString(address) {
      return address
        ? address.formatted_address
        : this.getAddress.addressString;
    },
    validate() {
      this.$refs.observer.validateWithInfo().then((succ) => {
        console.log("succ", succ);
      });
    },
  },
  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },
    getAddress() {
      return this.currentRoom ? this.currentRoom.address : false;
    },
    isMobile() {
      return this.$vuetify.breakpoint.width <= 700 ? true : false;
    },
    isValid() {
      this.validate();
      return !this.inputErrors.title.length &&
        !this.inputErrors.description.length &&
        !this.inputErrors.participants.length &&
        !this.inputErrors.date.length &&
        !this.inputErrors.category.length &&
        !this.inputErrors.address.length
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  // .v-tab {
  //   pointer-events: none;
  // }

  .tabs {
    display: flex;
    justify-content: center;
  }
  .observer {
    align-self: center;

    .tabs-content {
      margin-top: 3rem;

      .tab-content {
        display: flex;
        align-items: center;
        width: 20rem;
        height: 8rem;
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
