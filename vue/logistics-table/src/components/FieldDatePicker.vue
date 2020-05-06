<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <p class="control has-icons-left">
      <flatPickr
        class="input"
        :class="{ 'is-danger': err }"
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
  props: ['label', 'value', 'err'],

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
