import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { state, State } from './state'
import mutations from './mutations'
import actions from './actions'
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  actions,
  mutations
})