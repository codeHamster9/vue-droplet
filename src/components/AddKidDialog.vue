<template>
  <v-dialog
    :value="show"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title class="grey lighten-3">
        <span class="headline">Add New Kid</span>
      </v-card-title>
      <v-card-text class="pa-3">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="pa-4"
        >
          <v-text-field
            v-model="name"
            name="user"
            label="Name"
          />
          <v-text-field
            v-model="age"
            name="age"
            label="Age"
          />
          <v-select
            v-model="gender"
            :items="genders"
            box
            label="Gender"
          />

          <v-textarea
            v-if="errorText"
            outline
            label="errors"
            auto-grow
            box
            color="error"
            background-color="error"
            rows="1"
            :value="errorText"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          flat
          @click="close"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="submit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    errorText: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    kid: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      value: true,
      valid: true,
      name: null,
      age: null,
      gender: null,
      genders: ['male', 'female'],
    };
  },
  watch: {
    show() {
      if (this.kid) {
        this.name = this.kid.name;
        this.age = this.kid.age;
        this.gender = this.kid.gender;
      }
    },
  },
  methods: {
    submit() {
      const eventName = this.kid.id ? 'edit' : 'create';
      this.$emit(eventName, {
        name: this.name,
        age: this.age,
        gender: this.gender,
        id: this.kid.id,
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

