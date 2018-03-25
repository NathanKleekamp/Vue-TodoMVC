import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CONSTANTS = {
  FILTER_BY_ALL: 'all',
  FILTER_BY_ACTIVE: 'active',
  FILTER_BY_COMPLETED: 'completed',
  COMPLETED: 'completed',
  TEXT: 'text',
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

function updateTodo({ state, id, prop, value}) {
  let index;
  let updated;

  const found = state.todos.find((todo, idx) => {
    index = idx;
    return todo.id === id
  });

  switch (prop) {
    case CONSTANTS.COMPLETED:
      updated = Object.assign({}, found, { completed: !found.completed });
      break;

    case CONSTANTS.TEXT:
      updated = Object.assign({}, found, { text: value });
      break;

    default:
      return state.todos;
  }

  // Insert the updated completed todo in the same location it was before
  return [].concat(state.todos.slice(0, index), updated, state.todos.slice(index + 1, state.todos.length));
}

// Todo object format
//  todo: {
//    text: '',
//    completed: false,
//  }

export default new Vuex.Store({
  state: {
    todos: [],
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

    destroyAllCompleted(state) {
      state.todos = getActive(state);
    },

    destroyTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },

    setCompleted(state, id) {
      const update = {
        prop: CONSTANTS.COMPLETED,
        state,
        id,
      };

      state.todos = updateTodo(update);
    },

    // @todo This could be combined with setAllIncomplete, probably
    setAllComplete(state) {
      state.todos = state.todos.map(todo => {
        todo.completed = true;
        return todo;
      });
    },

    setAllIncomplete(state) {
      state.todos = state.todos.map(todo => {
        todo.completed = false;
        return todo;
      });
    },

    createTodo(state, payload) {
      state.todos = state.todos.concat([{
        text: payload,
        completed: false,
        id: Date.now(),
      }]);
    },

    editTodo(state, {id, value}) {
      const update = {
        prop: CONSTANTS.TEXT,
        state,
        value,
        id,
      };

      state.todos = updateTodo(update);
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

    destroyAllCompleted({ commit }) {
      commit('destroyAllCompleted');
    },

    destroyTodo({ commit }, id) {
      commit('destroyTodo', id);
    },

    setCompleted({ commit }, id) {
      commit('setCompleted', id);
    },

    setAllComplete({ commit }) {
      commit('setAllComplete');
    },

    setAllIncomplete({ commit }) {
      commit('setAllIncomplete');
    },

    createTodo({ commit }, todo) {
      commit('createTodo', todo);
    },

    editTodo({ commit }, todo) {
      commit('editTodo', todo);
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

    getIsAllComplete(state) {
      return (state.todos.filter(todo => todo.completed === false).length === 0);
    },
  },
})
