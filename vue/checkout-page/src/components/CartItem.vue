<template>
  <div class="item">
    <div class="item__details">
      <figure class="item__details__image">
        <img
          :src="productImage"
          alt=""
        >
      </figure>
      <div class="item__details__item">
        <a
          href="#"
          class="item__details__name"
        >
          <span class="item__details__brand">{{ item.brand }}</span>
          {{ item.name }}
        </a>
        <span class="item__details__color">{{ item.color }}</span>
        <span class="item__details__size">{{ item.size }}</span>
        <span class="item__details__sku">#{{ item.sku }}</span>

        <div class="item__details__buttons">
          <button
            :id="`save-for-later-btn-${item.sku}`"
            type="button"
            name=""
            class="btn btn--small"
            @click="saveForLater"
          >
            Save for later
          </button>
          <button
            :id="`remove-btn-${item.sku}`"
            type="button"
            name=""
            class="btn btn--small"
            @click="removeItem"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="item__options">
      <div class="item__options__inner">
        <div class="item__options__row item__options__row--pricing">
          <div class="item__options__quantity">
            <button
              :id="`decrement-${item.sku}`"
              type="button"
              name="button"
              class="btn btn--decrement"
              @click="decrementQuantity"
              v-bind:disabled="item.quantity === 0"
            >
              <MinusIcon />
            </button>
            <input
              type="number"
              name=""
              pattern="[0-9]*"
              :value="item.quantity"
            >
            <button
              :id="`increment-${item.sku}`"
              type="button"
              name="button"
              class="btn btn--increment"
              @click="incrementQuantity"
            >
              <PlusIcon />
            </button>
          </div>
          <div class="item__options__price">
            <span>${{ formattedPrice }}</span>
          </div>
          <div class="item__options__total">
            <span>${{ totalPrice }}</span>
          </div>
        </div>
        <fieldset>
          <div class="item__options__row">
            <input
              :id="`item-ship-${item.id}`"
              type="radio"
              :name="inputName"
              value=""
              checked
            >
            <label :for="`item-ship-${item.id}`">Ship - Free for orders over $50</label>
          </div>
          <div class="item__options__row">
            <input
              :id="`item-pick-up-${item.id}`"
              type="radio"
              :name="inputName"
              value=""
            >
            <label :for="`item-pick-up-${item.id}`">Pick up in store - Free</label>
            <a href="#">Find a store near you</a>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../assets/icons/PlusIcon.vue';
import MinusIcon from '../assets/icons/MinusIcon.vue';

export default {
  name: 'CartItem',
  components: {
    PlusIcon,
    MinusIcon,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    /*
    Comes up with a unique input name attribute for each item's radio buttons
    */
    inputName() {
      return `name-${this.item.id}`;
    },

    /*
    Provides the image path for the product image
    */
    productImage() {
      // return import `@/assets/${this.item.img}`;
      return require(`@/assets/${this.item.img}`);
    },

    /*
    Formats the price number so it's padded with zeroes
    */
    formattedPrice() {
      return this.item.price.toFixed(2);
    },

    /*
    Calculates the total price of the product
    */
    totalPrice() {
      const total = this.item.price * this.item.quantity;
      return total.toFixed(2);
    },
  },
  methods: {
    /*
    Called when the increment quantity button (#increment-quantity-btn) is clicked
    Emits an event to increase the item quantity by 1
    */
    incrementQuantity() {
      this.$emit('increment-quantity', this.item.id);
    },

    /*
    Called when the decrement quantity button (#decrement-quantity-btn) is clicked
    Emits an event to decrease the item quantity by 1
    */
    decrementQuantity() {
      this.$emit('decrement-quantity', this.item.id);
    },

    /*
    Called when the Save for later button (#save-for-later-btn) is clicked
    Emits an event to move the item to the savedItems array
    */
    saveForLater() {
      this.$emit('save-for-later', this.item.id);
    },

    /*
    Called when the Remove button (#remove-btn) is clicked
    Emits an event to remove the item from the items array
    */
    removeItem() {
      this.$emit('remove', this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/CartItem.scss';
</style>
