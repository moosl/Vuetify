<template>
  <div v-if="segments && segments.length > 0" class="segmented-control">
    <span class="selection-pill" :style="pillTransformStyles"></span>
    <div v-for="segment of segments" :key="`segment-${segment.id}`" class="option">
      <input :id="segment.id" :name="elementName" type="radio" :value="segment.id" v-model="selectedSegmentId" />
      <label :for="segment.id">
        <span>{{ segment.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

export default {
  name: 'CommonSegmentedControl',

  props: {
    elementName: {
      default: () => '' + getRandomInt(100000),
      required: false,
      type: String
    },
    segments: {
      required: true,
      type: Array
    },
    value: {
      required: true,
      type: [Number, String]
    }
  },

  data() {
    return {
      selectedSegmentWidth: 0
    }
  },

  computed: {
    pillTransformStyles() {
      return `transform:translateX(${this.selectedSegmentWidth * this.selectedSegmentIndex}px)`
    },
    selectedSegmentId: {
      get() {
        return this.value
      },
      set(segmentId) {
        this.$emit('input', segmentId)
      }
    },
    selectedSegmentIndex() {
      return this.segments.findIndex((segment) => segment.id === this.value)
    }
  },

  watch: {
    // If segments are added, edited, or removed
    segments() {
      this.recalculateSelectedSegmentWidth()
    },
    // If the segment is changed programmatically
    value() {
      this.recalculateSelectedSegmentWidth()
    }
  },

  mounted() {
    window.addEventListener('resize', this.recalculateSelectedSegmentWidth())
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.recalculateSelectedSegmentWidth())
  },

  methods: {
    recalculateSelectedSegmentWidth() {
      // Wait for UI to rerender before measuring
      this.$nextTick(() => {
        const segmentElement = document.querySelector(`input[type='radio'][value='${this.value}']`)
        this.selectedSegmentWidth = segmentElement && segmentElement.offsetWidth
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.segmented-control {
  --background: rgba(255, 255, 255, 1);
  background: var(--background);
  border: 1px solid var(--v-primary-base);
  border-radius: calc(var(--scp-base-unit--half) + 2px);
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: 0;
  outline: none;
  overflow-x: auto;
  padding: 2px;
  text-rendering: geometricPrecision;
  touch-action: manipulation !important;
  user-select: none;

  label {
    cursor: inherit;
  }

  .option {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: relative;
    text-transform: uppercase;

    &:hover input:not(:checked) + label span, &:focus input:not(:checked) + label span, &:active input:not(:checked) + label span {
      color: var(--v-primary-lighten1);
    }

    &:active input:not(:checked) + label span {
      color: var(--v-primary-darken1);
    }

    &:first-of-type {
      grid-column: 1;
      grid-row: 1;
      box-shadow: none;

      input {
        &::before {
          opacity: 0;
        }
      }
    }

    &:last-of-type {
      input {
        &::after {
          opacity: 0;
        }
      }
    }

    input {
      appearance: none;
      border: none;
      bottom: 0;
      cursor: pointer;
      height: 100%;
      left: 0;
      margin: 0;
      outline: none;
      padding: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;

      &:checked + label {
        color: #fff;
        cursor: default;

        &::before, &::after {
          background: var(--background);
          z-index: 1;
        }
      }
    }

    label {
      background: rgba(255, 255, 255, 0);
      color: var(--v-primary-base);
      display: block;
      font-weight: 500;
      font-size: 14px;
      padding: 4px 16px;
      position: relative;
      text-align: center;

      span {
        display: block;
        position: relative;
        transition: all 0.2s ease;
        will-change: transform;
        z-index: 2;
      }
    }
  }

  .selection-pill {
    background: var(--v-primary-base);
    border-radius: var(--scp-base-unit--half);
    grid-column: 1;
    grid-row: 1;
    transition: transform 0.2s ease;
    will-change: transform;
    z-index: 2;
  }
}
</style>