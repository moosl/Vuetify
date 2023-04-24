<template>
  <v-avatar :size="avatarSize">
    <v-img
      v-if="!error && src"
      :alt="alt"
      :aria-label="alt"
      aspect-ratio="1"
      :height="avatarSize"
      :src="src"
      :width="avatarSize"
      @click="$emit('click')"
      @error="() => (error = true)"
    />
    <span
      v-else
      :aria-label="alt"
      class="avatar-initials font-s--90 text--subtle"
      :style="`background-color:${
        backgroundColour || avatarColour
      };color:${fontColour};font-size:${fontSized};height:${size};width:${size}`"
      @click="$emit('click')"
    >
      {{ initials }}
    </span>
  </v-avatar>
</template>

<script>
import { isDarkColour, stringToColour, stringToInitials } from '/helpers/strings.js'

export default {
  name: 'ScpAvatarImageInitials',

  props: {
    alt: {
      default: null,
      type: String
    },
    backgroundColour: {
      default: null,
      type: String
    },
    size: {
      default: '32px',
      type: [Number, String]
    },
    src: {
      default: null,
      type: String
    }
  },

  data() {
    return {
      error: null
    }
  },

  computed: {
    avatarColour() {
      return stringToColour(this.alt)
    },
    avatarSize() {
      return String(this.size).replace('px', '')
    },
    fontColour() {
      return isDarkColour(this.backgroundColour || this.avatarColour) ? 'white' : 'black'
    },
    fontSized() {
      let fontSize = '0.8em'
      const numberSize = parseInt(this.size, 10)
      if (numberSize > 16 && numberSize <= 32) {
        fontSize = '0.6em'
      } else if (numberSize > 32 && numberSize <= 48) {
        fontSize = this.initials.length > 2 ? '0.8em' : '1em'
      } else if (numberSize > 48 && numberSize <= 64) {
        fontSize = this.initials.length > 2 ? '1.1em' : '1.3em'
      } else if (numberSize > 64 && numberSize <= 80) {
        fontSize = this.initials.length > 2 ? '1.4em' : '1.8em'
      } else if (numberSize > 80 && numberSize <= 120) {
        fontSize = this.initials.length > 2 ? '1.6em' : '2.2em'
      }
      return fontSize
    },

    initials() {
      if (!this.alt) {
        return ''
      } else if (!this.src || !this.src.length || this.error) {
        return stringToInitials(this.alt)
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
$base-unit = 8px;
$base-unit--half = $base-unit * 0.5;
$base-unit-2 = $base-unit * 2;
$avatar-size = $base-unit * 5;
$border-width = ($base-unit / 4);
$color--secondary = rgb(123, 123, 123);
$color--white = rgb(255, 255, 255);

.v-image, span.avatar-initials {
  border: 2px solid $color--white;
}

.v-image.no-border {
  border: 0 solid $color--white !important;
}

span.avatar-initials {
  align-items: center;
  background-color: rgba($color--secondary, 0.08);
  border-radius: 50%;
  color: #111;
  cursor: default;
  display: flex;
  font-weight: 600 !important;
  height: 100%;
  justify-content: center;
  line-height: normal;
  width: 100%;
}
</style>
