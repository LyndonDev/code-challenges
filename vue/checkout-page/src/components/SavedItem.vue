<template>
  <div class="saved-item">
    <div class="saved-item__details">
      <figure class="saved-item__details__image">
        <img
          :src="productImage"
          alt=""
        >
      </figure>
      <div class="saved-item__details__item">
        <a
          href="#"
          class="saved-item__details__name"
        >
          <span class="saved-item__details__brand">{{ item.brand }}</span>
          {{ item.name }}
        </a>
        <span class="saved-item__details__color">{{ item.color }}</span>
        <span class="saved-item__details__size">{{ item.size }}</span>
        <span class="saved-item__details__sku">#{{ item.sku }}</span>
        <div class="saved-item__details__buttons">
          <button
            :id="`move-to-cart-btn-${item.sku}`"
            type="button"
            class="btn btn--small"
            @click="moveToCart"
          >
            Move to cart
          </button>
          <button
            :id="`remove-btn-${item.sku}`"
            type="button"
            class="btn btn--small"
            @click="removeItem"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="saved-item__options">
      <div class="saved-item__options__row">
        <div class="saved-item__options__quantity">
          <span>Quantity: {{ item.quantity }}</span>
        </div>
        <div class="saved-item__options__price">
          <span>${{ formattedPrice }}</span>
        </div>
        <div class="saved-item__options__total">
          <span>${{ totalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SavedItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    /*
    Provides the image path for the product image
    */
    productImage() {
      return require(`@/assets/${this.item.img}`);
    },

    /*
    Formats the price number so it's padded with zeroes
    */
    formattedPrice() {
      return this.item.price.toFixed(2);
    },

    /*
    Calculates the total price of the items
    */
    totalPrice() {
      const total = this.item.price * this.item.quantity;
      return total.toFixed(2);
    },
  },
  methods: {
    /*
    Called when the Move to cart button (#move-to-cart) is clicked
    Emits an event to move the item to the items array
    */
    moveToCart() {
      this.$emit('move-to-cart', this.item.id);
    },

    /*
    Called when the Remove button (#remove) is clicked
    Emits an event to remove the item from the savedItems array
    */
    removeItem() {
      this.$emit('remove-from-saved', this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/SavedItem.scss';
</style>
