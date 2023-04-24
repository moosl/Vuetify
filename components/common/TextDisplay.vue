<template>
  <div class="text-display">
    <div v-if="label" class="text-display__label">{{ label }}</div>
    <div v-if="value" class="text-display__text">
      <template v-if="prefix">{{ prefix }}</template>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextDisplay',

  props: {
    label: {
      default: null,
      type: String
    },
    prefix: {
      default: null,
      type: [Number, String]
    },
    value: {
      default: null,
      type: [Number, String]
    }
  }
}
</script>

<style lang="stylus" scoped>
.text-display {
  display: flex;
  flex-direction: column;
  grid-gap: var(--scp-base-unit--half);

  &__label {
    color: var(--scp-text-colour--subtler);
    font-size: 90%;
    font-weight: 600;
  }

  &__value {
    display: flex;
    grid-gap: var(--scp-base-unit--2);
  }
}
</style>
