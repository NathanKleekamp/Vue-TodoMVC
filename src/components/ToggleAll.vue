<template>
  <div class="toggle-all-wrapper">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all" v-on:click="onClickToggleAll">Mark all as complete</label>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'toggleAll',

  computed: {
    ...mapGetters([
      'getIsAllComplete',
    ]),
  },

  methods: {
    onClickToggleAll() {
      if (!this.getIsAllComplete) {
        return this.toggleAllComplete();
      }

      this.toggleAllIncomplete();
    },

    ...mapActions([
      'toggleAllComplete',
      'toggleAllIncomplete',
    ]),
  }
};
</script>

