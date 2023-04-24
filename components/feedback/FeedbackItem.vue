<template>
  <div class="feedback-item">
    <div class="feedback-item__header" @click="expanded = !expanded">
      <div class="feedback-item__header__avatars">
        <avatar-image-initials
          :alt="feedback.createdBy.fullName"
          :size="avatarSize"
          :src="feedback.createdBy.avatarURL"
        />
        <v-icon>arrow_right</v-icon>
        <avatar-image-initials
          :alt="feedback.personFor.fullName"
          :size="avatarSize"
          :src="feedback.personFor.avatarURL"
        />
      </div>
      <div class="feedback-item__header__summary">
        <div>{{ feedback.feedback }}</div>
        <div class="feedback-item__header__summary__meta">
          From
          <span>{{ feedback.createdBy.knownAs }}</span>
          <common-date-relative :date="feedback.createdOn" />
        </div>
      </div>
      <div class="feedback-item__header__indicator">
        <v-icon :class="{ 'icon--expanded': expanded }">expand_more</v-icon>
      </div>
    </div>
    <v-expand-transition>
      <div v-show="expanded" class="pt-2">
        <p class="ma-0">Normal feedback stuff goes here</p>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import AvatarImageInitials from '/components/common/AvatarImageInitials.vue'
import CommonDateRelative from '/components/common/DateRelative.vue'

export default {
  name: 'FeedbackItem',

  components: {
    AvatarImageInitials,
    CommonDateRelative
  },

  props: {
    feedback: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      avatarSize: 32,
      expanded: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.feedback-item {
  border-top: 1px solid var(--scp-border-colour);
  padding: var(--scp-base-unit--2);

  &__header {
    cursor: pointer;
    display: grid;
    grid-gap: var(--scp-base-unit--2);
    grid-template-columns: 88px 1fr 24px;

    &__avatars {
      align-items: center;
      align-self: flex-start;
      display: flex;
    }

    &__summary {
      &__meta {
        color: var(--scp-text-colour--subtler);
        font-size: 90%;
        padding-top: var(--scp-base-unit);

        span {
          color: var(--scp-text-colour--subtle);
          font-weight: 500;
        }
      }
    }
  }
}
</style>
