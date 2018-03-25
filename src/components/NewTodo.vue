<template>
  <input v-on:keyup="onKeyup" class="new-todo" placeholder="What needs to be done?" autofocus>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'newTodo',

  methods: {
    onKeyup(e) {
      if (e.keyCode === 13 && e.target.value !== '') {
        this.createTodo(e.target.value.trim());
        e.target.value = "";
      }
    },

    ...mapActions([
      'createTodo',
    ]),
  },
}
</script>
