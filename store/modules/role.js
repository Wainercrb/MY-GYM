import api from '../../api/role'

const state = () => ({
  all: [],
  current: {}
})

const getters = {}

const actions = {
  setCurrent({ commit }, role) {
    commit('setCurrent', role)
  },
  getAll({ commit }) {
    api.getAll(this.$axios, (roles) => {
      const formatRoles = formatData(roles)
      commit('setRoles', formatRoles)
    })
  },
  save({ commit }, role) {
    const today = new Date()
    const fullRole = {
      ...role,
      status: 'enable',
      createdAt: today,
      updatedAt: today
    }
    api.save(fullRole, this.$axios, (rsRole) => {
      const formatData = formatSimpleData(rsRole)
      commit('setCurrent', formatData)
      commit('pushNew', formatData)
    })
  },
  update({ commit, state }, role) {
    const today = new Date()
    const fullRole = {
      ...role,
      _id: state.current._id,
      updatedAt: today,
      createdAt: state.current.createdAt
    }
    api.update(fullRole, this.$axios, () => {
      commit('removeOne', fullRole)
      commit('setCurrent', fullRole)
      commit('pushNew', fullRole)
    })
  },
  delete({ commit, state }) {
    const role = state.current
    role.status = 'disable'
    api.update(role, this.$axios, () => {
      commit('removeOne', role)
      commit('setCurrent', role)
      commit('pushNew', role)
    })
  }
}

const mutations = {
  pushNew(state, role) {
    state.all.push(role)
  },
  removeOne(state, role) {
    const index = state.all.findIndex((item) => {
      return item._id.includes(role._id)
    })
    if (index > -1) {
      state.all.splice(index, 1)
    }
  },
  setRoles(state, roles) {
    state.all = roles
  },
  setCurrent(state, role) {
    state.current = role
  }
}

function formatSimpleData(user) {
  return {
    _id: user._id,
    roleName: user.roleName,
    details: user.details,
    status: user.status,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt)
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
