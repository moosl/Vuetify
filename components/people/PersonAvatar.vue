<template>
  <v-avatar :color="person.initials.colour" :size="sizeAvatar">
    <v-img v-if="imageSrc" :alt="person.fullName" :src="imageSrc" @error="error = true" />
    <span
      v-else
      class="initials-value"
      :class="[person.initials.darkText ? 'black--text' : 'white--text']"
      :style="`line-height:${sizeAvatar}px`"
      >{{ person.initials.value }}</span
    >
  </v-avatar>
</template>

<script>
export default {
  name: 'PersonAvatar',

  props: {
    person: {
      required: true,
      type: Object
    },
    sizeAvatar: {
      default: 32,
      type: Number
    }
  },

  data() {
    return {
      error: false
    }
  },

  computed: {
    imageSrc() {
      return this.error || !this.person || (this.person && !this.person.avatarURL)
        ? null
        : this.person && this.person.avatarURL
    }
  }
}
</script>

<style lang="stylus" scoped>
.bordered {
  background-color: rgba(white, 0.8);
  border: 1px solid #fff !important;

  .v-image {
    border: inherit;
  }
}

.initials-value {
  font-size: 90%;
  font-weight: 600;
}
</style>
