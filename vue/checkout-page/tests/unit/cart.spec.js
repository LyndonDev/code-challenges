import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Cart from '@/components/Cart.vue';
import CartItem from '@/components/CartItem.vue';
import mockData from '../../mockData.json';

const data = {
  subtotal: mockData.subtotal,
  items: [
    ...mockData.items,
    {
      id: 1,
      quantity: 1,
      price: 150.50,
      brand: 'Kodiak',
      name: 'Original Boots - Women\'s',
      color: 'Olive',
      size: '7',
      sku: '1237263746',
      img: 'product-2.jpeg',
    },
  ],
  savedItems: [],
};

const dataWithOneItem = {
  subtotal: 540,
  items: [
    {
      id: 0,
      quantity: 1,
      brand: 'Osprey',
      name: 'Deva 60 Pack - Women\'s',
      color: 'Plum Red',
      size: 'Xs',
      sku: '1340720001',
      img: 'product-1.jpeg',
      price: 299.95,
    },
  ],
  savedItems: [],
};

describe('Cart.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Cart, {
      stubs: {
        CartItem,
      },
    });
    wrapper.setData({ data });
  });

  it('returns the right "items amount" based on the amount of items in the cart', () => {
    expect(wrapper.vm.itemsAmount).to.equal(3);
  });

  it('displays the word "items" (plural) next to the item count if there\'s more than one item', () => {
    expect(wrapper.find('#cart-item-count').text()).to.equal('3 items');
  });

  it('displays the word "item" (singular) next to the item count if there\'s only one item', () => {
    wrapper.setData({ data: dataWithOneItem });
    expect(wrapper.find('#cart-item-count').text()).to.equal('1 item');
  });

  it('increments the item quantity when increment-quantity is emitted', () => {
    wrapper.find(CartItem).vm.$emit('increment-quantity', 0);
    expect(wrapper.vm.data.items[0].quantity).to.equal(3);
  });

  it('decrements the item quantity when decrement-quantity is emitted', () => {
    wrapper.find(CartItem).vm.$emit('decrement-quantity', 0);
    expect(wrapper.vm.data.items[0].quantity).to.equal(2);
  });

  it('moves items to the saved for later array when save-for-later is emitted', () => {
    wrapper.find(CartItem).vm.$emit('save-for-later', 0);
    expect(wrapper.vm.data.items.length).to.equal(1);
    expect(wrapper.vm.data.savedItems.length).to.equal(1);
  });

  it('removes item from cart when "remove" event is emitted', () => {
    wrapper.find(CartItem).vm.$emit('remove', 1);
    expect(wrapper.vm.data.items.length).to.equal(0);
  });
});
