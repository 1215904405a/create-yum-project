import { Module } from 'vuex'
import { SET_VALUE } from './actionType'

export interface IHomeState {
  value: string
}

const HomeStore: Module<IHomeState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    value: ''
  },
  mutations: {
    [SET_VALUE](state, payload: string) {
      state.value = payload
    }
  },
  actions: {
    [SET_VALUE]({ commit }, payload: string) {
      commit(SET_VALUE, payload)
    }
  }
}

export default HomeStore
