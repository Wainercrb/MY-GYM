import user from '../../api/user'

const state = () => ({
  users: [],
  currentUser: {}
})

const getters = {}

const actions = {
  getAllProducts({ commit }) {
    user.getUsers((users) => {
      commit('setUsers', users)
    }, this.$axios)
  },
  addProductToCart({ state, commit }, product) {}
}

const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  decrementProductInventory(state, { id }) {
    const product = state.all.find((product) => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
