<template>
  <v-container fluid
               grid-list-lg>
    <v-layout row
              justify-center>
      <v-dialog :value="true"
                hide-overlay
                persistent
                max-width="290">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <simple-form @submit="signIn"
                         :error-text="msg"></simple-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import SimpleForm from './SimpleForm.vue';

export default {
  name: 'login',
  components: {
    SimpleForm,
  },
  data() {
    return {
      dialog: false,
      msg: '',
    };
  },
  methods: {
    signIn({ email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (user) => {
            console.log(user);
            this.$router.replace('hello');
          },
          (err) => {
            this.msg = err.message;
          },
        );
    },
  },
};
</script>

<style scoped>

.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
