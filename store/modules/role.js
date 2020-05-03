import role from '../../api/role'

const state = () => ({
  roles: [],
  thead: [],
  currentRole: {}
})

const getters = {}

const actions = {
  initTable({ commit }) {
    const thead = ['Role', 'Creado', 'Actulizado', 'Acciones']
    commit('setTableThead', thead)
  },
  getAllRoles({ commit }) {
    role.getRoles(this.$axios, (roles) => {
      const formatRoles = formatData(roles)
      commit('setRoles', formatRoles)
    })
  },
  saveRole({ commit }, newRole) {
    const today = new Date()
    const overwriteRole = {
      ...newRole.data,
      createdAt: today,
      updatedAt: today
    }
    role.saveRole(overwriteRole, this.$axios, (currentRole) => {
      const formatData = formatSimpleData(currentRole)
      commit('setCurrentRole', formatData)
      commit('pushNewRole', formatData)
    })
  }
}

const mutations = {
  pushNewRole(state, role) {
    state.roles.push(role)
  },
  setRoles(state, roles) {
    state.roles = roles
  },
  setCurrentRole(state, role) {
    state.currentRole = role
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
