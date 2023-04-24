<template>
  <v-footer app fixed height="40" inset>
    <span class="ml-3"> {{ platformName }} &copy; {{ new Date().getFullYear() }} </span>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    platformName() {
      return this.$store.getters.getPlatformName
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-footer.v-footer--fixed {
  border-top: 1px solid var(--scp-border-colour);
  z-index: var(--scp-z-index--toolbar);
}
</style>
