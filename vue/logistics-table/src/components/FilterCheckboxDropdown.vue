<template>
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <button class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ label }} <span v-if="checkedItems.length">({{ checkedItems.length }})</span></span>
        <span class="icon is-small">
          <i class="fas fa-angle-down"/>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a class="dropdown-item" @click="checkedItems = []; handleChange()"><span class="icon"><i class="fas fa-times"/></span> <span>Clear Filters</span></a>

        <hr class="dropdown-divider">

        <label class="dropdown-item checkbox" v-for="(item, i) in list" :key="i">
          <input type="checkbox" name="clientName" :value="item" v-model="checkedItems" @change="handleChange()">
          {{ item }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'list', 'column'],

  data () {
    return {
      checkedItems: []
    }
  },

  methods: {
    handleChange () {
      const filter = {
        key: this.column,
        value: this.checkedItems
      }

      this.$store.commit('updateFilter', filter)
    }
  }
}
</script>
