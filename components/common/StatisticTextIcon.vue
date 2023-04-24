<template>
  <div class="statistic statistic-text-icon">
    <div class="statistic__icon">
      <v-progress-circular v-show="loading" :color="color" :indeterminate="true" :size="48" :width="4" />
      <v-avatar v-if="!loading" :class="color">
        <v-icon :dark="iconDark">
          {{ icon }}
        </v-icon>
      </v-avatar>
    </div>
    <div class="statistic__content">
      <div class="font-weight-bold headline statistic__content--value">
        {{ formattedValue }}
        <small v-if="valueCompare > 0" class="font-weight-regular text--subtler">
          {{ $t('Of_Text') }} {{ valueCompare }}
        </small>
      </div>
      <div class="caption statistic__content--label text--subtle">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticTextIcon',

  props: {
    color: {
      default: 'grey lighten-1',
      type: String
    },
    icon: {
      default: 'visibility',
      type: String
    },
    iconDark: {
      default: true,
      type: Boolean
    },
    label: {
      default: 'Statistic label',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    },
    value: {
      default: 0,
      type: Number
    },
    valueCompare: {
      default: 0,
      type: Number
    }
  },

  computed: {
    formattedValue() {
      return this.value || 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.statistic {
  border-radius: 4px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 48px 1fr;
  padding: 16px;

  &__content {
    line-height: 1;
  }

  &.statistic-text-icon {
    background-color: rgba(229, 236, 239, 0.24);
    border-radius: 4px;
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: rgba(229, 236, 239, 0.56);
    }
  }
}
</style>
