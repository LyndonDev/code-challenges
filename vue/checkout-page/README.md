# Company XYZ Interview Exercise

## Challenge Description

Company XYZ is building a new shopping cart, and you're in charge of implementing it.

### What's provided

#### Design Specs
We've included a design mock up to help describe the layout. For all styling, feel free to estimate.  This is about the code, not your design or PSD-slicing skills. Find the mockup in the project root directory at `cart-mockup.png`.

#### Mock Data
You will find mock data for this project in the root directory, in `mockData.json`. We have wired up the data for the cart into the `Cart.vue` component, but not all of it is printing out to the view. It's your job to flesh that out.

#### Libraries and resources
* [Vue.js documentation](https://vuejs.org/v2/guide/)
* [Vue Test Utils documentation](https://vue-test-utils.vuejs.org/)
* [Chai.js documentation](https://www.chaijs.com/)

### Expectations

This is the set of core features that we expect to see implemented in a finished exercise.

1. Build the 'Company XYZ Mastercard' section (within the green outlined part of the mockup).
2. Build the 'Saved for later' section (also within the green outlined part on the mockup).
  * This section should render out a SavedItem component for each saved item.
  * If you wire up the data, there should be one saved item in the section.
  * The 'Move to Cart' button should move the saved item to the cart.
  * The 'Remove' button should remove the item from the saved data.
  * We've already created a unit test file (`SavedItem.spec.js`) for your SavedItem component. When you are finished with this component, it should pass the tests.

3. Implement the 'Save for later' and 'Remove' functionality on the CartItem component. These buttons are outlined by a brown dashed line in the mockup.
  * The 'Save for later' button should move the item from the cart saved items section.
  * The 'Remove' button should remove the item from the cart.

4. Fix some broken functionality.
  * If you run `npm run test` you will see that some of our unit tests are not passing! This means some of the functionality is broken. See if you can figure out what's wrong with the code, and fix it in order to get the unit tests to pass. Here are the tests that we want you to fix:
    * `Cart.vue`
      - displays the word "item" (singular) next to the item count if there's only one item
    * `CartItem.vue`
      - emits the decrement-quantity event with the item index when the decrement button is pressed
      - emits the save-for-later event with the item index when the save for later button is pressed
      - emits the remove event with the item index when the remove button is pressed

5. Bonus (optional).
  * If you have time, make the subtotal calculate the correct number based on the prices of the items in the cart.

### How to get up and running
To open the project:
1. `cd` into the root directory of this project.
2. Then `npm install`.
3. Then `npm run serve`.
4. You should be able to see the site running on `http://localhost:8080/`.

To run the tests:
`npm run test`.

### Things to keep in mind

* We use the airbnb linter as our code style guidelines.
* Outside of the core expectations, you have the ability to choose what you implement.
* Browser testing is not part of the core expectations.
* Budget about 4-6 hours for the exercise.
* Have fun!
