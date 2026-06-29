import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  reSyncing: boolean; // Tracks if the UI is updating with the backend
  error: string | null;
}

const initialState: CartState = {
  cartId: null,
  items: [],
  reSyncing: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
        quantity: number;
      }>,
    ) => {
      const { productId, variantId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item !== existingItem);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
    updateResyncing: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "boolean") {
        state.reSyncing = action.payload;
      } else { 
        state.reSyncing = !state.reSyncing;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.cartId = null;
    },
  },
});

export const {
  setCart,
  updateQuantity,
  updateResyncing,
  clearCart,
  setCartId,
} = cartSlice.actions;
export default cartSlice.reducer;
