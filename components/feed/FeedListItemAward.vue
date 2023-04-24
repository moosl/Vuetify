<template>
  <v-card :class="['award', { small: !viewDesktop }]" tag="article">
    <v-card-text class="award__content">
      <div class="award__content__person">
        {{ article.awardPersonName }}
      </div>
      <div>has been awarded</div>
      <div class="award__content__title">
        {{ article.awardTitle }}
      </div>
      <div v-if="article.awardPictureURL" class="award__content__picture">
        <img :alt="article.awardTitle" :src="article.awardPictureURL" />
      </div>
      <div class="mt-2">
        by
        <span class="award__content__awarded-by">{{ article.awardAwardedBy }}</span>
        <common-date-relative :date="article.awardAwardedOn" />
      </div>
    </v-card-text>
    <v-card-actions v-if="article.allowComments || article.allowLikes">
      <v-btn v-if="article.allowComments" color="primary" flat :icon="!viewDesktop">
        <v-icon :left="viewDesktop">comment</v-icon>
        <template v-if="viewDesktop"> Comment </template>
      </v-btn>
      <v-btn v-if="article.allowLikes" color="pink" flat :icon="!viewDesktop">
        <v-icon :left="viewDesktop">favorite</v-icon>
        <template v-if="viewDesktop"> Like </template>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CommonDateRelative from '/components/common/DateRelative.vue'

export default {
  name: 'FeedListItemAward',

  components: {
    CommonDateRelative
  },

  props: {
    article: {
      default: () => {},
      type: Object
    },
    viewDesktop: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style lang="stylus" scoped>
.award {
  display: flex;

  &__content {
    align-items: center;
    color: var(--scp-text-colour--subtler);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    line-height: 1.75;
    padding: var(--scp-base-unit--2) var(--scp-base-unit--3);

    &__awarded-by {
      color: #333;
      font-weight: 500;
    }

    &__person {
      color: #333;
      font-size: 24px;
    }

    &__title {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      text-transform: capitalize;
    }
  }
}

.v-icon--left {
  margin-right: var(--scp-base-unit);
}

.v-icon--right {
  margin-left: var(--scp-base-unit);
}

.v-card__actions {
  background-color: var(--scp-bg-colour--subtler);
  border-top: 1px solid var(--scp-border-colour);
}
</style>
