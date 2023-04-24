<template>
  <div class="poc-note">
    <v-icon>info</v-icon>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonPocNote'
}
</script>

<style lang="stylus" scoped>
.poc-note {
  background-color: var(--scp-bg-colour--poc);
  border: 1px solid var(--scp-border-colour--poc);
  border-radius: var(--scp-base-unit--half);
  align-items: center;
  display: flex;
  gap: var(--scp-base-unit--2);
  padding: var(--scp-base-unit--2);

  .content {
    color: var(--scp-text-colour--poc);
    font-size: 90%;
    font-weight: 400;
    line-height: 1.25;
  }
}
</style>
