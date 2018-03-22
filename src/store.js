import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CONSTANTS = {
  FILTER_BY_ALL: 'all',
  FILTER_BY_ACTIVE: 'active',
  FILTER_BY_COMPLETED: 'completed',
};

function getAll(state) {
  return state.todos;
}

function getActive(state) {
  return state.todos.filter(todo => !todo.completed);
}

function getCompleted(state) {
  return state.todos.filter(todo => todo.completed);
}

// Todo object format
//  todo: {
//    text: '',
//    completed: false,
//  }

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        text: 'Do something',
        completed: false,
      },
      {
        id: 2,
        text: 'Do something else',
        completed: true,
      },
      {
        id: 3,
        text: 'Do a third thing',
        completed: true,
      },
    ],
    filterBy: 'active',
  },

  mutations: {
    filterBy(state, payload) {
      switch(payload) {
        case CONSTANTS.FILTER_BY_ALL:
          state.filterBy = CONSTANTS.FILTER_BY_ALL;
          break;

        case CONSTANTS.FILTER_BY_COMPLETED:
          state.filterBy = CONSTANTS.FILTER_BY_COMPLETED;
          break;

        case CONSTANTS.FILTER_BY_ACTIVE:
          state.filterBy = CONSTANTS.FILTER_BY_ACTIVE;
          break;

        default:
          break;
      }
    },

    clearCompleted(state) {
      state.todos = getActive(state);
    },

    destroyTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },

    setCompleted(state, id) {
      let index;

      const found = state.todos.find((todo, idx) => {
        index = idx;
        return todo.id === id
      });

      const completed = Object.assign({}, found, { completed: !found.completed });

      // Insert the updated completed todo in the same location it was before
      const todos = [].concat(state.todos.slice(0, index), completed, state.todos.slice(index + 1, state.todos.length));
      state.todos = todos;
    },
  },

  actions: {
    filterByAll({ commit }) {
      commit('filterBy', CONSTANTS.FILTER_BY_ALL);
    },

    filterByCompleted({ commit }) {
      commit('filterBy', CONSTANTS.FILTER_BY_COMPLETED);
    },

    filterByActive({ commit }) {
      commit('filterBy', CONSTANTS.FILTER_BY_ACTIVE);
    },

    clearCompleted({ commit }) {
      commit('clearCompleted');
    },

    destroyTodo({ commit }, id) {
      commit('destroyTodo', id);
    },

    setCompleted({ commit }, id) {
      commit('setCompleted', id);
    },
  },

  getters: {
    getTodos(state) {
      switch (state.filterBy) {
        case CONSTANTS.FILTER_BY_ALL:
          return getAll(state);
          break;

        case CONSTANTS.FILTER_BY_ACTIVE:
          return getActive(state);
          break;

        case CONSTANTS.FILTER_BY_COMPLETED:
          return getCompleted(state);
          break;

        default:
          return [];
          break;
      }
    },

    getActiveTodosLength(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },

    getAllTodosLength(state) {
      return state.todos.length;
    },
  },
})
