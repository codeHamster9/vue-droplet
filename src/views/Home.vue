<template>
  <v-layout
    column
    justify-center
  >
    <v-flex ma-5>
      <span class="title">Select Kid</span>
    </v-flex>
    <v-flex>
      <v-item-group>
        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-item
            v-for="kid in kids"
            :key="kid.id"
          >
            <v-card
              slot-scope="{ active, toggle}"
              width="200"
              height="200"
              class="ma-5"
            >
              <v-layout
                column
                align-center
                justify-center
                fill-height
                :selected="active"
                @click="select(kid, toggle)"
              >
                <v-subheader>{{ kid.name }} : {{ kid.age }}</v-subheader>
                <v-avatar
                  size="72px"
                  color="#033"
                >
                  <img
                    v-if="kid.avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    alt="Avatar"
                  >
                  <v-icon
                    v-else
                    medium
                    :color="genderColor(kid.gender)"
                  >
                    people
                  </v-icon>
                </v-avatar>
              </v-layout>
            </v-card>
          </v-item>
        </v-layout>
      </v-item-group>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { types as KIDS } from '@/store/modules/kids';
import { routeNames } from '@/router/route-names';

export default {
  name: 'Home',

  computed: {
    ...mapState('user', {
      userId: state => Number(state.userId),
    }),
    ...mapState('kids', ['kids']),
    genderColor() {
      return gender => (gender.toLowerCase() === 'male' ? 'blue' : 'pink');
    },
  },
  mounted() {
    this.fetch(this.userId);
  },
  methods: {
    ...mapMutations('kids', [KIDS.MUTATIONS.SET_ACTIVE]),
    ...mapActions('kids', [KIDS.ACTIONS.FETCH]),
    select(activeKid, toggleFn) {
      this.setActive(activeKid.id);
      toggleFn();
      setTimeout(() => {
        this.$router.push({ name: routeNames.SMILES });
      }, 750);
    },
  },
};
</script>

<style>
.v-item--active {
  border-radius: 25%;
  border-color: aquamarine;
  border: 5px solid var(--v-accent-base) !important;
}
</style>
