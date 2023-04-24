import { people } from '/data/generate.js'

export default {
  namespaced: true,
  state: {
    people: people(20),
    roles: [
      {
        id: 1,
        title: 'CEO'
      },
      {
        id: 2,
        title: 'Sales Director'
      },
      {
        id: 3,
        title: 'Head of Business Development'
      },
      {
        id: 4,
        title: 'Business Development Manager'
      },
      {
        id: 5,
        title: 'Business Development Executive'
      }
    ],
    team: people(10)
  },
  mutations: {},
  actions: {},
  getters: {
    getPeople: (state) => state.people,
    getRoles: (state) => state.roles,
    getTeam: (state) => state.team,
    getTeamRoles: (state) => {
      return state.team.map((item) => {
        return {
          role: item.role
        }
      })
    }
  }
}
