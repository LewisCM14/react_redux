import { configureStore } from "@reduxjs/toolkit";

import uiSlice from './ui-slice';

/**
 * store configuration with the redux.js toolkit
 */

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
    }
});

export default store;