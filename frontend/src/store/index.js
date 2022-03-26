import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    managers: [],

  },
  mutations: {
    getManagers(state, manager){
      state.managers = manager
    },

  },
  actions: {
    getManagersAction({commit}){
      axios('http://127.0.0.1:8000/api/manager/').then(res => {
        commit('getManagers', res.data.data)
      }).catch(error => {
        console.log(error);
        this.errored = true;
      }).finally(() => (this.loading = false));

    }

  },
  modules: {
  }
})