<template>
  <v-list-tile v-if="objective" class="objective-item" :to="{ name: 'page-about' }">
    <v-list-tile-content>
      <v-list-tile-title>
        {{ objective.title }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        due <common-date-relative :date="objective.endDate" />
        <span class="grey--text mx-1 text--lighten-1">&bull;</span> last updated
        <common-date-relative :date="objective.lastProgressUpdateDate" />
      </v-list-tile-sub-title>
      <v-list-tile-sub-title>
        <v-tooltip :color="objectiveProgressColour" top>
          <template #activator="{ on }">
            <v-progress-linear
              class="my-2"
              :color="objectiveProgressColour"
              :value="objective.currentProgressPercentage"
              v-on="on"
            />
          </template>
          {{ `${objective.currentProgressPercentage}% complete` }}
        </v-tooltip>
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-icon color="primary">chevron_right</v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import AvatarImageInitials from '/components/common/AvatarImageInitials.vue'
import CommonDateRelative from '/components/common/DateRelative.vue'

import { percentageColour } from '/helpers/strings.js'

export default {
  name: 'ObjectiveItem',

  components: {
    AvatarImageInitials,
    CommonDateRelative
  },

  props: {
    objective: {
      required: true,
      type: Object
    }
  },

  computed: {
    objectiveProgressColour() {
      return percentageColour(this.objective.currentProgressPercentage)
    }
  }
}
</script>

<style lang="stylus" scoped>
.objective-item {
  border-top: 1px solid var(--scp-border-colour);
}
</style>
