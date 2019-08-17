<template>
  <v-form ref="form"
          v-model="valid"
          lazy-validation>
    <v-card></v-card>
    <v-text-field v-model="email"
                  name="user"
                  label="UserName"
                  prepend-icon="person"
                  id="user_name"></v-text-field>
    <v-text-field v-model="password"
                  prepend-icon="lock"
                  name="name"
                  label="Enter your password"
                  hint="At least 4 characters"
                  min="4"
                  :append-icon="value ? 'visibility' : 'visibility_off'"
                  @click:append="() => (value = !value)"
                  value="Password"
                  :type="value ? 'password' : 'text'"></v-text-field>
    <v-btn :disabled="!valid"
           @click="submit">Login</v-btn>
    <v-btn @click="clear">clear</v-btn>
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
</template>

<script>
export default {
  props: {
    errorText: String,
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

