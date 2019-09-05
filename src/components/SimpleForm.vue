<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card />
    <v-text-field
      id="user_name"
      v-model="email"
      name="user"
      label="UserName"
      prepend-icon="person"
    />
    <v-text-field
      v-model="password"
      prepend-icon="lock"
      name="name"
      label="Enter your password"
      hint="At least 4 characters"
      min="4"
      :append-icon="value ? 'visibility' : 'visibility_off'"
      value="Password"
      :type="value ? 'password' : 'text'"
      @click:append="() => (value = !value)"
    />
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Login
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
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
</template>

<script>
export default {
  props: {
    errorText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: true,
      valid: true,
      password: null,
      email: null,
    };
  },
  methods: {
    submit() {
      this.$emit('submit', { password: this.password, email: this.email });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

