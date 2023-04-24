<template>
  <v-card
    :class="[
      'content',
      {
        blog:
          article.articleTypeId === articleTypesEnum.BLOG ||
          article.articleTypeId === articleTypesEnum.EVENT ||
          article.articleTypeId === articleTypesEnum.SURVEY ||
          article.articleTypeId === articleTypesEnum.TASK,
        social:
          article.articleTypeId === articleTypesEnum.SHAREABLE ||
          article.articleTypeId === articleTypesEnum.SOCIAL ||
          article.articleTypeId === articleTypesEnum.USER
      }
    ]"
    tag="article"
  >
    <v-card-text
      v-if="showContentMeta"
      class="content__meta"
      :class="{
        critical: article.priorityId === articlePrioritiesEnum.CRITICAL,
        highlight: article.priorityId === articlePrioritiesEnum.HIGHLIGHT,
        important: article.priorityId === articlePrioritiesEnum.IMPORTANT,
        information: article.priorityId === articlePrioritiesEnum.INFORMATION
      }"
    >
      <div v-if="showLastReaction" class="last-reaction">
        <span class="name">{{ article.lastReactionPersonName }}</span>
        {{ article.lastReactionType }}
        <common-date-relative :date="article.lastReactionReactionDate" />
      </div>
      <v-spacer />
      <div class="priority">
        {{ priorityType }}
      </div>
    </v-card-text>
    <v-divider v-if="showContentMeta" />
    <v-card-text v-if="showAuthorSocial">
      <person-display
        :avatarURL="article.createdByAvatarURL"
        :full-name="article.createdByName"
        :role="article.createdByRole"
      >
        <common-date-relative :date="article.publishedDate" />
      </person-display>
    </v-card-text>
    <v-img v-if="article.mainImageId" :alt="article.title" :src="article.mainImageId"></v-img>
    <v-card-title v-if="showContentTitle">
      <h2 class="headline mb-0">{{ article.title }}</h2>
    </v-card-title>
    <v-card-text
      v-if="
        article.articleTypeId === articleTypesEnum.BLOG ||
        article.articleTypeId === articleTypesEnum.EVENT ||
        article.articleTypeId === articleTypesEnum.SURVEY ||
        article.articleTypeId === articleTypesEnum.TASK
      "
      class="content__author"
    >
      By
      <strong>{{ article.createdByName }}</strong>
      {{ article.createdByRole }}
      <common-date-relative :date="article.publishedDate" />
    </v-card-text>
    <v-card-text v-if="article.articleTypeId === articleTypesEnum.POLL" class="content__published">
      Published
      <common-date-relative :date="article.publishedDate" />
    </v-card-text>
    <div class="content__wrapper">
      <v-card-text class="content__summary" v-html="article.summary" />
      <feed-list-item-embed-event v-if="showContentEvent" />
      <feed-list-item-embed-poll v-if="showContentPoll" />
      <feed-list-item-embed-survey v-if="showContentSurvey" />
      <v-card-text class="content__tags">
        <a href="#">{{ `#${article.tag.replace('#', '')}` }}</a>
      </v-card-text>
    </div>
    <v-card-text class="content__interactions">
      <div>
        <template v-if="article.allowComments">
          <small> {{ article.numberOfComments }} comments </small>
        </template>
        <template v-if="article.allowLikes">
          <span v-if="article.allowComments" class="grey--text mx-1 text--lighten-1">&bull;</span>
          <small> {{ article.numberOfLikes }} likes </small>
        </template>
        <template v-if="article.articleTypeId === articleTypesEnum.EVENT">
          <span v-if="article.allowComments || article.allowLikes" class="grey--text mx-1 text--lighten-1"
            >&bull;</span
          >
          <small> {{ article.eventAttendeesCount }} attendees </small>
        </template>
      </div>
      <div>
        <small v-if="article.numberOfAttachments">
          <v-icon small>attach_file</v-icon>
          {{
            `${article.numberOfAttachments} ${
              article.numberOfAttachments === 1 ? 'attachment' : 'attachments'
            }`
          }}</small
        >
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="article.allowComments" color="primary" flat :icon="!viewDesktop">
        <v-icon :left="viewDesktop">comment</v-icon>
        <template v-if="viewDesktop"> Comment </template>
      </v-btn>
      <v-btn v-if="article.allowLikes" color="pink" flat :icon="!viewDesktop">
        <v-icon :left="viewDesktop">favorite</v-icon>
        <template v-if="viewDesktop"> Like </template>
      </v-btn>
      <v-tooltip v-if="article.articleTypeId === articleTypesEnum.SHAREABLE" right>
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="primary">share</v-icon>
          </v-btn>
        </template>
        Share this publically
      </v-tooltip>
      <v-tooltip v-if="article.articleTypeId === articleTypesEnum.TASK" right>
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="warning">assignment_ind</v-icon>
          </v-btn>
        </template>
        View Task
      </v-tooltip>
      <v-tooltip v-if="showContentEvent" right>
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="primary">event</v-icon>
          </v-btn>
        </template>
        Add to calendar
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn flat color="primary">
        Read more
        <v-icon right>chevron_right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FeedListItemEmbedEvent from './FeedListItemEmbedEvent.vue'
