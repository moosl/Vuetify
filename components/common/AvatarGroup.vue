<template>
  <div
    class="avatars-group"
    :class="{
      stacked: displayAs === 'stacked',
      padded: !noPadding,
      centered: centered
    }"
  >
    <ul>
      <template v-if="people">
        <li
          v-for="person in peopleReserved"
          :key="`avatar-person-${person.id}`"
          :class="{ 'cursor--pointer': clickable }"
        >
          <v-tooltip
            :bottom="tooltipPosition === 'bottom'"
            :left="tooltipPosition === 'left'"
            :right="tooltipPosition === 'right'"
            :top="tooltipPosition === 'top'"
          >
            <template #activator="{ on }">
              <v-avatar :size="size" style="outline: 0" tabindex="0" v-on="on">
                <avatar-image-initials
                  :alt="person.fullName || person.name"
                  :size="size"
                  :src="person.avatarURL"
                  @click="$emit('show-person', person.id)"
                />
              </v-avatar>
            </template>
            <span>
              <div>
                <strong>{{ person.fullName || person.name }}</strong>
              </div>
              <div>
                {{ person.role }}
              </div>
              <div
                v-if="person.tooltipData"
                class="tooltip-data"
                :class="{
                  'no-label': !tooltipDataHasLabel || tooltipDataHasLabel.length === 0
                }"
              >
                <div
                  v-for="(data, index) in person.tooltipData"
                  :key="`tooltip-data-label-${person.id}-${index}`"
                  class="tooltip-data__item"
                >
                  <span v-if="data.label" class="tooltip-data__item__label">
                    {{ data.label }}
                  </span>
                  <span>{{ data.value }}</span>
                </div>
              </div>
            </span>
          </v-tooltip>
          <slot :person="person" />
        </li>
      </template>
      <template v-if="items">
        <li
          v-for="item in items"
          :key="`avatar-item-${item.id}`"
          :class="{ 'cursor--pointer': clickable }"
          @click="SelectItem(item.id)"
        >
          <v-tooltip
            :bottom="tooltipPosition === 'bottom'"
            :left="tooltipPosition === 'left'"
            :right="tooltipPosition === 'right'"
            :top="tooltipPosition === 'top'"
          >
            <template #activator="{ on }">
              <v-avatar class="avatars-group__item-avatar" :size="size" style="outline: 0" tabindex="0" v-on="on">
                <avatar-image-initials
                  :alt="item.title || item.name"
                  :size="size"
                  :src="item.pictureURL"
                  @click="$emit('show-item', item.id)"
                />
              </v-avatar>
            </template>
            <div>
              <strong>{{ item.title || item.name }}</strong>
            </div>
          </v-tooltip>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import AvatarImageInitials from '/components/common/AvatarImageInitials.vue'

export default {
  name: 'ScpAvatarGroup',

  components: {
    AvatarImageInitials
  },

  props: {
    centered: {
      default: false,
      type: Boolean
    },
    clickable: {
      default: false,
      type: Boolean
    },
    displayAs: {
      default: 'grid',
      type: String,
      validator: (value) => ['grid', 'stacked'].includes(value)
    },
    items: {
      default: () => [],
      type: Array
    },
    noPadding: {
      default: false,
      type: Boolean
    },
    people: {
      default: () => [],
      type: Array
    },
    sorted: {
      default: true,
      type: Boolean
    },
    size: {
      default: '40px',
      type: String,
      validator: (value) => value.includes('px')
    },
    tooltipPosition: {
      default: 'bottom',
      type: String,
      validator: (value) => ['bottom', 'left', 'right', 'top'].includes(value)
    }
  },

  computed: {
    peopleReserved() {
      if (!this.sorted) {
        return this.people
      }
      return this.people && this.people.length > 0
        ? this.displayAs === 'stacked'
          ? this.people
              .slice()
              .sort((a, b) => (b.fullName ? b.fullName.localeCompare(a.fullName) : b.name.localeCompare(a.name)))
          : this.people
              .slice()
              .sort((a, b) => (a.fullName ? a.fullName.localeCompare(b.fullName) : a.name.localeCompare(b.name)))
        : null
    },

    tooltipDataHasLabel() {
      return this.people && this.people.length > 0
        ? this.people.filter(
            (person) => person.tooltipData && person.tooltipData.length > 0 && person.tooltipData[0].label
          )
        : null
    }
  },

  methods: {
    SelectItem(id) {
      this.$eventHub.$emit('item-selected', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
$base-unit = 8px;
$base-unit--half = $base-unit * 0.5;
$base-unit-2 = $base-unit * 2;
$avatar-size = $base-unit * 5;
$border-width = ($base-unit / 4);
$color--subtler = rgb(123, 123, 123);
$color--white = rgb(255, 255, 255);

.avatars-group {
  &:not(.stacked) {
    ul {
      display: grid;
      grid-gap: $base-unit;
      grid-template-columns: repeat(auto-fit, minmax(($avatar-size + $base-unit), 1fr));
      list-style: none;
      margin: 0;
      padding: 0 $base-unit;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .v-avatar {
        box-shadow: 0px 0px 0px $border-width #fff inset;

        img {
          padding: $border-width;
        }

        span {
          align-items: center;
          cursor: pointer;
          display: flex;
          font-size: 110%;
          font-weight: 700;
          height: 100%;
          justify-content: center;
          width: inherit;
        }
      }
    }
  }

  &.stacked {
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    &.padded {
      padding: $base-unit $base-unit-2;
    }

    ul {
      align-items: center;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      list-style: none;
      margin: 0;
      padding: 0;

      li:not(:last-child) {
        margin-left: (-($base-unit));
      }

      li:first-child {
        position: relative;

        &::after {
          content: '';
          display: block;
          height: $base-unit-2;
          position: absolute;
          right: (-($base-unit-2));
          top: 0;
          width: $base-unit-2;
        }
      }

      li:hover, li:focus, li:active {
        .v-avatar {
          transform: translateY((-($base-unit--half)));
          z-index: 1;
        }
      }

      .cursor--pointer {
        .avatar-initials {
          cursor: pointer !important;
        }
      }

      .v-avatar {
        transition: transform 0.1s ease;
      }
    }
  }

  &.centered {
    ul {
      justify-content: center;
    }
  }

  &__item-avatar {
    .avatar-initials, .v-image {
      border-color: rgba($color--subtler, 0.16);
    }
  }

  a {
    text-decoration: none;
  }
}

.tooltip-data {
  border-top: 1px solid rgba($color--white, 0.24);
  margin-top: $base-unit--half;
  padding-top: $base-unit--half;

  &__item {
    display: flex;
    justify-content: space-between;

    &__label {
      font-weight: 500;
      padding-right: $base-unit;
    }
  }

  &.no-label {
    flex-direction: column;

    .tooltip-data__item {
      display: inline-flex;

      &:nth-child(even) {
        margin: 0 $base-unit;
      }
    }
  }
}
</style>
