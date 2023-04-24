<template>
  <time v-if="date" :datetime="date">
    {{ relativeDate }}
  </time>
</template>

<script>
import { dateRelative } from '/helpers/dates.js'

export default {
  name: 'CommonDateRelative',

  props: {
    date: {
      required: true,
      type: Date
    }
  },

  computed: {
    relativeDate() {
      return this.date ? dateRelative(this.date) : null
    }
  }
}
</script>
