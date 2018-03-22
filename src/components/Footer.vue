<template>
  <footer class="footer" v-if="getAllTodosLength">
    <span class="todo-count"><strong>{{getActiveTodosLength}}</strong> item left</span>
    <ul class="filters">
      <li><a class="all trigger" v-on:click="onClickAll">All</a></li>
      <li><a class="active selected trigger" v-on:click="onClickActive">Active</a></li>
      <li><a class="completed trigger" v-on:click="onClickCompleted">Completed</a></li>
    </ul>
    <button class="clear-completed" v-on:click="onClickClearCompleted">Clear completed</button>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

function toggleSelected(target) {
  if (!target.classList.contains('selected')) {
    const selected = this.$el.querySelector('.selected');
    selected.classList.remove('selected');
    target.classList.add('selected');
  }
}

export default {
  name: 'todoFooter',
  data() {
    return {
      todos: [],
    };
  },

  computed: {
    ...mapGetters([
      'getActiveTodosLength',
      'getAllTodosLength',
    ]),
  },

  methods: {
    onClickAll(e) {
      toggleSelected.call(this, e.target);
      this.filterByAll();
    },

    onClickActive(e) {
      toggleSelected.call(this, e.target);
      this.filterByActive();
    },

    onClickCompleted(e) {
      toggleSelected.call(this, e.target);
      this.filterByCompleted();
    },

    onClickClearCompleted() {
      this.clearCompleted();
    },

    ...mapActions([
      'filterByAll',
      'filterByActive',
      'filterByCompleted',
      'clearCompleted',
    ]),
  }
};
</script>

<style scoped>
.trigger {
  cursor: pointer;
}
</style>
