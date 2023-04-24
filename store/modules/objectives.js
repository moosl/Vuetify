import { objectives } from '/data/generate.js'

export default {
  namespaced: true,
  state: {
    objectives: objectives()
  },
  mutations: {},
  actions: {},
  getters: {
    getObjectives: (state) => state.objectives
  }
}
