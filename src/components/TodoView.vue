<template>
  <li v-bind:class="{ completed: todo.completed }">
    <div class="view">
      <input class="toggle" type="checkbox" v-bind:checked="todo.completed" v-on:click="onClickCheckbox">
      <label v-on:dblclick="enableEditing">{{todo.text}}</label>
      <button class="destroy" v-on:click="onClickDestroy"></button>
    </div>
    <input class="edit" v-on:keyup="onKeyup" v-bind:value="todo.text" v-on:blur="disableEditing">
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'todoView',
  props: [
    'todo',
  ],

  data() {
    return {
      focused: false,
    };
  },

  methods: {
    onClickDestroy() {
      this.destroyTodo(this.todo.id);
    },

    onClickCheckbox() {
      this.setCompleted(this.todo.id);
    },

    onKeyup(e) {
      if (e.keyCode === 13) {
        const payload = {
          id: this.todo.id,
          value: e.target.value.trim(),
        };

        this.editTodo(payload);
        this.disableEditing(e);
      }
    },

    enableEditing(e) {
      this.$el.classList.add('editing');
      this.$el.querySelector('.edit').focus();
      e.target.value = this.todo.text;
    },

    disableEditing(e) {
      this.$el.classList.remove('editing');
      e.target.value = this.todo.text;
    },

    ...mapActions([
      'destroyTodo',
      'setCompleted',
      'editTodo',
    ]),
  },
}
</script>

