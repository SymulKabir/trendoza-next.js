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
  category: string;
  description: string | null;
  stockStatus: string;
  badgeType: string;
  images: ProductImage[];
  availableCuts: string[];
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
}