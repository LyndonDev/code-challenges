<template>
  <span class="tag" :class="statusType">{{ status }}</span>
</template>

<script>
export default {
  props: ['status'],

  computed: {
    statusType () {
      if (this.status === 'Arrived') {
        return 'is-success'
      } else if (this.status === 'Cancelled') {
        return 'is-black'
      } else if (this.status === 'Customs Hold') {
        return 'is-warning'
      } else if (this.status === 'In Transit') {
        return 'is-primary'
      } else if (this.status === 'Roll-Over') {
        return 'is-grey'
      } else if (this.status === 'TransportError') {
        return 'is-danger'
      } else {
        return 'is-light'
      }
    }
  }
}
</script>
