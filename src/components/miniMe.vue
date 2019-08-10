<template>
  <v-layout row wrap justify-center>
    <v-flex xs3>
      <span class="title">{{ msg.body}}</span>
      <span class="sub-title">{{ msg.head }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
import { MyMsg } from '@/utils/classes';

export default {
  props: {
    msg: MyMsg,
  },
};
</script>
