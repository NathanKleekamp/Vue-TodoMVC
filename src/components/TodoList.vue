<template>
  <ul class="todo-list">
    <TodoView v-for="todo in todos" :key="todo.id" :text="todo.text"></TodoView>
  </ul>
</template>

<script>
import TodoView from '@/components/TodoView.vue';

export default {
  name: 'todoList',
  components: {
    TodoView,
  },

  data() {
    return {
      todos: [
        { id: 1, text: 'Do something'},
        { id: 2, text: 'Do something else' },
      ],
    };
  },
}
</script>
