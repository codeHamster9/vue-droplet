<template>
 <v-layout wrap>
    <v-flex
      xs12
      class="mb-3">
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="success"
          @click:day="onClick"

        >

        <template v-slot:day="{ date }">

            <div>
              <v-icon v-if="eventsMap[date]" color="yellow">face</v-icon>
            </div>
        </template>


        </v-calendar>
      </v-sheet>
    </v-flex>

    <v-flex
      sm4
      xs12
      class="text-sm-left text-xs-center"
    >
      <v-btn @click="$refs.calendar.prev()">
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
      class="text-xs-center"
    >
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
      ></v-select>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-sm-right text-xs-center"
    >
      <v-btn @click="$refs.calendar.next()">
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

</template>

<script>
export default {
  data: () => ({
    type: 'month',
    start: '2019-01-01',
    end: '2019-01-06',
    typeOptions: [
      { text: 'Day', value: 'day' },
      { text: '4 Day', value: '4day' },
      { text: 'Week', value: 'week' },
      { text: 'Month', value: 'month' },
      { text: 'Custom Daily', value: 'custom-daily' },
      { text: 'Custom Weekly', value: 'custom-weekly' },
    ],
    events: [{
      title: 'Conference',
      details: 'Mute myself the whole time and wonder why I am on this call',
      date: '2019-01-21',
      open: false,
    },
    {
      title: 'Hackathon',
      details: 'Code like there is no tommorrow',
      date: '2019-02-01',
      open: false,
    }],
  }),
  computed: {
    eventsMap() {
      const map = {};
      this.events.forEach((e) => {
        (map[e.date] = map[e.date] || []).push(e);
      });
      return map;
    },
  },
  methods: {
    onClick(data) {
      const cell = this.events.find(i => i.date === data.date);
      if (cell) {
        this.events = this.events.filter(i => i.date !== data.date);
      } else {
        this.events.push(data);
      }
    },
  },
};
</script>
s
