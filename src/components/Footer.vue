<template>
  <footer class="footer">
    <span class="todo-count"><strong>0</strong> item left</span>
    <ul class="filters">
      <li><a class="selected trigger">All</a></li>
      <li><a class="active trigger">Active</a></li>
      <li><a class="completed trigger">Completed</a></li>
    </ul>
    <button class="clear-completed">Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'footer',
};
</script>

<style scoped>
.trigger {
  cursor: pointer;
}
</style>
