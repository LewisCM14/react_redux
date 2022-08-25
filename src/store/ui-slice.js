import { createSlice } from "@reduxjs/toolkit";

/**
 * slice to handle the show cart button found in the header,
 * defaults to false and upon toggle reverts to opposite of previous stored state
 */

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
