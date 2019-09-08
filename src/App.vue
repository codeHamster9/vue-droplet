<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      dark
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
        fab fa-youtube
      </v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Portal</span>
      </v-toolbar-title>
      <v-spacer />
      <v-layout
        row
        justify-end
      >
        <v-menu
          v-model="showMenu"
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
          <v-list>
            <v-list-tile>
              <v-list-tile-title @click="logout">
                Logout
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
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
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  data: () => ({
    drawer: null,
    showMenu: false,
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
