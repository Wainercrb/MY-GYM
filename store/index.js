import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import identificationCardType from './modules/identificationCardType'

export const store = new Vuex.Store({
  modules: {
    user,
    role,
    identificationCardType
  }
})
