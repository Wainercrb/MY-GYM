import api from '../../api/role'

const state = () => ({
  all: [],
  thead: [],
  current: {}
})

const getters = {}

const actions = {
  initTable({ commit }) {
    const thead = [
      'Role',
      'Detalles',
      'Estado',
      'Creado',
      'Actulizado',
      'Acciones'
    ]
    commit('setTableThead', thead)
  },
  getAll({ commit }) {
    api.getAll(this.$axios, (roles) => {
      const formatRoles = formatData(roles)
      commit('setRoles', formatRoles)
    })
  },
  save({ commit, state }, newRole) {
    const today = new Date()
    const role = {
      ...newRole.data,
      status: 'enable',
      createdAt: today,
      updatedAt: today
    }
    api.save(role, this.$axios, (rsRole) => {
      const formatData = formatSimpleData(rsRole)
      commit('setCurrent', formatData)
      commit('pushNew', formatData)
    })
  },
  update({ commit }, updateObj) {
    const today = new Date()
    const id = updateObj.id
    const role = {
      _id: id,
      ...updateObj.data,
      status: updateObj.oldData.status,
      updatedAt: today,
      createdAt: updateObj.oldData.createdAt
    }
    api.update(role, id, this.$axios, () => {
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
  },
  setTableThead(state, thead) {
    state.thead = thead
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
