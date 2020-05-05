import api from '../../api/role'
import { sortByType } from '../../assets/utils/sorting'

const state = () => ({
  all: [],
  current: {},
  formReady: true,
  tableReady: false,
  pagination: {}
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
      const format = formatSimpleData(fullRole)
      commit('removeOne', format)
      commit('pushNew', format)
    })
  },
  delete({ commit, state }) {
    const role = {
      ...state.current,
      status: 'disable'
    }
    api.update(role, this.$axios, () => {
      commit('removeOne', role)
      commit('pushNew', role)
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
  setFormState(state, ready) {
    state.formReady = ready
  },
  setTableState(state, ready) {
    state.tableReady = ready
  },
  pushNew(state, role) {
    state.all.push(role)
  },
  setRoles(state, roles) {
    state.all = roles
  },
  setCurrent(state, role) {
    state.current = role
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
