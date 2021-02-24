import { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { state, State } from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  getters,
  actions,
  mutations
})

export function getStore() {
  return {
    store: useStore(key)
  }
}