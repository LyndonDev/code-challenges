import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import SavedItem from '@/components/SavedItem.vue';
import mockData from '../../mockData.json';

const props = mockData.items[0];

describe('SavedItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SavedItem, {
      propsData: {
        item: props,
      },
    });
  });

  it('when "move to cart" button is clicked, emits the "move-to-cart" event with the correct item id.', () => {
    wrapper.find('#move-to-cart-btn-2229383823').trigger('click');
    expect(wrapper.emitted('move-to-cart')[0]).to.deep.equal([0]);
  });

  it('when "remove" button is clicked, emits the "remove" event with the correct item id.', () => {
    // wrapper.setProps({ id: 4});
    wrapper.find('#remove-btn-2229383823').trigger('click');
    expect(wrapper.emitted('remove-from-saved')[0]).to.deep.equal([0]);
  });
});
