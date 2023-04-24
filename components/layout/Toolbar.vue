<template>
  <v-toolbar app fixed flat>
    <v-toolbar-side-icon @click.stop="ToggleNavDrawer()" />
    <v-toolbar-title v-if="!navDrawer">{{ appName }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  computed: {
    appName() {
      return this.$store.getters.getAppName
    },
    navDrawer() {
      return this.$store.state.navDrawer
    }
  },
  methods: {
    ToggleNavDrawer() {
      this.$store.commit('TOGGLE_NAV_DRAWER')
    }
  }
}
</script>

<style lang="stylus" scoped>
.elevation-0.v-toolbar.v-toolbar--fixed {
  border-bottom: 1px solid var(--scp-border-colour);
  z-index: var(--scp-z-index--toolbar);
}

.v-toolbar {
  &__title {
    padding: var(--scp-base-unit--half) 0;
  }
}
</style>
