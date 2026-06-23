"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bell, ArrowRight, Minus, Plus } from "lucide-react";
import { useNavigate } from "@/src/hooks/useNavigate";
import { getProductService, updateCartService } from "@/src/services/product/client";

interface ProductImage {
  name: string;
  originalName: string;
}

interface ProductVariant {
  id: string;
  productId: string;
  weight: string;
  cleanedWeight: string | null;
  originalPrice: number;
  sellingPrice: number;
  discountPercent: number;
}

interface ProductItem {
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

export default function SignatureSeafood() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const { goTo } = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductService({});
      
      if (response && response.data) {
        setProducts(response.data);
        
        const initialQuantities: Record<string, number> = {};
        response.data.forEach((p: ProductItem) => {
          // Defaults client memory to 0. 
          // Optional: If getProductService includes current user cart logs, initialize values from there.
          initialQuantities[p.id] = 0; 
        });
        setQuantities(initialQuantities);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Updated operation execution block mapping directly back to the database
  const handleQuantityAdjustment = async (product: ProductItem, delta: number) => {
    const activeVariant = product.variants?.[0];
    if (!activeVariant) {
      alert("This item does not have an active variant option configuration configured.");
      return;
    }

    const currentQty = quantities[product.id] || 0;
    const targetQty = Math.max(0, currentQty + delta);

    // 1. Optimistic Update (Immediate UI response)
    setQuantities((prev) => ({
      ...prev,
      [product.id]: targetQty,
    }));

    // 2. Synchronize background values safely with the Database API
    try {
      await updateCartService({
        productId: product.id,
        variantId: activeVariant.id,
        quantity: targetQty,
      });
    } catch (error) {
      console.error("Database sync failed, reverting UI state:", error);
      // Revert state back on error
      setQuantities((prev) => ({
        ...prev,
        [product.id]: currentQty,
      }));
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="w-full text-center py-24 text-sm text-slate-400 font-medium">
        Loading fresh catches...
      </div>
    );
  }

  return (
    <section className="py-12 bg-white w-full max-w-7xl mx-auto px-4 select-none">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          Fishlo&apos;s Signature Seafood
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          A curated collection of our finest, premium-grade seafood.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => {
          const qty = quantities[product.id] || 0;
          const activeVariant = product.variants?.[0];
          const originalPrice = activeVariant ? activeVariant.originalPrice : 0;
          const sellingPrice = activeVariant ? activeVariant.sellingPrice : 0;
          const discountPercent = activeVariant ? activeVariant.discountPercent : 0;
          const weightLabel = activeVariant ? `/${activeVariant.weight}` : "";

          const primaryImageFilename = product.images?.[0]?.name;
          const imageSrc = primaryImageFilename 
            ? `/uploads/${primaryImageFilename}` 
            : "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60";

          const isOutOfStock = product.stockStatus !== "In Stock";

          return (
            <div
              key={product.id}
              className="bg-white border border-dashed border-slate-200 rounded-2xl p-3 flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 group">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {product.badgeType && product.badgeType !== "None" && !isOutOfStock && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold tracking-wide uppercase bg-amber-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                    {product.badgeType}
                  </span>
                )}

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] flex items-start justify-center pt-2">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-white bg-black/60 px-6 py-1 rounded-sm">
                      OUT OF STOCK
                    </span>
                  </div>
                )}

                {!isOutOfStock && (
                  <div className="absolute bottom-2 right-2 z-10">
                    {qty === 0 ? (
                      <button
                        onClick={() => handleQuantityAdjustment(product, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-md text-rose-500 font-bold hover:bg-rose-50 transition-colors border border-slate-100"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2.5 bg-rose-500 text-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold">
                        <button
                          onClick={() => handleQuantityAdjustment(product, -1)}
                          className="hover:opacity-80"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span>{qty}</span>
                        <button
                          onClick={() => handleQuantityAdjustment(product, 1)} 
                          className="hover:opacity-80"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between mt-3">
                <div>
                  <h3 className="text-xs font-semibold text-slate-700 line-clamp-2 h-8 leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    {product.category} {activeVariant?.cleanedWeight ? `| ${activeVariant.cleanedWeight}` : ""}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-800">
                      ৳{sellingPrice}
                    </span>
                    {weightLabel && (
                      <span className="text-[11px] text-slate-400">
                        {weightLabel}
                      </span>
                    )}
                    {originalPrice > sellingPrice && (
                      <>
                        <span className="text-[11px] text-slate-300 line-through">
                          ৳{originalPrice}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 ml-auto">
                          {discountPercent}% off
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-dotted border-slate-100">
                    {isOutOfStock ? (
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-slate-400 leading-tight">
                          Get notified when available
                        </span>
                        <button className="flex items-center gap-1 border border-rose-200 text-rose-500 text-[11px] font-medium px-2.5 py-1 rounded-md bg-rose-50/40 hover:bg-rose-50 transition-colors">
                          Notify <Bell size={10} className="fill-rose-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-600 font-medium text-[10px]">
                        <span>⚡</span>
                        <span>Available for Express Delivery</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[340px] text-center group cursor-pointer hover:border-rose-300 transition-colors duration-200">
          <h3 className="text-sm font-bold text-slate-700">View All</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Browse all items</p>
          <div className="w-9 h-9 bg-rose-500/10 text-rose-500 flex items-center justify-center rounded-full mt-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-rose-500 group-hover:text-white">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </section>
  );
}