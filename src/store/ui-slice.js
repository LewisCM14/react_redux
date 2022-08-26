import { createSlice } from "@reduxjs/toolkit";

/**
 * slice to handle the show cart button found in the header,
 * defaults to false and upon toggle reverts to opposite of previous stored state
 *
 * handles the notification component visibility, reducer defines required payload
 */

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
