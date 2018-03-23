<template>
  <div class="toggle-all-wrapper">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all" v-on:click="onClickToggleAll">Mark all as complete</label>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'toggleAll',

  data() {
    return {
      isAllComplete: false,
    };
  },

  methods: {
    onClickToggleAll() {
      if (this.isAllComplete) {
        this.toggleAllIncomplete();
        this.isAllComplete = false;
      } else {
        this.toggleAllComplete();
        this.isAllComplete = true;
      }
    },

    ...mapActions([
      'toggleAllComplete',
      'toggleAllIncomplete',
    ]),
  }
};
</script>

