<template>
  <v-layout
    justify-center
    align-center
  >
    <v-dialog
      v-model="show"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Settings
        </v-card-title>
        <v-card-text>
          <v-checkbox
            v-model="settings.dark"
            label="Dark Mode"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            flat
            @click.native="dismiss"
          >
            cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click.native="apply"
          >
            apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settings: {
        dark: true,
      },
    };
  },
  methods: {
    dismiss() {
      this.$emit('close');
    },
    apply() {
      this.$emit('apply', this.settings);
    },
  },
};
</script>
