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
  items: CartItem[];
  isSyncing: boolean; // Tracks if the UI is updating with the backend
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isSyncing: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { 
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    }, 
    updateQuantity: (state, action: PayloadAction<{ productId: string, variantId: string, quantity: number }>) => {
      const { productId, variantId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item !== existingItem);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { setCart, updateQuantity, setSyncing, clearCart } = cartSlice.actions;
export default cartSlice.reducer;