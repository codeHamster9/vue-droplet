<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      :dark="dark"
      app
    >
      <v-list>
        <v-subheader class="mt-3 grey--text text--darken-1">
          ROUTES
        </v-subheader>
        <router-link
          v-for="item in items"
          :key="item.text"
          v-slot="{ href, route, navigate, isExactActive }"
          :to="item.url"
        >
          <v-list-tile
            ripple
            :class="[isExactActive && 'router-link-exact-active']"
            @click="navigate"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-divider />
        <v-list-tile
          ripple
          @click="settings"
        >
          <v-list-tile-action>
            <v-icon>fa-cog</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              Settings
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          ripple
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="light-blue accent-1"
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer=!drawer" />
      <v-icon class="mx-3">
        fa-robot
      </v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Kids Smile Tracker</span>
      </v-toolbar-title>
      <v-spacer />
      <v-layout
        row
        justify-end
      >
        <v-menu

          absolute
          offset-y
          style="max-width: 600px"
        >
          <v-avatar
            slot="activator"
            color="black"
          >
            <v-icon dark>
              account_circle
            </v-icon>
          </v-avatar>
        </v-menu>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-layout
        v-if="$wait.any"
        row
        wrap
        fill-height
        align-center
        justify-center
        class="indigo lighten-5"
      >
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="blue darken-2"
        />
      </v-layout>
      <v-container
        fill-height
        fluid
      >
        <router-view />
      </v-container>
    </v-content>
    <dialog-settings
      :show="showSettings"
      @close="showSettings = false"
      @apply="onApply"
    />
  </v-app>
</template>

<script>
import firebase from '@/firebase';
import DialogSettings from '@/components/DialogSettings.vue';

export default {
  components: { DialogSettings },
  data: () => ({
    drawer: null,
    showMenu: false,
    showSettings: false,
    dark: true,
    items: [
      {
        text: 'Home',
        url: '/',
        icon: 'home',
      },
      {
        text: 'Smile',
        url: '/smiley',
        icon: 'group',
      },
      {
        text: 'Gifts',
        url: '/gifts',
        icon: 'fas fa-gifts',
      },
      {
        text: 'Kids',
        url: '/kids',
        icon: 'face',
      },
    ],
  }),
  methods: {
    settings() {
      this.showSettings = true;
    },
    onApply(payload) {
      this.dark = payload.dark;
      this.showSettings = false;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: lightblue;
}
</style>
