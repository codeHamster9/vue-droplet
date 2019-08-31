<template>
  <v-layout column>
    <v-flex md6>
      <v-layout row
                wrap>
        <v-flex xs12>
          <v-card class="red--text">

            <v-list three-line>
              <template v-for="(kid, index) in kids">
                <div :key="kid.name">
                  <v-list-tile avatar
                               ripple
                               @click="selectedKid = kid">
                    <v-list-tile-avatar>
                      <img v-if="kid.avatar "
                           :src="kid.avatar" />
                      <v-icon v-else>face</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ kid.name }} {{ (kid.age)}}</v-list-tile-title>
                      <v-list-tile-sub-title v-html="kid.gender"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="selectedKid.id === kid.id">
                      <v-layout row
                                align-center
                                justify-space-around>
                        <v-btn flat
                               icon
                               color="primary"
                               @click="editKid(kid)"
                               class="px-4">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon
                               ripple
                               @click="removeKid(kid)"
                               class="px-4">
                          <v-icon color="red">highlight_off</v-icon>
                        </v-btn>
                      </v-layout>
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
                      :kid="selectedKid"
                      @create="onCreate"
                      @edit="onEdit"
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
      selectedKid: {
        id: null,
        age: null,
        name: null,
        gender: null,
      },
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
    editKid(kid) {
      this.showDialog = true;
      this.selectedKid = kid;
    },
    removeKid(kid) {
      this.delete(kid);
    },
    onCreate(kid) {
      this.showDialog = false;
      this.create({ ...kid, userId: this.userId });
    },
    onEdit(kid) {
      this.showDialog = false;
      this.update({ ...kid, userId: this.userId });
      this.selectedKid = {
        id: null,
        age: null,
        name: null,
        gender: null,
      };
    },
    ...mapActions('kids', [
      KIDS.ACTIONS.FETCH,
      KIDS.ACTIONS.CREATE,
      KIDS.ACTIONS.DELETE,
      KIDS.ACTIONS.UPDATE,
    ]),
  },
};
</script>
