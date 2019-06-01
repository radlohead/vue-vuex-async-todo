<template>
  <section class="todos__wrapper">
    <FilterTodos/>
    <AddTodo/>
    <ul class="todos">
      <li class="todo" v-for="todo in allTodos" :key="todo.id">
        {{ todo.title }}
        <i class="fas fa-trash-alt" @click="onDeleteTodo(todo.id)"></i>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddTodo from "./AddTodo.vue";
import FilterTodos from "./FilterTodos.vue";

export default {
  name: "Todos",
  components: {
    AddTodo,
    FilterTodos
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo"]),
    onDeleteTodo(id) {
      this.deleteTodo(id);
    }
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
