import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "@/src/types/product";

interface ProductState {
  items: ProductItem[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoadingProduct: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (
      state,
      action: PayloadAction<{ items: ProductItem[]; pagination: any }>,
    ) => {
      state.items = action.payload.items;
      state.pagination = {
        page: action.payload.pagination.page,
        limit: action.payload.pagination.limit,
        total: action.payload.pagination.total,
        totalPages: action.payload.pagination.totalPages,
      };
    },
    updateSingleProduct: (state, action) => {
      if (!action.payload) return;

      state.items = state.items.map((product: any) => {
        if (action.payload.id === product.id) {
          return {...product, ...action.payload}
        }
        return { ...product };
      });
    },
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.items.push(action.payload);
    },
    // Update a specific product in the list (e.g., when quantity changes)
    updateProductInList: (state, action: PayloadAction<ProductItem>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const {
  setLoadingProduct,
  setProducts,
  updateSingleProduct,
  addProduct,
  updateProductInList,
} = productSlice.actions;
export default productSlice.reducer;
