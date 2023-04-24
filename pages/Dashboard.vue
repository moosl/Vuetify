<template>
  <common-page-wrapper>
    <template #header>
      <common-page-header />
      <common-page-buttons>
        <v-btn aria-label="More actions" icon>
          <v-icon color="secondary">more_vert</v-icon>
        </v-btn>
        <v-btn color="secondary" @click="ShowRightDrawer()">
          <v-icon left>add</v-icon>
          Add
        </v-btn>
      </common-page-buttons>
    </template>
    <template #default>
      <v-layout>
        <v-flex xs12>
          <p>Content goes here...</p>
        </v-flex>
      </v-layout>
    </template>
  </common-page-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'

const RightDrawerButton = () => import('/components/dashboard/SaveButton.vue')

export default {
  name: 'PageDashboard',

  data() {
    return {}
  },

  methods: {
    ...mapMutations([
      'SET_RIGHT_DRAWER',
      'SET_RIGHT_DRAWER_COMPONENT_BUTTON',
      'SET_RIGHT_DRAWER_TITLE',
      'SET_RIGHT_DRAWER_WIDTH'
    ]),

    ShowRightDrawer() {
      this.SET_RIGHT_DRAWER_COMPONENT_BUTTON({ component: RightDrawerButton })
      this.SET_RIGHT_DRAWER_TITLE({ title: 'Panel Title' })
      this.SET_RIGHT_DRAWER_WIDTH({ width: 640 })
      this.SET_RIGHT_DRAWER({ open: true })
    }
  }
}
</script>
