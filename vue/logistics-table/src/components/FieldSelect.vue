<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <div class="select" :class="{ 'is-danger': err }">
        <select :value="value" v-on:input="$emit('input', $event.target.value)">
          <option></option>
          <option v-for="item in list" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'list', 'value', 'err']
}
</script>
