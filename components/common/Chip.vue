<template>
  <span class="common-chip" :class="[{ label, small }, color]">
    <span :style="`color:${textColour}`">
      <slot />
    </span>
  </span>
</template>

<script>
import colors from 'vuetify/es5/util/colors'

export default {
  name: 'CommonChip',

  props: {
    color: {
      default: 'info',
      type: String
    },
    label: {
      default: false,
      type: Boolean
    },
    small: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      vuetifyColors: colors
    }
  },

  computed: {
    convertedColor() {
      if (this.color && this.color.includes('#')) {
        return this.color
      }

      let colour = null
      if (this.color) {
        colour = this.color.includes(' ') ? this.color.replace('-', '').split(' ') : [this.color]

        if (colour.length === 1) {
          colour = [...colour, 'base']
        }

        colour = this.vuetifyColors[colour[0]][colour[1]]
      }
      return colour
    },

    textColour() {
      let textColour = 'black'
      if (this.convertedColor) {
        const hex = this.convertedColor.replace('#', '')
        // stolen from https://24ways.org/2010/calculating-color-contrast
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        const yiq = (r * 299 + g * 587 + b * 114) / 1000
        // original value was 128
        if (yiq < 168) {
          textColour = 'white'
        }
      }
      return textColour
    }
  }
}
</script>

<style lang="stylus" scoped>
.common-chip {
  border-radius: 24px;
  font-size: 12px;
  padding: var(--scp-base-unit) calc(var(--scp-base-unit) * 1.5);

  &.label {
    border-radius: var(--scp-base-unit--half);
  }

  &.small {
    font-size: 12px;
    padding: calc(var(--scp-base-unit) * 0.5) var(--scp-base-unit);
  }

  & + & {
    margin-left: var(--scp-base-unit--half);
  }
}
</style>
