import api from '../../api/identificationCardType'

const state = () => ({
  current: {},
  all: [],
  thead: []
})

const getters = {}

const actions = {
  initTable({ commit }) {
    const thead = ['Tipo', 'Creado', 'Actulizado', 'Acciones']
    commit('setTableThead', thead)
  },
  getAll({ commit }) {
    api.getAll(this.$axios, (identficationCardTypes) => {
      const formatTypes = formatData(identficationCardTypes)
      commit('setAll', formatTypes)
    })
  },
  save({ commit }, identficationCardType) {
    const today = new Date()
    const overwriteData = {
      ...identficationCardType.data,
      createdAt: today,
      updatedAt: today
    }
    api.save(overwriteData, this.$axios, (currentIdentificationCardType) => {
      const formatData = formatSimpleData(currentIdentificationCardType)
      commit('setCurrent', formatData)
      commit('pushNew', formatData)
    })
  }
}

const mutations = {
  pushNew(state, identificationCardType) {
    state.all.push(identificationCardType)
  },
  setAll(state, identificationCardTypes) {
    state.all = identificationCardTypes
  },
  setCurrent(state, identificationCardType) {
    state.current = identificationCardType
  },
  setTableThead(state, thead) {
    state.thead = thead
  }
}

function formatSimpleData(identificationCardType) {
  return {
    _id: identificationCardType._id,
    type: identificationCardType.type,
    createdAt: new Date(identificationCardType.createdAt).toLocaleString(),
    updatedAt: new Date(identificationCardType.updatedAt).toLocaleString()
  }
}

function formatData(identificationCardTypes) {
  return identificationCardTypes.map(formatSimpleData)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
