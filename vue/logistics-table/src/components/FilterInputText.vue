<template>
  <div class="field">
    <p class="control has-icons-left">
      <input
        type="text"
        class="input is-small"
        placeholder="Search Filter"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
      <span class="icon is-large is-left">
        <i class="fas fa-search"/>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['value']
}
</script>
