import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneProductApi, productsApi } from "./productsApi.js";
import cartReducer from "./cartSlice.js";
export const store = configureStore({
  reducer: {
    cartt: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneProductApi.reducerPath]: oneProductApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneProductApi.middleware)
});

setupListeners(store.dispatch);
