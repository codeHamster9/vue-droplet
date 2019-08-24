<template>
  <v-layout row
            justify-center>
    <v-dialog :value="show"
              persistent
              max-width="600px">

      <v-card>
        <v-card-title class="grey lighten-3">
          <span class="headline">Add New Kid</span>
        </v-card-title>
        <v-card-text class="pa-3">
          <v-form ref="form"
                  v-model="valid"
                  lazy-validation
                  class="pa-4">

            <v-text-field v-model="name"
                          name="user"
                          label="Name">
            </v-text-field>
            <v-text-field v-model="age"
                          name="age"
                          label="Age">
            </v-text-field>
            <v-select v-model="gender"
                      :items="genders"
                      box
                      label="Gender">
            </v-select>

            <v-textarea v-if="errorText"
                        outline
                        label="errors"
                        auto-grow
                        box
                        color="error"
                        background-color="error"
                        rows="1"
                        :value="errorText">
            </v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"
                 flat
                 @click="close">Close</v-btn>
          <v-btn color="blue darken-1"
                 flat
                 @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    errorText: String,
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: true,
      valid: true,
      name: null,
      age: null,
      gender: null,
      genders: ['Male', 'Female'],
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.name,
        age: this.age,
        gender: this.gender,
      });
      this.clear();
    },
    close() {
      this.clear();
      this.$emit('close');
    },
    clear() {
      this.$refs.form.reset();
      this.name = null;
      this.age = null;
      this.gender = null;
    },
  },
};
</script>

