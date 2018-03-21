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
//    selected: false,
//  }

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        text: 'Do something',
        completed: false,
        selected: true,
      },
      {
        id: 2,
        text: 'Do something else',
        completed: true,
        selected: false,
      }
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
    }
  },

  actions: {
    filterByAll(context) {
      context.commit('filterBy', CONSTANTS.FILTER_BY_ALL);
    },

    filterByCompleted(context) {
      context.commit('filterBy', CONSTANTS.FILTER_BY_COMPLETED);
    },

    filterByActive(context) {
      context.commit('filterBy', CONSTANTS.FILTER_BY_ACTIVE);
    },

    clearCompleted(context) {
      context.commit('clearCompleted');
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
      const todos = state.todos.filter(todo => !todo.completed);
      return todos.length;
    },
  },
})
