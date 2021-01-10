<template>
  <v-app>
    <v-app-bar height="80">
      <v-avatar class="mr-3" color="grey lighten-5" size="70">
        <v-img
          contain
          max-height="70%"
          src="../assets/outdoor_logo.png"
        ></v-img>
      </v-avatar>

      <v-toolbar-title class="font-weight-black headline">
        OutDoor
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn dark color="green" to="/login" rounded>Login</v-btn>
    </v-app-bar>

    <v-sheet>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            class="full-height"
            :style="{
              height: 'calc(100vh - 80px)',
              width: '100%',
            }"
            src="https://picsum.photos/id/1015/4096/2048"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col class="white--text text-center" cols="12" tag="h1">
                    <span
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-1'
                          : 'display-2',
                      ]"
                      class="font-weight-light"
                    >
                      WELCOME TO
                    </span>

                    <br />

                    <span
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-3'
                          : 'display-4',
                      ]"
                      class="font-weight-black"
                    >
                      OutDoor
                    </span>
                  </v-col>

                  <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="
                      $vuetify.goTo('#what', {
                        duration: 2000,

                        easing: 'easeOutQuint',
                      })
                    "
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="what">
        <div class="py-4"></div>

        <v-container
          class="text-center full-height"
          :style="{ height: 'calc(100vh - 64px)' }"
        >
          <h2 class="display-2 font-weight-bold mb-3">UNDER DEVELOPMENT</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et
            aliquet magna. Aenean viverra lacus eget nibh cursus, et
            sollicitudin turpis congue. Pellentesque velit enim, rhoncus ut
            tempus ut, tempor sed enim. Nulla tincidunt suscipit maximus. Sed id
            nulla lobortis, placerat urna eget, condimentum lacus. Sed quis nibh
            lobortis arcu aliquam ornare id et sem. Nullam pellentesque
            fringilla interdum. Cras gravida, libero ut ultricies vehicula, mi
            dolor sollicitudin nibh, eget blandit neque erat ac nunc.
          </v-responsive>

          <div></div>

          <v-btn
            color="grey"
            href="https://github.com/shahafss/OutDoor-Vue"
            :style="{ marginTop: '2rem' }"
            outlined
            large
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              GitHub Repository
            </span>
          </v-btn>

          <br />

          <v-btn
            class="align-self-end"
            style="margin-top: 2rem;"
            fab
            outlined
            @click="
              $vuetify.goTo('#features', {
                duration: 2000,

                easing: 'easeOutQuint',
              })
            "
          >
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </v-container>

        <div class="py-4"></div>
      </section>

      <section>
        <v-parallax
          :height="400"
          src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        >
        </v-parallax>
      </section>

      <section id="features" class="grey lighten-3">
        <div class="py-6"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">FEATURES</h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card class="py-12 px-4" color="grey lighten-5" flat>
                <v-theme-provider dark>
                  <div>
                    <v-avatar color="primary" size="88">
                      <v-icon large v-text="icon"></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-6"></div>
      </section>

      <section id="blog">
        <div class="py-4"></div>

        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
          >
            Activities
          </h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ src, text, title }, i) in activities"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="src"
                class="mb-4"
                height="275"
                max-width="100%"
              ></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
                v-text="title"
              ></h3>

              <div class="title font-weight-light mb-5" v-text="text"></div>

              <v-btn to="/new-room" class="ml-n4 font-weight-black " text>
                Create your activity
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-4"></div>
      </section>
    </v-sheet>

    <v-footer class="justify-center" color="#292929" height="100">
      <div
        class="title font-weight-light grey--text text--lighten-1 text-center"
      >
        &copy; {{ new Date().getFullYear() }} — OutDoor
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          src:
            "https://images.unsplash.com/photo-1594623274890-6b45ce7cf44a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          title: "Sport",
          text:
            "Missing a couple of teamates for a Basketball game? Find people to join you or join others.",
        },
        {
          src:
            "https://images.unsplash.com/photo-1591261495530-262c58c5f31a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
          title: "Protest",
          text:
            "We are stronger when united. Find more poeple who also thinks that things should be different.",
        },
        {
          src:
            "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          title: "Hangout",
          text:
            "Activity doesnt have to be super active. It could also be just chlling and meeting new people.",
        },
      ],
      features: [
        {
          icon: "mdi-account-group-outline",
          title: "Vue JS",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam",
        },
        {
          icon: "mdi-update",
          title: "Firebase",
          text:
            "Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit.",
        },
        {
          icon: "mdi-shield-outline",
          title: "Vuetify",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
