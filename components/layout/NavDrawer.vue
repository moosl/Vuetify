<template>
  <v-navigation-drawer app class="primary" dark fixed v-model="navDrawer">
    <v-list>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon large>spa</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="subheading">
            {{ appName }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider />
    <v-list class="py-0">
      <v-list-tile v-for="route in routesMain" :key="route.name" active-class="active" avatar :to="route.path">
        <v-list-tile-avatar>
          <v-icon>{{ route.meta.icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ route.meta.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-spacer />
    <v-list class="py-0">
      <v-list-tile active-class="active" avatar :to="{ name: 'page-settings' }">
        <v-list-tile-avatar>
          <v-icon>settings</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title> Settings </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppNavDrawer',

  computed: {
    appName() {
      return this.$store.getters.getAppName
    },

    navDrawer: {
      get() {
        return this.$store.state.navDrawer
      },
      set(val) {
        this.$store.commit('SET_NAV_DRAWER', val)
      }
    },

    routesMain() {
      return this.$router.options.routes.filter((route) => route.meta.main)
    }
  }
}
</script>

<style lang="stylus" scoped>
active() {
  background-color: rgba(0, 0, 0, 0.08);
}

.v-navigation-drawer {
  display: flex;
  flex-direction: column;
  z-index: var(--scp-z-index--drawer);
}

.v-list {
  >>> .active {
    active();

    &:hover {
      active();
    }
  }
}
</style>
