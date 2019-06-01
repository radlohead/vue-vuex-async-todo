<template>
  <section class="todos">
    <ul v-for="todo in allTodos" :key="todo.id">
      <li>{{ todo.title }}</li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Todos",
  computed: {
    ...mapGetters(["allTodos"])
  }
};
</script>

<style>
</style>
