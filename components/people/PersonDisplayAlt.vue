<template>
  <div
    v-if="person"
    class="person-display"
    :class="{ 'cursor--pointer': route }"
    v-on="route ? { click: () => GoToRoute(route) } : {}"
  >
    <div class="person-display-avatar">
      <person-avatar
        :class="{ bordered: hideDetails }"
        :person="person"
        v-tooltip="{
          content: hideDetails ? `<b>${person.fullName}</b><br/>${person.role}` : null,
          html: true
        }"
      />
    </div>
    <div v-if="!hideDetails" class="person-display-details">
      <div class="person-display-details-name">{{ person.fullName }}</div>
      <div class="person-display-details-role">{{ person.role }}</div>
    </div>
  </div>
</template>

<script>
import PersonAvatar from './PersonAvatar.vue'

export default {
  name: 'PersonDisplay',

  components: {
    PersonAvatar
  },

  props: {
    hideDetails: {
      default: false,
      type: Boolean
    },
    person: {
      required: true,
      type: Object
    },
    route: {
      default: null,
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
  },

  methods: {
    GoToRoute(route) {
      this.$router.push(route)
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
