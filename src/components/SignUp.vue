<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input
      v-model="email"
      type="text"
      placeholder="Email"
    >
    <br>
    <input
      v-model="password"
      type="password"
      placeholder="Password"
    >
    <br>
    <button @click="signUp">
      Sign Up
    </button>
    <span>or go back to
      <router-link to="/login">login</router-link>.
    </span>
  </div>
</template>

<script>
import firebase from '@/firebase';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.$router.replace('home');
        },
        (err) => {
          console.log(`Oops. ${err.message}`);
        },
      );
    },
  },
};
</script>

<style scoped>
.signUp {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
