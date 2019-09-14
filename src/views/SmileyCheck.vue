<template>
  <v-layout wrap>
    <v-layout
      column
      align-center
      justify-space-between
      my-5
      px-1
    >
      <div class="display-1">
        Smile Counter: {{ smileCount }}
      </div>
      <v-flex sm4>
        <div class="title text-xs-center">
          {{ currentMonth | dateFormat('MMMM') }}
        </div>
      </v-flex>
    </v-layout>
    <v-flex
      v-touch="{
        left: () => $refs.calendar.prev(),
        right: () => $refs.calendar.next()
      }"
      xs12
      class="mb-3"
    >
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          color="success"
          @click:day="onClick"
        >
          <template v-slot:day="{ date }">
            <div>
              <v-icon
                v-if="eventsMap[date]"
                :color="eventsMap[date].value ? 'yellow darken-1' : 'orange accent-2' "
                class="darken-1"
                large
              >
                {{ eventsMap[date].value ? 'fa-smile-beam' : 'fa-sad-tear' }}
              </v-icon>
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
    <v-layout
      v-if="$vuetify.breakpoint.mdAndUp"
      justify-space-between
      align-center
    >
      <v-flex sm4>
        <v-btn
          color="info"
          depressed
          @click="$refs.calendar.prev()"
        >
          <v-icon
            dark
            left
          >
            keyboard_arrow_left
          </v-icon>
          Prev
        </v-btn>
      </v-flex>

      <v-flex
        sm4
        xs12
        class="text-sm-right text-xs-center"
      >
        <v-btn
          color="info"
          depressed
          @click="$refs.calendar.next()"
        >
          Next
          <v-icon
            right
            dark
          >
            keyboard_arrow_right
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SMILES from '@/store/modules/smiles/types';
import { SMILE_STATUS } from '@/utils/constants';

export default {
  data: () => ({
    type: 'month',
    start: new Date().toString(),
  }),
  computed: {
    ...mapState(SMILES.NAME, { events: 'smileys' }),
    eventsMap() {
      const map = {};
      this.events.forEach((e) => {
        map[e.date] = e;
      });
      return map;
    },
    smileCount() {
      return this.events
        .filter(s => s.status === SMILE_STATUS.UNCLAIMED)
        .reduce((result, current) => result + current.value, 0);
    },
    currentMonth() {
      return new Date(this.start.toString());
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    ...mapActions(SMILES.NAME, [
      SMILES.ACTIONS.ADD,
      SMILES.ACTIONS.REMOVE,
      SMILES.ACTIONS.UPDATE,
      SMILES.ACTIONS.FETCH,
    ]),
    onClick(data) {
      const cell = this.events.find(i => i.date === data.date);
      if (cell) {
        if (!cell.value) this.remove(cell);
        else this.update({ ...cell, value: 0 });
      } else {
        this.add({ ...data, value: 1 });
      }
    },
  },
};
</script>
