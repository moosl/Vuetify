<template>
  <v-menu v-model="helper" :close-on-content-click="false" left max-width="240" nudge-left="8" offset-x>
    <template #activator="{ on }">
      <v-btn class="ma-0" color="lime darken-1" icon small v-on="on">
        <v-icon color="white" small>{{ helper ? 'close' : 'note' }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'CommonPocHelper',

  data() {
    return {
      helper: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-card {
  background-color: var(--scp-bg-colour--poc);
  border: 1px solid var(--scp-border-colour--poc);
  color: var(--scp-text-colour--poc);

  &__text {
    font-size: 90%;
    padding: var(--scp-base-unit);

    >>> p:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
