<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <NewTodo />
      </header>
      <section class="main">
        <ToggleAll />
        <TodoList />
      </section>
      <Footer />
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://klee.kamp.io">Nathan Kleekamp</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script>
import ToggleAll from '@/components/ToggleAll.vue';
import NewTodo from '@/components/NewTodo.vue';
import TodoList from '@/components/TodoList.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'app',
  components: {
    ToggleAll,
    NewTodo,
    TodoList,
    Footer,
  },
};
</script>
