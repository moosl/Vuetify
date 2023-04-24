<template>
  <h1 class="headline">
    {{ pageTitle }}
    <small v-if="count" class="blue-grey--text">{{ count }}</small>
  </h1>
</template>

<script>
export default {
  name: 'CommonPageHeader',

  props: {
    count: {
      default: null,
      type: Number
    }
  },

  computed: {
    localRoutes() {
      return JSON.parse(JSON.stringify(this.$router.options.routes))
    },
    pageTitle() {
      let title = null
      if (this.localRoutes) {
        const foundRoute = this.localRoutes.find(
          (route) => route.name === this.$route.name
        )
        if (foundRoute && foundRoute.meta && foundRoute.meta.title) {
          title = foundRoute.meta.title
        }
      }
      return title
    }
  }
}
</script>
