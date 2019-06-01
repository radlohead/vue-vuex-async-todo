<template>
  <section class="todos__wrapper">
    <ul class="todos">
      <li class="todo" v-for="todo in allTodos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(["fetchTodos"])
  },
  computed: {
    ...mapGetters(["allTodos"])
  }
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
</style>
