import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    product: productSlice,
  },
});

// TypeScript Inference types for usage throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;