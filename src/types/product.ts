export interface ProductImage {
  name?: string;
  originalName?: string;
}

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Scheduled" | "Active" | "Draft";
  imageLabel: string;
  images: ProductImage[];
}