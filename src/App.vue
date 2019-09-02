<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"
                         fixed
                         clipped
                         dark
                         app>
      <v-list>
        <v-subheader class="mt-3 grey--text text--darken-1">ROUTES</v-subheader>
        <v-list-tile v-for="item in items"
                     :key="item.text"
                     ripple
                     @click="navigate(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>

            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>

          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="light-blue accent-1"
               fixed
               clipped-left
               app>
      <v-toolbar-side-icon @click.stop="drawer=!drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Portal</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row
                justify-end>
        <v-menu v-model="showMenu"
                absolute
                offset-y
                style="max-width: 600px">
          <v-avatar slot="activator"
                    color="black">
            <v-icon dark>account_circle</v-icon>
          </v-avatar>
          <v-list>
            <v-list-tile>
              <v-list-tile-title @click="logout">Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fill-height
                   fluid>
        <router-view></router-view>
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
        icon: 'gif',
      },
      {
        text: 'Kids',
        url: '/kids',
        icon: 'face',
      },
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    navigate(item) {
      this.$router.push(item.url);
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
