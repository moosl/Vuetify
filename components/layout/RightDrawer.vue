<template>
  <v-navigation-drawer fixed right stateless temporary touchless :width="rightDrawerWidth" v-model="rightDrawer">
    <v-container fill-height pa-0>
      <v-layout column>
        <v-flex shrink>
          <v-toolbar flat>
            <v-toolbar-title v-if="rightDrawerTitle">{{ rightDrawerTitle }}</v-toolbar-title>
            <v-spacer />
            <v-btn aria-label="Close panel" icon @click="CloseRightDrawer()">
              <v-icon color="secondary">close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider />
        </v-flex>
        <v-flex panel-content grow>
          <component v-if="rightDrawerComponentContent" :is="rightDrawerComponentContent" />
          <v-container v-else>
            <v-layout wrap>
              <v-flex grey--text xs12>Panel content goes here...</v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex shrink>
          <v-divider />
          <v-progress-linear
            v-if="rightDrawerWizardSteps"
            class="my-0"
            height="4"
            v-model="rightDrawerWizardStepPercentage"
          />
          <v-footer height="56">
            <v-btn color="secondary" flat @click="CloseRightDrawer()">Cancel</v-btn>
            <v-spacer />
            <template v-if="rightDrawerWizardSteps">
              <component v-if="rightDrawerComponentButton" :is="rightDrawerComponentButton" />
              <v-divider class="mx-3" vertical />
              <v-btn :disabled="!wizardCanGoPrevious" icon @click="WizardGoPrevious()">
                <v-icon color="secondary">chevron_left</v-icon>
              </v-btn>
              <v-btn color="secondary" :disabled="!wizardCanGoNext" @click="WizardGoNext()"> Next </v-btn>
            </template>
            <component v-else-if="rightDrawerComponentButton" :is="rightDrawerComponentButton" />
          </v-footer>
        </v-flex>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AppRightDrawer',

  computed: {
    ...mapState([
      'rightDrawerButtonNextDisabled',
      'rightDrawerComponentButton',
      'rightDrawerComponentContent',
      'rightDrawerTitle',
      'rightDrawerWidth',
      'rightDrawerWizardStepCurrent',
      'rightDrawerWizardSteps'
    ]),

    rightDrawer: {
      get() {
        return this.$store.state.rightDrawer
      },
      set(val) {
        this.SET_RIGHT_DRAWER({ open: val })
      }
    },

    rightDrawerWizardStepPercentage() {
      return this.rightDrawerWizardSteps
        ? (this.rightDrawerWizardStepCurrent / this.rightDrawerWizardSteps) * 100
        : null
    },

    wizardCanGoNext() {
      return (
        this.rightDrawerWizardSteps &&
        this.rightDrawerWizardStepCurrent &&
        this.rightDrawerWizardStepCurrent < this.rightDrawerWizardSteps &&
        !this.rightDrawerButtonNextDisabled
      )
    },

    wizardCanGoPrevious() {
      return this.rightDrawerWizardSteps && this.rightDrawerWizardStepCurrent && this.rightDrawerWizardStepCurrent > 1
    }
  },

  methods: {
    ...mapMutations([
      'SET_RIGHT_DRAWER',
      'SET_RIGHT_DRAWER_WIZARD_STEP_CURRENT',
      'SET_RIGHT_DRAWER_WIZARD_STEP_NEXT',
      'SET_RIGHT_DRAWER_WIZARD_STEP_PREVIOUS'
    ]),

    CloseRightDrawer() {
      this.SET_RIGHT_DRAWER({ open: false })
    },

    WizardGoNext() {
      this.SET_RIGHT_DRAWER_WIZARD_STEP_NEXT()
    },

    WizardGoPrevious() {
      this.SET_RIGHT_DRAWER_WIZARD_STEP_PREVIOUS()
    }
  }
}
</script>

<style lang="stylus" scoped>
$button-margin = 16px;

.grow {
  height: calc(65px - 100vh - 61px);
  overflow-y: auto;
}

.v-footer {
  .v-btn {
    margin: 0;

    &:first-of-type {
      margin-left: $button-margin;
    }

    &:last-of-type {
      margin-right: $button-margin;
    }

    + .v-btn {
      margin-left: 8px;
    }
  }
}

.v-navigation-drawer {
  z-index: var(--scp-z-index--drawer);

  .panel-content {
    .v-form {
      padding: var(--scp-base-unit--3);
    }
  }
}

.v-toolbar {
  &__title {
    padding: var(--scp-base-unit--half) 0;
  }
}
</style>
