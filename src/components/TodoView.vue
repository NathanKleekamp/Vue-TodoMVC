<template>
  <li v-bind:class="{ completed: todo.completed }">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>{{todo.text}}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rull the web">
  </li>
</template>

<script>
export default {
  name: 'todoView',
  props: [
    'todo',
  ]
}
</script>

