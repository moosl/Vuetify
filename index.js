// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import Vuetify from 'vuetify'

import App from './App'
import router from './router/'
import store from './store/'

import CommonPageButtons from './components/common/PageButtons.vue'
import CommonPageHeader from './components/common/PageHeader.vue'
import CommonPageWrapper from './components/common/PageWrapper.vue'

Vue.component('common-page-buttons', CommonPageButtons)
Vue.component('common-page-header', CommonPageHeader)
Vue.component('common-page-wrapper', CommonPageWrapper)

Vue.use(VTooltip, {
  defaultHtml: false
})
Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  theme: {
    primary: '#004D40',
    secondary: '#00796B',
    accent: '#009688'
  }
})
Vue.use(Vuex)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})

app.$router.beforeEach((to, from, next) => {
  if (app.$store.state.rightDrawer && from.path !== to.path) {
    app.$store.commit('SET_RIGHT_DRAWER', { open: false })
  }
  next()
})
