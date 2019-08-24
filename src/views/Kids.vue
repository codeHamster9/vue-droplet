<template>
  <v-layout column>
    <v-flex md6>
      <v-layout row
                wrap>
        <v-flex xs12>
          <v-card class="red--text">

            <v-list three-line>
              <template v-for="(item, index) in kids">
                <div :key="item.name">
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img v-if="item.avatar "
                           :src="item.avatar" />
                      <v-icon v-else>face</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.name }} {{ (item.age)}}</v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.gender"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon
                             ripple
                             @click="removeKid(item)">
                        <v-icon color="red">highlight_off</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider inset
                             v-if="kids.length > 1 && index != kids.length -1"></v-divider>
                </div>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs1>
      <add-kid-dialog :show="showDialog"
                      @submit="onSubmit"
                      @close="showDialog = false"></add-kid-dialog>
      <v-fab-transition>
        <v-btn color="green"
               dark
               absolute
               bottom
               right
               fab
               @click="addKid">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { types as KIDS } from '@/store/modules/kids';
import AddKidDialog from '@/components/AddKidDialog.vue';

export default {
  name: 'kids',
  components: {
    AddKidDialog,
  },
  mounted() {
    this.fetch(this.userId);
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    ...mapState('user', {
      userId: state => Number(state.userId),
    }),
    ...mapState('kids', ['kids']),
  },
  methods: {
    addKid() {
      this.showDialog = true;
    },
    removeKid(kid) {
      this.delete(kid);
    },
    onSubmit(kid) {
      this.showDialog = false;
      this.create({ ...kid, userId: this.userId });
    },
    ...mapActions('kids', [
      KIDS.ACTIONS.FETCH,
      KIDS.ACTIONS.CREATE,
      KIDS.ACTIONS.DELETE,
    ]),
  },
};
</script>
