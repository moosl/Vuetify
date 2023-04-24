import Vue from 'vue'
import Vuex from 'vuex'

import articles from './modules/articles.js'
import feedback from './modules/feedback.js'
import objectives from './modules/objectives.js'
import people from './modules/people.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    articles,
    feedback,
    objectives,
    people
  },

  state: {
    appName: 'Application',
    navDrawer: null,
    platformName: 'Platform',
    rightDrawer: false,
    rightDrawerButtonNextDisabled: false,
    rightDrawerComponentButton: null,
    rightDrawerComponentContent: null,
    rightDrawerTitle: null,
    rightDrawerWidth: 480,
    rightDrawerWizardStepCurrent: null,
    rightDrawerWizardSteps: null,
    title: 'Application'
  },

  mutations: {
    SET_APPLICATION_TITLE: (state, payload) => {
      state.title = payload
    },
    SET_NAV_DRAWER: (state, payload) => {
      state.navDrawer = payload
    },
    SET_RIGHT_DRAWER: (state, { open }) => {
      state.rightDrawer = open
      if (!open) {
        state.rightDrawerComponentContent = null
        state.rightDrawerTitle = null
      }
    },
    SET_RIGHT_DRAWER_BUTTON_NEXT_DISABLED: (state, { disabled }) => {
      state.rightDrawerButtonNextDisabled = disabled
    },
    SET_RIGHT_DRAWER_COMPONENT_BUTTON: (state, { component }) => {
      state.rightDrawerComponentButton = component
    },
    SET_RIGHT_DRAWER_COMPONENT_CONTENT: (state, { component }) => {
      state.rightDrawerComponentContent = component
    },
    SET_RIGHT_DRAWER_TITLE: (state, { title }) => {
      state.rightDrawerTitle = title
    },
    SET_RIGHT_DRAWER_WIDTH: (state, { width }) => {
      state.rightDrawerWidth = width
    },
    SET_RIGHT_DRAWER_WIZARD_STEP_CURRENT: (state, { step }) => {
      state.rightDrawerWizardStepCurrent = step
    },
    SET_RIGHT_DRAWER_WIZARD_STEP_NEXT: (state) => {
      state.rightDrawerWizardStepCurrent = state.rightDrawerWizardStepCurrent + 1
    },
    SET_RIGHT_DRAWER_WIZARD_STEP_PREVIOUS: (state) => {
      state.rightDrawerWizardStepCurrent =
        state.rightDrawerWizardStepCurrent > 1
          ? state.rightDrawerWizardStepCurrent - 1
          : state.rightDrawerWizardSteps
          ? 1
          : null
    },
    SET_RIGHT_DRAWER_WIZARD_STEPS: (state, { steps }) => {
      state.rightDrawerWizardSteps = steps
    },
    TOGGLE_NAV_DRAWER: (state) => {
      state.navDrawer = !state.navDrawer
    }
  },

  actions: {
    CHANGE_APPLICATION_TITLE({ commit }, title) {
      commit('SET_APPLICATION_TITLE', title)
    }
  },

  getters: {
    getAppName: (state) => state.appName,
    getPlatformName: (state) => state.platformName,
    getTitle: (state) => state.title
  }
})
