import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
  },
});

// TypeScript Inference types for usage throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;