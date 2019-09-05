<template>
  <v-layout column>
    <v-flex md11>
      <v-card class="red--text">
        <v-list three-line>
          <template v-for="(kid, index) in kids">
            <div :key="kid.name">
              <v-list-tile
                avatar
                ripple
                @click="selectedKid = kid"
              >
                <v-list-tile-avatar>
                  <img
                    v-if="kid.avatar"
                    :src="kid.avatar"
                  >
                  <v-icon v-else>
                    face
                  </v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ kid.name }} {{ kid.age }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ kid.gender }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="selectedKid.id === kid.id">
                  <v-layout
                    row
                    align-center
                    justify-space-around
                  >
                    <v-btn
                      flat
                      icon
                      color="primary"
                      class="px-4"
                      @click="editKid(kid)"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      ripple
                      class="px-4"
                      @click="removeKid(kid)"
                    >
                      <v-icon color="red">
                        highlight_off
                      </v-icon>
                    </v-btn>
                  </v-layout>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                v-if="kids.length > 1 && index != kids.length - 1"
                inset
              />
            </div>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex
      md1
      text-lg-right
    >
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fab
          @click="addKid"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-flex>
    <add-kid-dialog
      :show="showDialog"
      :kid="selectedKid"
      @create="onCreate"
      @edit="onEdit"
      @close="showDialog = false"
    />
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { types as KIDS } from '@/store/modules/kids';
import AddKidDialog from '@/components/AddKidDialog.vue';

export default {
  name: 'Kids',
  components: {
    AddKidDialog,
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
  mounted() {
    this.fetch(this.userId);
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
