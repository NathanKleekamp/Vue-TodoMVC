<template>
  <ul class="todo-list">
    <TodoView v-for="todo in getTodos" :key="todo.id" :todo="todo"></TodoView>
  </ul>
</template>
<script>

import TodoView from '@/components/TodoView.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'todoList',
  components: {
    TodoView,
  },

  computed: {
    ...mapGetters([
      'getTodos'
    ]),
  },
}
</script>
