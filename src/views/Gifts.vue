<template>
  <v-card>
    <v-card-text height="200px">
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-list-tile avatar
                       :key="index"
                       ripple
                       @click="">
            <v-list-tile-avatar color=""
                                size="70">
              <img src="../assets/gift.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title> {{ item.status === 'claimed' ? 'claimed' : 'created'}} : {{ item.claimedAt ? item.claimedAt : item.createdAt }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card-text>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Gifts Won!</h3>
        <div>Claim unchecked gifts</div>
      </div>
    </v-card-title>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'won!',
          status: 'claimed',
          createdAt: '07.08.2019',
          claimedAt: '15.08.2019',
        },
        {
          title: 'collect',
          status: 'unclaimed',
          createdAt: '01.08.2019',
          claimedAt: null,
        },
      ],
    };
  },
};
</script>
