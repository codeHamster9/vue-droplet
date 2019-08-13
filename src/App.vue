<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" dark fixed clipped app>


    </v-navigation-drawer>
    <v-toolbar color="red" fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer=!drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Sprint Namer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row justify-end>
        <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
          <v-avatar slot="activator" color="black">
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
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex md12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
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
  }),
  props: {
    source: String,
  },
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
