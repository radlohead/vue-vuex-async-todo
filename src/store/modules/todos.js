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
  }
}

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo)
}

export default {
  state,
  getters,
  actions,
  mutations
}
