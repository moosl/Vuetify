<template>
  <v-select
    clearable
    dense
    hide-details
    item-value="id"
    item-text="name"
    :items="items"
    label="Select department..."
    solo
    v-model="selected"
  />
</template>

<script>
export default {
  name: 'DepartmentSelect',

  data() {
    return {
      departments: [
        {
          id: 1,
          name: 'Executive'
        },
        {
          id: 2,
          name: 'Sales'
        },
        {
          id: 3,
          name: 'Operations'
        },
        {
          id: 4,
          name: 'Product'
        },
        {
          id: 5,
          name: 'Engineering'
        },
        {
          id: 6,
          name: 'Quality'
        }
      ],
      selected: null
    }
  },

  computed: {
    items() {
      return [...this.departments].sort((a, z) => a.name.localeCompare(z.name))
    }
  },

  watch: {
    selected(val) {
      this.$emit('update:department', val)
    }
  }
}
</script>
