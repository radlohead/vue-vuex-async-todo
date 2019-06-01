import axios from 'axios'

const state = {
  todos: [
    {
      id: 1,
      title: 'Todo One'
    },
    {
      id: 2,
      title: 'Todo Two'
    }
  ]
}

const getters = {
  allTodos: state => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      )
      commit('setTodos', response.data)
    } catch (err) {
      throw Error(err)
    }
  },
  async addTodo({ commit }, title) {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        { title, completed: false }
      )

      commit('newTodo', response.data)
    } catch (err) {
      throw Error(err)
    }
  },
  async deleteTodo({ commit }, id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      commit('removeTodo', id)
    } catch (err) {
      throw Error(err)
    }
  },
  async filterTodos({ commit }, count) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${count}`
    )

    commit('setTodos', response.data)
  },
  async updateTodo({ commit }, updTodo) {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        updTodo
      )

      commit('updateTodo', response.data)
    } catch (err) {
      throw Error(err)
    }
  }
}

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id)
    if (index !== -1) state.todos.splice(index, 1, updTodo)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
