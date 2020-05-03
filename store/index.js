import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'

export const store = new Vuex.Store({
  modules: {
    user,
    role
  }
})
