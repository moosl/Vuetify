import { articles } from '/data/generate.js'

export default {
  namespaced: true,
  state: {
    articles: articles(20),
    articleTypes: [
      {
        icon: '',
        id: 1,
        title: 'Social'
      },
      {
        icon: '',
        id: 2,
        title: 'Blog'
      },
      {
        icon: '',
        id: 4,
        title: 'Task'
      },
      {
        icon: '',
        id: 5,
        title: 'Survey'
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getArticles: (state) => state.articles
  }
}
