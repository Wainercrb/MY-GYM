import api from '../../api/role'

const state = () => ({
  all: [],
  thead: [],
  current: {}
})

const getters = {}

const actions = {
  initTable({ commit }) {
    const thead = ['Role', 'Creado', 'Actulizado', 'Acciones']
    commit('setTableThead', thead)
  },
  getAll({ commit }) {
    api.getAll(this.$axios, (roles) => {
      const formatRoles = formatData(roles)
      commit('setRoles', formatRoles)
    })
  },
  save({ commit }, newRole) {
    const today = new Date()
    const role = {
      ...newRole.data,
      createdAt: today,
      updatedAt: today
    }
    api.save(role, this.$axios, (rsRole) => {
      const formatData = formatSimpleData(rsRole)
      commit('setCurrent', formatData)
      commit('pushNew', formatData)
    })
  }
}

const mutations = {
  pushNew(state, role) {
    state.all.push(role)
  },
  setRoles(state, roles) {
    state.all = roles
  },
  setCurrent(state, role) {
    state.current = role
  },
  setTableThead(state, thead) {
    state.thead = thead
  }
}

function formatSimpleData(user) {
  return {
    _id: user._id,
    roleName: user.roleName,
    createdAt: new Date(user.createdAt).toLocaleString(),
    updatedAt: new Date(user.updatedAt).toLocaleString()
  }
}

function formatData(users) {
  return users.map(formatSimpleData)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
