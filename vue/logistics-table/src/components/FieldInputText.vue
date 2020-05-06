<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        :class="{ 'is-danger': err }"
        type="text"
        :value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'err']
}
</script>
