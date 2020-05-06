import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import CartItem from '@/components/CartItem.vue';
import mockData from '../../mockData.json';

const props = mockData.items[0];

describe('CartItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CartItem, {
      propsData: {
        item: props,
      },
    });
  });

  it('increments the item quantity when increment-quantity is emitted', () => {
    wrapper.find('#increment-2229383823').trigger('click');
    expect(wrapper.emitted('increment-quantity')[0]).to.deep.equal([0]);
  });

  it('emits the decrement-quantity event with the item index when the decrement button is pressed', () => {
    wrapper.find('#decrement-2229383823').trigger('click');
    expect(wrapper.emitted('decrement-quantity')[0]).to.deep.equal([0]);
  });

  it('emits the save-for-later event with the item index when the save for later button is pressed', () => {
    wrapper.find('#save-for-later-btn-2229383823').trigger('click');
    expect(wrapper.emitted('save-for-later')[0]).to.deep.equal([0]);
  });

  it('emits the remove event with the item index when the remove button is pressed', () => {
    wrapper.find('#remove-btn-2229383823').trigger('click');
    expect(wrapper.emitted('remove')[0]).to.deep.equal([0]);
  });
});
