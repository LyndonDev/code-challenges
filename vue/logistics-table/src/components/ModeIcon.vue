<template>
  <span class="tag is-light">
    <span>{{ mode }}</span> <span class="icon"><i class="fas fa-fw" :class="modeIcon"/></span>
  </span>
</template>

<script>
export default {
  props: ['mode'],

  computed: {
    modeIcon () {
      if (this.mode === 'Air') {
        return 'fa-plane'
      } else if (this.mode === 'Rail') {
        return 'fa-train'
      } else if (this.mode === 'Sea') {
        return 'fa-ship'
      }

      return ''
    }
  }
}
</script>
