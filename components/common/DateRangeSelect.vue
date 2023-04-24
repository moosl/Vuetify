<template>
  <v-select
    clearable
    dense
    hide-details
    item-value="days"
    item-text="name"
    :items="dateRanges"
    label="Select date range..."
    solo
    v-model="selected"
  />
</template>

<script>
export default {
  name: 'DateRangeSelect',

  data() {
    return {
      dateRanges: [
        {
          days: 7,
          name: 'Last 7 days'
        },
        {
          days: 30,
          name: 'Last 30 days'
        },
        {
          days: 60,
          name: 'Last 60 days'
        },
        {
          days: 90,
          name: 'Last 90 days'
        }
      ],
      selected: null
    }
  },

  watch: {
    selected(val) {
      this.$emit('update:date-range', val)
    }
  }
}
</script>
