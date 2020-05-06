<template>
  <div id="app">
    <Cart />
  </div>
</template>

<script>
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  components: {
    Cart,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
</style>
