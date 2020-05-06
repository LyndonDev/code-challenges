import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters: {
      id: '',
      clientName: [],
      originAddress: '',
      destinationAddress: '',
      mode: [],
      estDeparture: '',
      estArrival: '',
      status: []
    },
    sort: {
      by: 'originAddress',
      asc: true
    }
  },
  mutations: {
    updateSort (state, sort) {
      // Accepts a direct replacement for state.sort
      state.sort = sort
    },
    updateFilter (state, filter) {
      // Accepts an object with nodes 'key' and 'value' to update nodes in state.filters
      state.filters[filter.key] = filter.value
    }
  },
  actions: {
  },
  modules: {
  }
})
