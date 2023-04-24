<template>
  <div class="elevation-8 poc-message">
    <div class="split-view">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonPocMessage'
}
</script>

<style lang="stylus" scoped>
.poc-message {
  background-color: var(--scp-bg-colour--poc);
  border: 1px solid var(--scp-border-colour--poc);
  border-radius: var(--scp-base-unit--half);
  bottom: var(--scp-base-unit--2);
  left: 0;
  padding: var(--scp-base-unit--2);
  right: 0;
  position: sticky;
  z-index: 2;

  .split-view {
    align-items: center;
    display: flex;
    gap: var(--scp-base-unit--2);
    justify-content: space-between;

    h4 {
      color: var(--scp-text-colour--poc);
      font-weight: 500;
    }
  }
}
</style>
