import { createStore } from 'vuex'
import home from './home'
import login from './login'

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    login
  }
})

export default store
