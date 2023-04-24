<template>
  <v-layout align-center class="content-heading">
    <v-flex pa-0>
      <h4 class="text--subtle text-uppercase" :data-help-tip="GenerateHelpTag()">
        {{ label }}
        <span v-if="count || count === 0" class="grey--text font-weight-regular ml-2">
          {{ count }}
        </span>
      </h4>
    </v-flex>
    <v-flex v-if="$slots.actions" pa-0 shrink>
      <slot name="actions"></slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ScpContentHeading',
  props: {
    count: {
      default: null,
      type: Number
    },
    label: {
      default: '',
      type: String
    }
  },
  methods: {
    GenerateHelpTag() {
      return 'help-tag'
    }
  }
}
</script>

<style lang="stylus" scoped>
$base-unit = 8px;
$base-unit--half = ($base-unit * 0.5);
$border-radius = $base-unit--half;
$color--background = #e5ecef;
$color--subtle-bg = rgba($color--background, 0.56);
$sm-max = 959px;

.content-heading {
  background: $color--subtle-bg;
  border-radius: $border-radius;
  font-weight: normal;
  margin: $base-unit -12px 0 !important;
  padding: 6px 12px;
}

@media only screen and (max-width: $sm-max) {
  .content-heading {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
