import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import About from '../pages/About.vue'
import Settings from '../pages/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      component: Dashboard,
      meta: {
        icon: 'dashboard',
        main: true,
        title: 'Dashboard'
      },
      name: 'page-dashboard',
      path: '/'
    },
    {
      component: About,
      meta: {
        icon: 'info',
        main: true,
        title: 'About'
      },
      name: 'page-about',
      path: '/about'
    },
    {
      component: Settings,
      meta: {
        icon: 'settings',
        main: false,
        title: 'Settings'
      },
      name: 'page-settings',
      path: '/settings'
    }
  ]
})
