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
      const responseData = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      )
      if (!responseData.ok) throw Error(responseData.statusText)
      const response = await responseData.json()
      commit('setTodos', response)
    } catch (err) {
      throw Error(err)
    }
  },
  async addTodo({ commit }, title) {
    try {
      const responseData = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, completed: false })
        }
      )
      if (!responseData.ok) throw Error(responseData.statusText)
      const response = await responseData.json()

      commit('newTodo', response)
    } catch (err) {
      throw Error(err)
    }
  },
  async deleteTodo({ commit }, id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE'
        }
      )
      if (!response.ok) throw Error(response.statusText)
      commit('removeTodo', id)
    } catch (err) {
      throw Error(err)
    }
  },
  async filterTodos({ commit }, count) {
    const responseData = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=${count}`
    )
    if (!responseData.ok) throw Error(response.statusText)
    const response = await responseData.json()

    commit('setTodos', response)
  },
  async updateTodo({ commit }, updTodo) {
    try {
      const responseData = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        {
          method: 'PUT',
          headers: {
            'Contents-Type': 'application/json'
          },
          body: JSON.stringify(updTodo)
        }
      )
      if (!responseData.ok) throw Error(responseData.statusText)

      commit('updateTodo', updTodo)
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
