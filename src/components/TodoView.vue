<template>
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>{{text}}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rull the web">
  </li>
</template>

<script>
export default {
  name: 'todoView',
  props: [
    'text',
  ]
}
</script>

