<template>
  <div class="person-display" :style="styles">
    <div class="person-display__avatar">
      <avatar-image-initials :alt="fullName" :size="avatarSize" :src="avatarURL" />
    </div>
    <div class="person-display__details">
      <strong v-if="fullName">{{ fullName }}</strong>
      <span v-if="role">{{ role }}</span>
      <slot />
    </div>
  </div>
</template>

<script>
import AvatarImageInitials from '/components/common/AvatarImageInitials.vue'

export default {
  name: 'PersonDisplay',

  components: {
    AvatarImageInitials
  },

  props: {
    avatarSize: {
      default: 48,
      type: [Number, String]
    },
    avatarURL: {
      default: null,
      type: String
    },
    fullName: {
      default: null,
      type: String
    },
    role: {
      default: null,
      type: String
    }
  },

  computed: {
    styles() {
      return this.avatarSize && Number(this.avatarSize)
        ? `--person-display-columns: ${Number(this.avatarSize)}px 1fr; --person-display-gap: ${
            Number(this.avatarSize) / 4
          }px`
        : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
font-small() {
  font-size: 0.9rem;
}

.person-display {
  align-items: center;
  column-gap: var(--person-display-gap);
  display: grid;
  grid-template-columns: var(--person-display-columns);

  &__details {
    display: flex;
    flex-direction: column;
    line-height: 1.15rem;

    span {
      color: var(--scp-text-colour--subtler);
      font-small();
    }

    time {
      color: var(--scp-text-colour--subtle);
      font-small();
      font-weight: 500;
    }
  }
}
</style>
