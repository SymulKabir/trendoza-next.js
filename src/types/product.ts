export interface ProductImage {
  name: string;
  originalName: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  weight: string;
  cleanedWeight: string | null;
  originalPrice: number;
  sellingPrice: number;
  discountPercent: number;
}
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string | null;
  stockStatus: string;
  badgeType: string;
  status: string;
  cartItemCount?: number;
  images: ProductImage[];
  availableCuts: string[];
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
}