import FeedListItemEmbedPoll from './FeedListItemEmbedPoll.vue'
import FeedListItemEmbedSurvey from './FeedListItemEmbedSurvey.vue'

import PersonDisplay from '/components/person/PersonDisplay.vue'

import CommonDateRelative from '/components/common/DateRelative.vue'

import { objectKeyByValue } from '/helpers/objects.js'

import { articlePrioritiesEnum, articleTypesEnum } from '/data/enums.js'

export default {
  name: 'FeedListItem',

  components: {
    CommonDateRelative,
    FeedListItemEmbedEvent,
    FeedListItemEmbedPoll,
    FeedListItemEmbedSurvey,
    PersonDisplay
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
  },

  data() {
    return {
      articlePrioritiesEnum: articlePrioritiesEnum,
      articleTypesEnum: articleTypesEnum
    }
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },

    articleType() {
      return objectKeyByValue(this.articleTypesEnum, this.article.articleTypeId)
    },

    priorityType() {
      return objectKeyByValue(this.articlePrioritiesEnum, this.article.priorityId)
    },

    showAuthorSocial() {
      return (
        this.article &&
        (this.article.articleTypeId === this.articleTypesEnum.SHAREABLE ||
          this.article.articleTypeId === this.articleTypesEnum.SOCIAL ||
          this.article.articleTypeId === this.articleTypesEnum.USER)
      )
    },

    showContentEvent() {
      return this.article && this.article.articleTypeId === this.articleTypesEnum.EVENT
    },

    showContentMeta() {
      return (
        this.article && (this.article.allowComments || this.article.allowLikes || this.article.priorityId)
      )
    },

    showContentPoll() {
      return this.article && this.article.articleTypeId === this.articleTypesEnum.POLL
    },

    showContentSurvey() {
      return this.article && this.article.articleTypeId === this.articleTypesEnum.SURVEY
    },

    showContentTitle() {
      return (
        this.article &&
        this.article.articleTypeId !== this.articleTypesEnum.AWARD &&
        this.article.articleTypeId !== this.articleTypesEnum.USER
      )
    },

    showLastReaction() {
      return (
        this.article &&
        this.article.lastReactionPersonName &&
        (this.article.allowComments || this.article.allowLikes)
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
$background-light = #F5F5F5;
$border-color = var(--scp-border-colour);

border-bottom-top() {
  border: 1px solid $border-color;
  border-width: 1px 0;
}

font-small() {
  font-size: 0.9rem;
}

font-tiny() {
  font-size: 0.8rem;
}

$text-subtle = #333;
$text-subtler = #666;

padding-slim() {
  padding: 8px 16px;
}

.content__embed {
  background-color: $background-light;
  border-bottom-top();

  + .content__tags {
    padding-top: 16px;
  }
}

.content__interactions {
  align-items: center;
  display: flex;
  justify-content: space-between;
  line-height: 1;
}

.content__meta {
  color: $text-subtler;
  display: flex;
  font-small();
  padding-slim();

  .last-reaction {
    .name, time {
      color: $text-subtle;
      font-weight: 500;
    }
  }

  .priority {
    font-weight: 500;
  }
}

.content__published {
  background-color: $background-light;
  border-bottom-top();
  color: $text-subtler;
  padding-slim();

  time {
    color: $text-subtle;
    font-weight: 500;
  }
}

.content__tags {
  padding: 0 16px;

  a {
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.blog {
  .content__author {
    background-color: $background-light;
    border-bottom-top();
    color: $text-subtler;
    font-small();
    padding-slim();

    time {
      color: $text-subtle;
      font-weight: 500;
    }
  }
}

.critical {
  background: linear-gradient(45deg, hsla(0, 0%, 100%, 0) 75%, var(--v-error-base) 175%);

  .priority {
    color: var(--v-error-base);
  }
}

.highlight {
  background: linear-gradient(45deg, hsla(0, 0%, 100%, 0) 75%, var(--v-success-base) 175%);

  .priority {
    color: var(--v-success-base);
  }
}

.important {
  background: linear-gradient(45deg, hsla(0, 0%, 100%, 0) 75%, var(--v-primary-base) 175%);

  .priority {
    color: var(--v-primary-base);
  }
}

.information {
  background: linear-gradient(45deg, hsla(0, 0%, 100%, 0) 75%, var(--v-info-base) 175%);

  .priority {
    color: var(--v-info-base);
  }
}

.priority {
  text-shadow: 0px 1px 3px #FFFFFF;
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