<template>
  <span>
    <i :class="arrowDirection()" v-if="this.$store.state.sort.by === this.column"/>
    <i class="fas fa-sort has-text-grey-lighter" v-else/>
  </span>
</template>

<script>
export default {
  props: ['column'],
  methods: {
    arrowDirection () {
      return {
        fas: true,
        'fa-sort-down': this.$store.state.sort.asc,
        'fa-sort-up': !this.$store.state.sort.asc
      }
    }
  }
}
</script>
