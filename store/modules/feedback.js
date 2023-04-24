import { feedback } from '/data/generate.js'

export default {
  namespaced: true,
  state: {
    feedback: feedback()
  },
  mutations: {},
  actions: {},
  getters: {
    getFeedback: (state) => state.feedback
  }
}
