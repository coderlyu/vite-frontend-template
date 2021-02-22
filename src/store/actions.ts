import { State } from './state';
import { ActionContext } from 'vuex'
import { INCREMENT } from './types'
export default {
  increment({ commit }: ActionContext<State, State>, n: number) {
    commit(INCREMENT, n)
  }
}
