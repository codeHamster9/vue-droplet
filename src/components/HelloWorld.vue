<template>
  <v-layout row wrap justify-center>
    <v-flex xs3>
      <span class="title">Welcome To THe World!</span>
      <mini-me :msg="localMsg"></mini-me>
    </v-flex>
  </v-layout>
</template>

<script>
import { MyMsg } from '@/utils/classes';
import miniMe from './miniMe.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      localMsg: new MyMsg('Hello', 'Bob'),
    };
  },
  components: {
    miniMe,
  },
};
</script>
