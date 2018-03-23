<template>
  <li v-bind:class="{ completed: todo.completed }">
    <div class="view">
      <input class="toggle" type="checkbox" v-bind:checked="todo.completed" v-on:click="onClickCheckbox">
      <label v-on:dblclick="toggleEdit">{{todo.text}}</label>
      <button class="destroy" v-on:click="onClickDestroy"></button>
    </div>
    <input class="edit" v-bind:value="todo.text" v-on:blur="toggleEdit">
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

    toggleEdit() {
      const isEditing = this.$el.classList.contains('editing');
      this.$el.classList.toggle('editing', !isEditing);
      this.$el.querySelector('.edit').focus();
    },

    ...mapActions([
      'destroyTodo',
      'setCompleted',
    ]),
  },
}
</script>

