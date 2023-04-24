<template>
  <v-app id="app">
    <app-nav-drawer />
    <app-toolbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer />
    <app-right-drawer />
  </v-app>
</template>

<script>
import AppFooter from '../components/layout/Footer.vue'
import AppNavDrawer from '../components/layout/NavDrawer.vue'
import AppRightDrawer from '../components/layout/RightDrawer.vue'
import AppToolbar from '../components/layout/Toolbar.vue'

export default {
  name: 'app',
  components: {
    AppFooter,
    AppNavDrawer,
    AppRightDrawer,
    AppToolbar
  }
}
</script>

<style lang="stylus">
:root {
  --scp-base-unit: 8px;
  --scp-base-unit--half: calc(var(--scp-base-unit) * 0.5);
  --scp-base-unit--2: calc(var(--scp-base-unit) * 2);
  --scp-base-unit--3: calc(var(--scp-base-unit) * 3);
  --scp-base-unit--4: calc(var(--scp-base-unit) * 4);
  --scp-base-unit--5: calc(var(--scp-base-unit) * 5);
  --scp-bg-colour--poc: #DCE775;
  --scp-bg-colour--subtle: rgba(25, 51, 102, 0.08);
  --scp-bg-colour--subtler: rgba(25, 51, 102, 0.04);
  --scp-border-colour: rgba(0, 0, 0, 0.08);
  --scp-border-colour--poc: #C0CA33;
  --scp-z-index--drawer: 11;
  --scp-z-index--toolbar: 10;
  --scp-popover-colour: white;
  --scp-text-colour--poc: #827717;
  --scp-text-colour--subtle: #333;
  --scp-text-colour--subtler: #666;
  --scp-tooltip-colour: rgba(black, 0.8);
}

html, .application {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  line-height: 1.3em;
}

.theme--light.application {
  background-color: #e5ecef;
}

iframe[id^='sb__open-sandbox'] {
  display: none;
}

.border-bottom {
  border-bottom: 1px solid var(--scp-border-colour);
}

.cursor--pointer {
  cursor: pointer;
}

.icon--expanded {
  transform: rotate(-180deg);
}

.line-height--normal {
  line-height: normal;
}

.text--subtle {
  color: rgba(black, 0.64);
}

section.v-card {
  .v-card__title {
    background-color: var(--scp-bg-colour--subtler);
    border-bottom: 1px solid var(--scp-border-colour);
    color: var(--scp-text-colour--subtle);
    font-weight: 600;
    justify-content: space-between;
    padding: var(--scp-base-unit) var(--scp-base-unit--2);
    text-transform: uppercase;

    .col__left {
      align-items: center;
      color: var(--scp-text-colour--subtle);
      display: flex;
      font-size: 1.2em;
      font-weight: 600;
      text-transform: uppercase;

      .count {
        color: var(--scp-text-colour--subtler);
        font-weight: 400;
        margin-left: var(--scp-base-unit);
      }

      .v-icon {
        margin-right: var(--scp-base-unit);
      }
    }

    .col__right {
      align-items: center;
      display: flex;
      font-weight: initial;
      gap: var(--scp-base-unit--half);

      .v-btn {
        margin: 0;
      }

      .v-select {
        .v-input__control {
          min-height: 40px;
        }
      }
    }
  }
}

.v-btn:not(.v-btn--icon) {
  border-radius: var(--scp-base-unit--half);
  box-shadow: initial !important;
}

.v-datatable {
  .row-actions {
    text-align: right;

    .v-btn {
      margin: 0;

      &:not(:first-of-type) {
        margin-left: var(--scp-base-unit--half);
      }
    }
  }
}

.v-overlay {
  z-index: var(--scp-z-index--drawer);
}

.v-tabs {
  .v-btn.v-btn--icon {
    margin-right: var(--scp-base-unit);
  }
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: var(--scp-tooltip-colour);
    border-radius: var(--scp-base-unit--half);
    color: white;
    font-size: 13px;
    padding: var(--scp-base-unit--half) var(--scp-base-unit);
  }

  .tooltip-arrow {
    display: none;
  }

  &[x-placement^='top'] {
    margin-bottom: var(--scp-base-unit--half);
  }

  &[x-placement^='bottom'] {
    margin-top: var(--scp-base-unit--half);
  }

  &[x-placement^='right'] {
    margin-left: var(--scp-base-unit--half);
  }

  &[x-placement^='left'] {
    margin-right: var(--scp-base-unit--half);
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }

  &.popover {
    .popover-inner {
      background-color: var(--scp-popover-colour);
      border-radius: calc(var(--scp-base-unit--half) * 0.5);
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      color: black;
      padding: var(--scp-base-unit--half) 0;
    }

    .popover-arrow {
      display: none;
    }
  }
}
</style>
