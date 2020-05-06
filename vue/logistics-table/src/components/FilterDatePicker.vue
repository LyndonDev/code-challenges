<template>
  <div class="field">
    <p class="control has-icons-left">
      <flatPickr
        class="input is-small"
        placeholder="Date Filter"
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        :config="datePickerConfig"
      />
      <span class="icon is-large is-left">
        <i class="fas fa-calendar-alt"/>
      </span>
    </p>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'

export default {
  props: ['value'],

  components: {
    flatPickr
  },

  data () {
    return {
      datePickerConfig: {
        dateFormat: 'n/j/y',
        allowInput: true
      }
    }
  }
}
</script>
