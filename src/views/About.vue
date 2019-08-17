<template>
  <v-container fluid
               fill-height>
    <v-layout column>
      <v-flex>
        <v-btn small
               color="blue"
               @click="add">Add</v-btn>
        <v-btn small
               color="red"
               @click="remove">remove</v-btn>
      </v-flex>
      <v-flex>
        <v-container fluid
                     fill-height
                     class="box-container pa-0 ma-0">
          <v-layout justify-start
                    align-end
                    row
                    reverse>
            <v-flex v-for="(box, index) in boxes"
                    :key="box.id  "
                    class="box"
                    fill-height
                    :class="{'minimized': box.minimized,'first': index == 0 }"
                    @click="minimize(box)">
              <div>Box:{{box.id}}</div>
              <!-- <iframe src="https://vuejs.org/v2/guide/list.html"/> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      boxes: [],
    };
  },
  methods: {
    add() {
      this.boxes.push({ id: this.boxes.length + 1, minimized: false });
    },
    remove() {
      this.boxes.pop();
    },
    minimize(box) {
      // eslint-disable-next-line
        box.minimized = !box.minimized;
    },
  },
};
</script>


<style scoped>
iframe {
  height: calc(100% - 20px);
  border: none;
  overflow-y: auto;
}

.box {
  height: 585px;
  min-width: 300px;
  padding-right: 20px;
  max-width: 300px;
  border-radius: 4px;
  box-shadow: -15px 0 20px rgba(0, 0, 0, 0.75), 5px 0 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.minimized {
  height: 50px !important;
  width: 150px !important;
}
.first {
  flex-shrink: 0;
  min-width: 420px;
}
</style>

<style>
#app {
  height: calc(100vh - 90px);
}
</style>
