import { State } from './state'
import { INCREMENT } from './types'
export default {
  [INCREMENT](state: State, n: number) {
    state.count += n
  }
}
