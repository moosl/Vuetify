<template>
  <div class="page-wrapper" :class="{ 'has-footer': hasFooter }">
    <div class="page-wrapper__header">
      <slot name="header" />
    </div>
    <div class="page-wrapper__content">
      <slot />
    </div>
    <div v-if="hasFooter" class="page-wrapper__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageWrapper',

  computed: {
    hasFooter() {
      return !!this.$slots.footer
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-wrapper {
  display: grid;
  grid-gap: 8px;
  grid-template-rows: 48px 1fr;
  min-height: 100%;
  padding: 16px;
  width: 100%;

  &__header {
    align-self: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
}
</style>
