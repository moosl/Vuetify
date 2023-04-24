<template>
  <div class="page-header__buttons">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CommonPageButtons'
}
</script>

<style lang="stylus" scoped>
.page-header__buttons {
  >>> .v-btn:last-of-type {
    margin-right: 0;
  }
}
</style>
