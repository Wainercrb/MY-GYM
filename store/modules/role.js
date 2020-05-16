import api from '../../api/role'
import { sortByType } from '../../assets/utils/sorting'

const state = () => ({
  all: []
})

const getters = {}

const actions = {
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
      commit('pushNew', formatData)
    })
  },
  update({ commit }, role) {
    const today = new Date()
    const fullRole = {
      ...role,
      updatedAt: today
    }
    api.update(fullRole, this.$axios, () => {
      const format = formatSimpleData(fullRole)
      commit('removeOne', format)
      commit('pushNew', format)
    })
  },
  delete({ commit, state }, role) {
    const fullRole = {
      ...role,
      status: 'disable'
    }
    api.update(fullRole, this.$axios, () => {
      commit('removeOne', fullRole)
      commit('pushNew', fullRole)
    })
  },
  sorting({ commit, state }, thead) {
    const sort = sortByType()[thead.type]
    const all = Object.assign([], state.all)
    if (typeof sort === 'function') {
      const roles = sort(thead, all)
      commit('sortData', roles)
    }
  }
}

const mutations = {
  setRoles(state, roles) {
    state.all = roles
  },
  pushNew(state, role) {
    state.all.push(role)
  },
  sortData(state, roles) {
    state.all = roles
  },
  removeOne(state, role) {
    const index = state.all.findIndex((item) => {
      return item._id.includes(role._id)
    })
    if (index > -1) {
      state.all.splice(index, 1)
    }
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
