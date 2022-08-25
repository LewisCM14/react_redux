import { createSlice } from "@reduxjs/toolkit";

/**
 * The Cart slice, stores the individual items and cart quantity
 *
 * add reducer receives the state and action,
 * the item(s) being added is found in the payload of the received action, stored in newItem.
 * first it is checked against the initial state 'items' array by
 * iterating over it and looking for matching id's,
 * if this existingItem function evaluates to false the newItem is
 * pushed (with the use of redux toolkit, ensuring it is immutable) to the initial state 'items' array.
 * the required fields are defined within this push() call.
 * if existingItem evaluates to truthy the else block updates the relevant fields.
 *
 * remove reducer receives the state and action,
 * stores the item being passed in the id variable by collection it from the actions payload,
 * then uses this variable to find() the existingItem within the 'items' array,
 * if the existingItem quantity is equal to 1, targets the 'items' array in the initial state,
 * and replaces it with a new array state where the item stored in 'id' is filtered out.
 * if the existingItem has a quantity greater than 1, decrements the relevant field by 1,
 * then updates cart price.
 */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
