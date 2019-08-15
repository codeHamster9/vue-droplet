<template>
 <v-layout wrap>

     <v-layout align-center justify-center ma-5 justify-space-between>
       <div class="display-1">Good Smile: {{ goodSmileCount }} </div>
       <div class="display-1">Bad Smile: {{ badSmileCount }} </div>
     </v-layout>

    <v-flex
      xs12
      class="mb-3">
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
              <v-icon v-if="eventsMap[date]"
                      :color="eventsMap[date].color"
                      class="darken-1"
                      large>face
              </v-icon>
            </div>
        </template>


        </v-calendar>
      </v-sheet>
    </v-flex>
<v-layout justify-space-between>

    <v-flex>
      <v-btn color="info" @click="$refs.calendar.prev()">
        <v-icon dark
                left> keyboard_arrow_left
        </v-icon>
        Prev
      </v-btn>
    </v-flex>

    <v-flex
      sm4
      xs12
      class="text-sm-right text-xs-center"
    >
      <v-btn color="info" @click="$refs.calendar.next()">
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

export default {
  data: () => ({
    type: 'month',
    start: Date.now().toString(),
  }),
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapState('smiles', { events: 'smileys' }),
    eventsMap() {
      const map = {};
      this.events.forEach((e) => {
        (map[e.date] = e);
      });
      return map;
    },
    goodSmileCount() {
      return this.events.filter(e => e.color === 'yellow darken-1').length;
    },
    badSmileCount() {
      return this.events.filter(e => e.color === 'orange accent-2').length;
    },
  },
  methods: {
    ...mapActions('smiles', ['add', 'remove', 'update', 'fetch']),
    onClick(data) {
      const cell = this.events.find(i => i.date === data.date);
      if (cell) {
        if (cell.color === 'orange accent-2') {
          this.remove(cell);
        } else {
          this.update(cell);
        }
      } else {
        this.add({ ...data, color: 'yellow darken-1' });
      }
    },
  },
};
</script>

